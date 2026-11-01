"""Transparent small-fixture retrieval evaluation (not a production benchmark)."""

import json
from datetime import date
from pathlib import Path
from statistics import mean
from time import perf_counter

from .models import Principal
from .retrieval import HybridRetriever


def evaluate(retriever: HybridRetriever, questions_path: Path, *, k: int = 3) -> dict:
    if not 1 <= k <= 20:
        raise ValueError("Invalid k")
    rows = [json.loads(line) for line in questions_path.read_text(encoding="utf-8").splitlines()
            if line.strip()]
    if len({row["id"] for row in rows}) != len(rows):
        raise ValueError("Duplicate evaluation query IDs")
    methods = {}
    for method in ("bm25", "lsa", "hybrid"):
        details = []
        for row in rows:
            principal = Principal(row["tenant"], frozenset(row["groups"]))
            start = perf_counter()
            hits = retriever.search(row["question"], principal, as_of=date.fromisoformat(row["as_of"]),
                                    method=method, limit=k)
            elapsed = (perf_counter() - start) * 1000
            ids = list(dict.fromkeys(h.chunk.document.document_id for h in hits))
            relevant = set(row.get("expected_doc_ids", []))
            forbidden = set(row.get("forbidden_doc_ids", []))
            first = next((1.0 / (i + 1) for i, ident in enumerate(ids) if ident in relevant), 0.0)
            details.append({
                "id": row["id"], "category": row["category"], "answerable": bool(relevant),
                "retrieved_doc_ids": ids, "relevant": sorted(relevant),
                "recall_at_k": len(set(ids).intersection(relevant)) / len(relevant) if relevant else None,
                "mrr_at_k": first if relevant else None,
                "forbidden_hits": sorted(forbidden.intersection(ids)),
                "latency_ms": round(elapsed, 3),
            })
        answerable = [item for item in details if item["answerable"]]
        unanswerable = [item for item in details if not item["answerable"]]
        methods[method] = {
            "answerable_queries": len(answerable), "unanswerable_queries": len(unanswerable),
            "mean_recall_at_k": round(mean(x["recall_at_k"] for x in answerable), 4),
            "mrr_at_k": round(mean(x["mrr_at_k"] for x in answerable), 4),
            "forbidden_hit_count": sum(len(x["forbidden_hits"]) for x in details),
            "unanswerable_with_candidates": sum(bool(x["retrieved_doc_ids"]) for x in unanswerable),
            "mean_query_latency_ms": round(mean(x["latency_ms"] for x in details), 3),
            "queries": details,
        }
    return {
        "dataset": "small fictional regression fixtures",
        "disclaimer": "Not a held-out enterprise benchmark; no LLM quality or entailment measured.",
        "k": k, "questions": len(rows), "methods": methods,
    }
