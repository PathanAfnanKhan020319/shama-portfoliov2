"""CLI and local-only demo server entry point."""

import argparse
import json
from datetime import date
from pathlib import Path

from .answer import ask
from .evaluation import evaluate
from .ingestion import load_documents, prepare_chunks
from .models import Principal
from .retrieval import HybridRetriever


def demo_corpus() -> Path:
    return Path(__file__).resolve().parents[2] / "data" / "northstar_synthetic.jsonl"


def demo_questions() -> Path:
    return Path(__file__).resolve().parents[2] / "evals" / "questions.jsonl"


def build_retriever(corpus: Path | None = None) -> HybridRetriever:
    return HybridRetriever(prepare_chunks(load_documents(corpus or demo_corpus())))


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(prog="grounded-rag", description="Evidence-first hybrid RAG lab")
    parser.add_argument("--corpus", type=Path, default=None, help="Local fictional JSONL corpus")
    commands = parser.add_subparsers(dest="command", required=True)
    query = commands.add_parser("ask", help="Return evidence with exact verified spans")
    query.add_argument("question")
    query.add_argument("--method", choices=["bm25", "lsa", "hybrid"], default="hybrid")
    query.add_argument("--tenant", default="public", help="Trusted CLI operator scope")
    query.add_argument("--group", action="append", default=None)
    query.add_argument("--as-of", default="2026-11-01")
    query.add_argument("--ollama-model", default=None,
                       help="Optional local Ollama model for an UNVERIFIED draft (requires human review)")
    check = commands.add_parser("evaluate", help="Run measured fixture ablations")
    check.add_argument("--queries", type=Path, default=None)
    check.add_argument("-k", type=int, default=3)
    serve = commands.add_parser("serve", help="Bind a local demo to loopback")
    serve.add_argument("--port", type=int, default=8765)
    args = parser.parse_args(argv)
    retriever = build_retriever(args.corpus)
    if args.command == "ask":
        principal = Principal(args.tenant, frozenset(args.group or ["readers"]))
        if args.ollama_model:
            if args.method != "hybrid":
                parser.error("--ollama-model requires --method hybrid")
            from .generation import ollama_draft
            result = ollama_draft(retriever, args.question, principal,
                                  as_of=date.fromisoformat(args.as_of), model=args.ollama_model)
        else:
            result = ask(retriever, args.question, principal,
                         as_of=date.fromisoformat(args.as_of), method=args.method)
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif args.command == "evaluate":
        print(json.dumps(evaluate(retriever, args.queries or demo_questions(), k=args.k),
                         indent=2, ensure_ascii=False))
    else:
        from .server import serve as run_server
        run_server(retriever, args.port)


if __name__ == "__main__":
    main()
