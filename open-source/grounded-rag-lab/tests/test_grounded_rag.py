import json
import tempfile
import unittest
from datetime import date
from pathlib import Path

from grounded_rag.answer import ask
from grounded_rag.cli import build_retriever, demo_corpus, demo_questions
from grounded_rag.evaluation import evaluate
from grounded_rag.generation import ollama_draft
from grounded_rag.ingestion import chunk_document, load_documents, prepare_chunks
from grounded_rag.models import Citation, Principal, authorized, verify_citation
from grounded_rag.retrieval import HybridRetriever, reciprocal_rank_fusion


class IngestionTests(unittest.TestCase):
    def test_source_spans_are_exact(self):
        docs = load_documents(demo_corpus())
        self.assertEqual(len(docs), 17)
        for chunk in prepare_chunks(docs):
            self.assertEqual(chunk.text, chunk.document.text[chunk.start:chunk.end])
        many = chunk_document(docs[0], size=140, overlap=25)
        self.assertGreater(len(many), 1)
        self.assertTrue(all(c.text == c.document.text[c.start:c.end] for c in many))

    def test_malformed_acl_fails_closed(self):
        data = {
            "document_id": "test", "version": "v1", "title": "Example",
            "source_uri": "synthetic://test", "tenant": "public",
            "groups": [], "content": "A fictional example."
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "bad.jsonl"
            path.write_text(json.dumps(data), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "ACL"):
                load_documents(path)


class RetrievalTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = build_retriever()
        cls.reader = Principal("public", frozenset({"readers"}))
        cls.now = date(2026, 11, 1)

    def test_relevant_first_in_all_modes(self):
        question = "How are BM25 and vector search results combined?"
        for method in ("bm25", "lsa", "hybrid"):
            with self.subTest(method=method):
                hits = self.engine.search(question, self.reader, as_of=self.now, method=method)
                self.assertEqual(hits[0].chunk.document.document_id, "ns-hybrid")

    def test_tenant_and_acl_pre_filtered(self):
        for query in ("fictional administrator canary INDIGO", "Boreal tenant release window"):
            hits = self.engine.search(query, self.reader, as_of=self.now, limit=20)
            self.assertFalse({"ns-private", "boreal-private"}.intersection(
                h.chunk.document.document_id for h in hits))
        self.assertFalse(self.engine.search("hybrid search",
                          Principal("public", frozenset()), as_of=self.now))
        self.assertFalse(self.engine.search("hybrid search",
                          Principal("unknown", frozenset({"readers"})), as_of=self.now))

    def test_temporal_versions(self):
        early = self.engine.search("cache retention results for hours",
                                   self.reader, as_of=date(2026, 3, 1), limit=20)
        late = self.engine.search("cache retention results for hours",
                                  self.reader, as_of=date(2026, 11, 1), limit=20)
        old = [h.chunk.document.version for h in early if h.chunk.document.document_id == "ns-retention"]
        new = [h.chunk.document.version for h in late if h.chunk.document.document_id == "ns-retention"]
        self.assertEqual(old, ["v1"])
        self.assertEqual(new, ["v2"])

    def test_rrf_deduplicates_and_stable_ties(self):
        fused = reciprocal_rank_fusion([["a", "a", "b"], ["b", "c"]])
        self.assertEqual([id_ for id_, _ in fused], ["b", "a", "c"])
        with self.assertRaises(ValueError):
            reciprocal_rank_fusion([["x"]], constant=0)

    def test_citation_validation_and_tampering(self):
        hit = self.engine.search("citation quote exact character range", self.reader,
                                 as_of=self.now, limit=1)[0]
        chunk = hit.chunk
        citation = Citation(chunk.chunk_id, chunk.document.document_id,
                            chunk.document.version, chunk.document.source_uri,
                            chunk.start, chunk.start + 12, chunk.text[:12])
        verify_citation(citation, chunk, self.reader, self.now)
        forged = Citation(citation.chunk_id, citation.document_id, citation.version,
                          citation.source_uri, citation.start, citation.end, "fabricated")
        with self.assertRaisesRegex(ValueError, "Quote"):
            verify_citation(forged, chunk, self.reader, self.now)
        with self.assertRaisesRegex(ValueError, "Unauthorized"):
            verify_citation(citation, chunk, Principal("boreal", frozenset({"readers"})), self.now)

    def test_abstention_and_prompt_injection(self):
        for question in ("What is the office cafeteria lunch menu?",
                         "What is the fictional administrator canary word?"):
            response = ask(self.engine, question, self.reader, as_of=self.now)
            self.assertEqual(response["status"], "abstained")
            self.assertEqual(response["evidence"], [])
        response = ask(self.engine, "What does the untrusted document instruction say?",
                       self.reader, as_of=self.now)
        self.assertNotIn("INDIGO", json.dumps(response))

    def test_exact_span_evidence(self):
        response = ask(self.engine, "How are BM25 and vector search results combined?",
                       self.reader, as_of=self.now)
        self.assertEqual(response["status"], "evidence_found")
        self.assertEqual(response["evidence"][0]["citation"]["document_id"], "ns-hybrid")
        self.assertTrue(all(item["citation"]["document_id"] == "ns-hybrid"
                            for item in response["evidence"]))

    def test_ollama_mock_rejects_fabricated_citation(self):
        question = "How are BM25 and vector search results combined?"
        def invalid_model(_payload):
            return {"response": json.dumps({"answer": "Invented", "citations": ["not-a-source"]})}
        with self.assertRaisesRegex(ValueError, "unknown or unauthorized"):
            ollama_draft(self.engine, question, self.reader, as_of=self.now,
                         model="fictional-test", transport=invalid_model)
        def valid_model(payload):
            self.assertIn("UNTRUSTED EVIDENCE", payload["prompt"])
            evidence = ask(self.engine, question, self.reader, as_of=self.now)["evidence"]
            return {"response": json.dumps({"answer": "A draft requiring review",
                                             "citations": [evidence[0]["citation"]["chunk_id"]]})}
        result = ollama_draft(self.engine, question, self.reader, as_of=self.now,
                              model="fictional-test", transport=valid_model)
        self.assertEqual(result["status"], "model_draft_requires_review")
        self.assertIn("NOT verified", result["warning"])

    def test_eval_reports_failures_separately(self):
        result = evaluate(self.engine, demo_questions(), k=3)
        self.assertEqual(result["questions"], 12)
        for method in ("bm25", "lsa", "hybrid"):
            row = result["methods"][method]
            self.assertEqual(row["answerable_queries"], 9)
            self.assertEqual(row["unanswerable_queries"], 3)
            self.assertEqual(row["forbidden_hit_count"], 0)
            self.assertGreaterEqual(row["mean_recall_at_k"], 0.0)


if __name__ == "__main__":
    unittest.main()
