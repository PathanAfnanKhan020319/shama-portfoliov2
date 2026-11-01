# Case study: Building a RAG system that shows its evidence

**By Pathan Afnan Khan · November 1, 2026 · Applied AI / Information Retrieval**

**Status:** runnable open-source lab; synthetic regression evaluation; not production-validated.

## The problem I chose

Many AI demos begin with the generated answer and add a citation afterward. That can create a misleading sense of confidence: a valid-looking link does not show whether the cited sentence exists, belongs to the current version, was accessible to the requester, or actually supports a claim.

For this project I inverted the workflow. First determine the **authorized source set**; then retrieve competing lexical/vector candidates; then construct only **verifiable exact excerpts**. If a supporting sentence does not pass a conservative threshold, abstain. An LLM-based prose draft is optional and explicitly unverified.

This is a research prototype of the evidence/retrieval layer of RAG, not a claim that a production generative system is complete.

## Experimental dataset

I wrote **17 fictional JSONL document records** about a made-up company, Northstar AI. They include ingest/chunking architecture, citations, vector indexing, outages, access control, a prompt-injection example, two time-dependent retention versions and inaccessible tenant/administrator documents. The generated-looking `synthetic://` source URIs are deliberate: they are fixture identifiers, **not external factual references**.

I independently defined a small **12-question fixture**: nine answerable retrieval queries and three negatives (insufficient information, cross-tenant and private ACL). Every positive fixture labels the expected document ID. Negative fixtures label disallowed hits. The dataset is visible in `data/` and `evals/` and can be audited line-by-line.

The fixture is purposefully simple enough to debug; it is neither randomly sampled nor held out from implementation decisions. No real customer documents or proprietary content were used.

## Design decisions

### 1. Preserve character-level provenance

Document chunks retain `document_id`, `version`, `source_uri`, `tenant`, group ACL and `valid_from`/`valid_to` intervals. The chunker preserves Python-string character offsets into the exact original text. The citation validator checks both **identity** and **substring equality**, and repeats permission checks at citation time.

The objective is a checkable answer to: *Which exact text did this system show, and was this user authorized to see it?*

### 2. Permission and time filter before retrieval

The principal's tenant and group must match each candidate, and its version must be current at `as_of`. Only then are BM25 statistics or TF-IDF/SVD representations computed. The tests exercise both tenant denial and temporal selection, including old vs new retention-policy versions.

This is an auditable baseline rather than a claim of production-ready identity management. The local HTTP server intentionally exposes a **fixed public demo identity**, never client-selectable permissions.

### 3. Measure independent lexical and statistical-vector baselines

For exact tokens/figures, I implemented **BM25**. For a distinct vector retrieval path, I used **TF-IDF with TruncatedSVD (latent semantic analysis / LSA)** and normalized similarity. Calling that "neural embeddings" would be misleading; it is a transparent, dependency-light vector baseline.

Hybrid retrieval joins the two rank lists with **Reciprocal Rank Fusion**:

\[
S(d) = \sum_{r \in \{BM25,LSA\}} \frac{1}{60 + \operatorname{rank}_r(d)}
\]

The design avoids directly adding incomparable BM25 and cosine scores. Rank fusion does not itself guarantee a quality gain; it needs an evaluation dataset hard enough to distinguish methods.

### 4. Evidence or abstention

The default answer layer extracts matching source sentences, validates each cited span, and returns structured evidence. It does **not** synthesize confident prose based on loosely similar documents. The conservative token-overlap heuristic can miss relevant paraphrases and still surface tangential matches. Mechanical quote integrity is **not semantic entailment**.

For experiments with a local model, an optional Ollama JSON-mode adapter provides a candidate draft. Its citation IDs must match the authorized evidence, but the adapter labels every nonempty output **requires review**. The adapter was exercised with mocked model responses, *not* with a live Ollama model.

## What I actually measured

I ran `python -m grounded_rag evaluate -k 3` on Linux, Python 3.12.14, 17 fictional records and 12 manually written questions on November 1, 2026. Results from that local invocation:

| Method | Mean Recall@3 (9 positives) | MRR@3 (9 positives) | Forbidden hits (12 total) | Mean query latency, illustrative |
|---|---:|---:|---:|---:|
| BM25 | 1.00 | 1.00 | 0 | ~4.2 ms |
| LSA | 1.00 | 1.00 | 0 | ~4.6 ms |
| RRF Hybrid | 1.00 | 1.00 | 0 | ~7.9 ms |

All three negative questions returned *some unrelated retrieval candidates*. The separate conservative extractive layer abstained on the two specifically checked unsupported questions; the evaluation script itself **does not score answer-level abstention or entailment**. The latency samples are single-process warm measurements on a tiny corpus, highly sensitive to scheduling and machine and not production SLOs.

**Interpretation:** the three retrievers tie because this fixture is easy; there is **no demonstrated retrieval-quality lift from hybrid**. Zero forbidden hits on twelve cases is a regression observation, not a statistical security guarantee. The metric values have no credible external-validity or confidence interval given this dataset.

## Failures and how I adjusted

During local testing, a stricter excerpt-overlap threshold rejected a correct hybrid-search result because a source sentence paraphrased the test question across two clauses. I updated the fictional fixture's source sentence to explicitly state how BM25 and vector results combine; the expected regression now passes. This demonstrates exactly why synthetic regression fixtures are fragile and why phrase overlap should not be confused with answer understanding.

I also tested deliberately forged quotes and unknown citation IDs: the validator/model adapter rejects them. ACL-denial and version-history regression tests pass. The prompt-injection fixture was treated as source content rather than operational instructions, although a real LLM red-team test is still needed.

## Engineering artifacts

- **Runnable code:** CLI, local web evidence explorer and in-memory retrieval engine in `src/grounded_rag/`.
- **Reproducible fixture:** `data/northstar_synthetic.jsonl` and `evals/questions.jsonl`.
- **Automated tests:** 11 passing unit/regression tests covering offsets, ingestion rejection, permissions, chronological versioning, citations and model response ID validation.
- **Architecture/threat model:** [`architecture.md`](architecture.md).
- **License:** MIT.

### Quick reproduction

```bash
pip install -r requirements.lock
PYTHONPATH=src python -m unittest discover -s tests -v
PYTHONPATH=src python -m grounded_rag evaluate -k 3
PYTHONPATH=src python -m grounded_rag serve --port 8765
```

The demo binds to `127.0.0.1` and requires no paid API. Full setup details appear in [`README.md`](../README.md).

## What I would do next

1. **Harder independent labels:** held-out diverse questions, ambiguous aliases, paraphrases, multilingual queries, contradictory documents and difficult negatives.
2. **Comparison worth publishing:** BM25 vs LSA vs neural embeddings vs rank-fused hybrids on identical authorization, index, hardware and latency constraints.
3. **Answer quality:** human-annotated claim support, citation precision, unsupported-claim rate and calibrated abstention, distinct from retrieval Recall@k.
4. **Production trust:** identity assurance, per-tenant stores, revocation tests, deletion propagation, malicious content/OCR, audit trails and rate-limited authenticated APIs.
5. **Model trials:** separately instrument and red-team a local generator; never label a returned citation as factual validation without semantic checks.

## Closing thought

I consider the most valuable output of this project its *inspectability*: source records, explicit contracts, ablation code and negative tests can all be reproduced. A useful RAG system should know not only **what it found**, but also **what it cannot responsibly claim**.

— **Pathan Afnan Khan**
