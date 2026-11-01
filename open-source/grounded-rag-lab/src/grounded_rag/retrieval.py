"""Authorized BM25 + latent-semantic vector retrieval with rank fusion."""

from collections import Counter
from datetime import date
from math import log
import re

import numpy as np
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize

from .models import Chunk, Hit, Principal, authorized

TOKEN = re.compile(r"(?u)\b\w+\b")


def words(text: str) -> list[str]:
    return TOKEN.findall(text.casefold())


def reciprocal_rank_fusion(rankings: list[list[str]], constant: float = 60.0) -> list[tuple[str, float]]:
    if constant <= 0:
        raise ValueError("RRF constant must be positive")
    scores: dict[str, float] = {}
    for ranking in rankings:
        for position, chunk_id in enumerate(dict.fromkeys(ranking), 1):
            scores[chunk_id] = scores.get(chunk_id, 0.0) + 1.0 / (constant + position)
    return sorted(scores.items(), key=lambda item: (-item[1], item[0]))


def bm25_scores(query: str, passages: list[str], *, k1: float = 1.5, b: float = 0.75) -> list[float]:
    if not passages:
        return []
    tokenized = [words(p) for p in passages]
    lengths = [len(t) for t in tokenized]
    average = max(1, sum(lengths) / len(lengths))
    frequency = [Counter(t) for t in tokenized]
    df = Counter(token for count in frequency for token in count)
    result = []
    for counts, length in zip(frequency, lengths):
        score = 0.0
        for term in set(words(query)):
            tf = counts.get(term, 0)
            if not tf:
                continue
            idf = log(1 + (len(passages) - df[term] + 0.5) / (df[term] + 0.5))
            score += idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * length / average))
        result.append(score)
    return result


def lsa_scores(query: str, passages: list[str]) -> list[float]:
    """TF-IDF -> SVD (LSA). Not neural or pretrained sentence embeddings."""
    if not passages:
        return []
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True,
                                 token_pattern=r"(?u)\b\w+\b")
    matrix = vectorizer.fit_transform(passages)
    query_vector = vectorizer.transform([query])
    if query_vector.nnz == 0:
        return [0.0] * len(passages)
    dimensions = min(32, matrix.shape[0] - 1, matrix.shape[1] - 1)
    if dimensions >= 2:
        svd = TruncatedSVD(n_components=dimensions, random_state=42)
        documents = normalize(svd.fit_transform(matrix))
        question = normalize(svd.transform(query_vector))
        similarities = documents @ question[0]
    else:
        similarities = (matrix @ query_vector.T).toarray().ravel()
    return [float(max(0.0, x)) for x in np.asarray(similarities).ravel()]


class HybridRetriever:
    def __init__(self, chunks: list[Chunk]):
        self.chunks = list(chunks)

    def search(self, question: str, principal: Principal, *, as_of: date,
               method: str = "hybrid", limit: int = 5) -> list[Hit]:
        if method not in ("bm25", "lsa", "hybrid"):
            raise ValueError("method must be bm25, lsa, or hybrid")
        if not isinstance(question, str) or not 2 <= len(question.strip()) <= 400:
            raise ValueError("Question length must be 2–400 characters")
        if not 1 <= limit <= 20:
            raise ValueError("limit must be 1–20")
        # Filter FIRST. The index vocabulary/statistics are built only from authorized evidence.
        eligible = [c for c in self.chunks if authorized(c, principal, as_of)]
        if not eligible:
            return []
        passages = [c.document.title + ". " + c.text for c in eligible]
        sparse = bm25_scores(question, passages)
        dense = lsa_scores(question, passages)
        lexical = [i for i in sorted(range(len(eligible)), key=lambda i: (-sparse[i], eligible[i].chunk_id))
                   if sparse[i] > 0]
        semantic = [i for i in sorted(range(len(eligible)), key=lambda i: (-dense[i], eligible[i].chunk_id))
                    if dense[i] >= 0.075]
        sparse_rank = {i: rank for rank, i in enumerate(lexical, 1)}
        dense_rank = {i: rank for rank, i in enumerate(semantic, 1)}
        if method == "bm25":
            combined = [(eligible[i].chunk_id, sparse[i]) for i in lexical]
        elif method == "lsa":
            combined = [(eligible[i].chunk_id, dense[i]) for i in semantic]
        else:
            combined = reciprocal_rank_fusion([
                [eligible[i].chunk_id for i in lexical[:20]],
                [eligible[i].chunk_id for i in semantic[:20]],
            ])
        by_id = {c.chunk_id: (i, c) for i, c in enumerate(eligible)}
        return [Hit(by_id[cid][1], score,
                    sparse_rank.get(by_id[cid][0]), dense_rank.get(by_id[cid][0]))
                for cid, score in combined[:limit]]
