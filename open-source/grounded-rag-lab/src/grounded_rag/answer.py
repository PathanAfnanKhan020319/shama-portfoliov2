"""Conservative extractive answer layer; no unsupported synthesis."""

from dataclasses import asdict
from datetime import date
from math import ceil
import re

from .models import Citation, Principal, verify_citation
from .retrieval import HybridRetriever, words

SENTENCE = re.compile(r"[^.!?\n]+[.!?]?")
STOP = frozenset("what which when where how does do is are was were the a an to for of on in and by with can from should".split())


def select_exact_excerpt(chunk_text: str, question: str) -> tuple[int, int] | None:
    terms = set(words(question)) - STOP
    if not terms:
        return None
    choices = []
    for sentence in SENTENCE.finditer(chunk_text):
        fragment = sentence.group().strip()
        overlap = terms.intersection(words(fragment))
        # A couple of generic shared words are not sufficient evidence.
        if len(overlap) >= max(2, ceil(len(terms) * 0.5)):
            # Favor distinct topic terms and shorter evidence, not an arbitrary generated summary.
            start = sentence.start() + len(sentence.group()) - len(sentence.group().lstrip())
            end = start + len(fragment)
            choices.append((len(overlap), -len(fragment), start, end))
    if not choices:
        return None
    _, _, start, end = max(choices)
    return start, end


def ask(retriever: HybridRetriever, question: str, principal: Principal, *, as_of: date,
        method: str = "hybrid", limit: int = 5) -> dict:
    hits = retriever.search(question, principal, as_of=as_of, method=method, limit=limit)
    evidence = []
    for hit in hits:
        local = select_exact_excerpt(hit.chunk.text, question)
        if not local:
            continue
        start, end = hit.chunk.start + local[0], hit.chunk.start + local[1]
        document = hit.chunk.document
        citation = Citation(hit.chunk.chunk_id, document.document_id,
                            document.version, document.source_uri, start, end,
                            document.text[start:end])
        verify_citation(citation, hit.chunk, principal, as_of)
        evidence.append({"title": document.title, "citation": asdict(citation),
                         "score": round(hit.score, 6)})
        if len(evidence) == 3:
            break
    return {
        "status": "evidence_found" if evidence else "abstained",
        "answer": "Verified source excerpts are shown below; no unsupported answer was generated."
                  if evidence else "Insufficient authorized evidence to answer confidently.",
        "question": question,
        "method": method,
        "retrieved": len(hits),
        "evidence": evidence,
        "warning": "Exact-span validation does not establish semantic entailment.",
    }
