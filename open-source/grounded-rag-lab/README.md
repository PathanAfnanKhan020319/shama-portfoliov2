# Grounded RAG Lab

**Reproducible evidence-first retrieval, with exact source citations and honest evaluation.**

An MIT-licensed research-quality *teaching prototype* by **Pathan Afnan Khan**. This repository's bundled corpus describes **Northstar AI, a fictional organization**. All its documents and benchmark questions are synthetic. There are no real customers, production deployments, or confidential documents involved.

The interesting problem is not how to make a chatbot sound convincing. It is how to determine **what evidence an authorized person can retrieve, which source an assertion came from, and when the system should abstain**.

## What works

| Component | Implementation |
|---|---|
| Ingestion | Schema-validated local JSONL; character-offset-preserving chunks; versioned documents |
| Permissions | Tenant/group and `as_of` temporal filters **before** retrieval/scoring |
| Lexical baseline | BM25 computed over the authorized corpus |
| Vector baseline | TF-IDF → TruncatedSVD latent semantic analysis (LSA), cosine scores; **not neural embeddings** |
| Hybrid | Reciprocal Rank Fusion (RRF), `k=60`, over ranked BM25/LSA results |
| Evidence | Extractive sentences with validated source ID, version, span, and byte-for-byte-equivalent Python string quote |
| Abstention | If no sentence meets the conservative lexical-overlap rule, return `abstained` |
| Evaluation | Recall@3, MRR@3, forbidden-hit count, negative-query candidate count, local latency by retrieval mode |
| Demo | Responsive local web UI, a CLI, and standard-library HTTP server bound to `127.0.0.1` |
| Optional generation | Ollama JSON-mode draft behind an explicit flag; **never** promoted to a verified factual answer |

## Start in a minute

Python **3.11+** required. Tested using Python **3.12.14**, scikit-learn **1.8.0**, NumPy **2.3.5** on Linux. Installing dependencies requires Internet access; *running the demo does not*. No API key is needed.

```bash
git clone https://github.com/PathanAfnanKhan020319/shama-portfoliov2.git
cd shama-portfoliov2/open-source/grounded-rag-lab
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.lock
pip install --no-deps -e .

# Retrieve an exact quote (no LLM)
python -m grounded_rag ask "How are BM25 and vector search results combined?"

# Compare three independently measurable retrieval strategies
python -m grounded_rag evaluate -k 3

# Launch the local evidence explorer
python -m grounded_rag serve --port 8765
```

Open <http://127.0.0.1:8765> for the UI. On Windows use `.venv\Scripts\activate` in PowerShell. For editable source execution without installation: `PYTHONPATH=src python3 -m grounded_rag ...`.

Run the regression suite:

```bash
python -m unittest discover -s tests -v
```

### API example

The HTTP demo has a *fixed public/readers identity* — no user-supplied tenant or group fields are honored. Do not deploy it as an Internet-facing authentication service.

```bash
curl -s http://127.0.0.1:8765/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"How are BM25 and vector search results combined?","method":"hybrid"}'
```

Returned citations carry `document_id`, `version`, `source_uri`, `start`, `end`, `quote` and `chunk_id`. Check `status`: `evidence_found` means **a matching, authorized quote was found**, *not* that a natural-language answer is semantically entailed. `abstained` signals insufficient extractive evidence under this heuristic.

### Optional local LLM draft

Only if a compatible local Ollama daemon and a locally available model are separately configured:

```bash
python -m grounded_rag ask "How are BM25 and vector search results combined?" \
  --ollama-model YOUR_LOCAL_MODEL_NAME
```

The adapter submits only the allowed evidence to Ollama at a fixed loopback endpoint. It rejects fabricated evidence IDs and malformed JSON. Every draft returns `model_draft_requires_review` and a conspicuous limitation: **the model's semantic claims have not been verified**. The Ollama integration has mocked tests but was *not* tested end-to-end against a running model.

## Reproduced observations

One local run on 2026-11-01, Python 3.12.14, 17 synthetic records and 12 hand-authored synthetic questions (9 answerable, 3 unanswerable), `k=3`:

| Retrieval mode | Recall@3, answerable (9) | MRR@3, answerable (9) | Forbidden hits (12) |
|---|---:|---:|---:|
| BM25 | 1.00 | 1.00 | 0 |
| LSA | 1.00 | 1.00 | 0 |
| Hybrid RRF | 1.00 | 1.00 | 0 |

**This is a passing regression fixture, not evidence that hybrid improves accuracy or that the system generalizes.** The benchmark is deliberately too small/easy to distinguish methods, and the three negative questions still retrieved unrelated candidate documents. No LLM response accuracy, semantic citation support, production relevance, recall at scale, privacy attack resilience or cross-document answer synthesis was measured.

See [the technical case study](docs/case-study.md) for experimental setup, design decisions, observations, security assumptions, limitations, and next experiments.

## Explore the project

- [`src/grounded_rag/ingestion.py`](src/grounded_rag/ingestion.py) — validation and lossless character offsets
- [`src/grounded_rag/retrieval.py`](src/grounded_rag/retrieval.py) — BM25, LSA, RRF and access-scope filtering
- [`src/grounded_rag/models.py`](src/grounded_rag/models.py) — immutable document, chunk, principal and citation contracts
- [`src/grounded_rag/answer.py`](src/grounded_rag/answer.py) — evidence-only response + abstention
- [`src/grounded_rag/generation.py`](src/grounded_rag/generation.py) — optional unverified LLM draft
- [`src/grounded_rag/server.py`](src/grounded_rag/server.py) — local web server and fixed public identity
- [`data/northstar_synthetic.jsonl`](data/northstar_synthetic.jsonl) — 17 fictional source records
- [`evals/questions.jsonl`](evals/questions.jsonl) — 12 labeled synthetic regression questions
- [`tests/test_grounded_rag.py`](tests/test_grounded_rag.py) — ingestion, ACL, chronology, source forging, refusal, fusion, adapter and metric tests
- [`docs/architecture.md`](docs/architecture.md) — system design and threat boundaries

## Research roadmap

1. Create a held-out, independently annotated multi-domain dataset; report per-category confidence intervals.
2. Test dense neural embedding and hybrid retrieval under comparable index and latency budgets.
3. Add hard negatives, bilingual queries, ambiguous entities, long documents, tables, OCR, corrupted input and contradictory versions.
4. Measure claim-to-quote entailment with human ground truth, citation precision/coverage and abstention calibration.
5. Replace in-memory per-query fitting with scalable tenant-isolated indexing, revocation propagation and operational SLOs.

## License

MIT — see [LICENSE](LICENSE). Third-party libraries are subject to their own licenses. Please keep the fictional-data disclaimer if you reuse the demo corpus.
