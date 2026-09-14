export const articleFieldNotes = [
  {
    slug: "production-rag-retrieval-quality",
    title: "Production RAG: retrieval quality matters more than model size",
    seoTitle: "Production RAG Retrieval Quality | Pathan Afnan Khan",
    summary:
      "A practical guide to improving production RAG through chunking, metadata, hybrid retrieval, reranking and explicit evaluation instead of relying on a larger language model alone.",
    excerpt:
      "If retrieval is weak, even a strong model will produce a polished answer from the wrong evidence. Production RAG quality starts with search, ranking and evaluation.",
    keywords: [
      "Production RAG",
      "Retrieval-Augmented Generation",
      "Vector Search",
      "Reranking",
      "LLM Evaluation",
      "Semantic Search",
    ],
    relatedProjectSlugs: [
      "rag-semantic-search",
      "resume-analyzer-rag",
      "dash-2-enterprise-ai-assistant",
    ],
    sections: [
      {
        heading: "The model cannot rescue bad retrieval",
        paragraphs: [
          "In production RAG systems, the language model is only one part of the quality chain. If the retriever returns weak or irrelevant evidence, a larger model may make the final answer sound better without making it more correct.",
          "That is why I treat retrieval quality as a first-class engineering problem. The goal is not simply to return semantically similar chunks; it is to return the smallest set of evidence that is relevant, authorized, traceable and sufficient for the user's question.",
        ],
      },
      {
        heading: "Chunking should preserve meaning and structure",
        paragraphs: [
          "Naive fixed-size chunking can separate a heading from the paragraph it explains, split table rows from their labels, or destroy document hierarchy. Section-aware and structure-aware chunking usually gives retrieval a better representation of the source material.",
          "Metadata should travel with every chunk. Domain, owner, document type, access scope, seniority, date or business unit can all become useful retrieval filters when they reflect real user intent.",
        ],
      },
      {
        heading: "Hybrid retrieval and reranking improve precision",
        paragraphs: [
          "Semantic similarity is powerful, but lexical matching still matters for product codes, acronyms, exact skills, identifiers and domain-specific terminology. Combining semantic and lexical signals often produces a stronger candidate set than either approach alone.",
          "I prefer to retrieve broadly and then rerank a smaller candidate set with a relevance model or cross-encoder. This gives the generator a cleaner context window and reduces the amount of unrelated evidence that can distract the final answer.",
        ],
      },
      {
        heading: "Measure the retrieval layer separately",
        paragraphs: [
          "A RAG evaluation should distinguish retrieval failures from generation failures. Metrics such as hit rate, precision at k, MRR and citation relevance help show whether the right evidence was found before the LLM answered.",
          "Answer groundedness, latency, token cost and user feedback then complete the picture. When these signals are tracked separately, teams can improve the actual failing component instead of changing prompts or models blindly.",
        ],
      },
    ],
  },
  {
    slug: "reliable-ai-agents-deterministic-boundaries",
    title: "Reliable AI agents need deterministic boundaries",
    seoTitle: "Reliable AI Agents & Deterministic Boundaries | Pathan Afnan Khan",
    summary:
      "Why production AI agents become more reliable when reasoning is paired with typed tools, validation, explicit state, bounded retries, approvals and deterministic business logic.",
    excerpt:
      "The most reliable agents are not autonomous everywhere. They reason where reasoning helps, and hand deterministic work to typed tools, rules and validation layers.",
    keywords: [
      "Agentic AI",
      "AI Agents",
      "LangGraph",
      "Tool Calling",
      "Structured Outputs",
      "AI Reliability",
    ],
    relatedProjectSlugs: [
      "dash-2-enterprise-ai-assistant",
      "gwen-ai-workflow-automation",
      "genai-data-glossary",
    ],
    sections: [
      {
        heading: "Autonomy should be selective",
        paragraphs: [
          "An agent should not be autonomous everywhere. Reasoning is useful for interpreting ambiguous requests, planning and choosing among tools, but calculations, permissions, side effects and core business rules should remain deterministic whenever possible.",
          "This creates a clear contract between the model and the rest of the system: the model decides what should happen, while trusted code decides whether and how that action is allowed to happen.",
        ],
      },
      {
        heading: "Typed tools make behavior testable",
        paragraphs: [
          "Tool schemas should be explicit about required fields, accepted values and output shapes. Structured outputs make downstream handling easier to validate and reduce the chance that free-form text silently becomes an action.",
          "I also prefer explicit state for multi-step flows. A state machine or graph makes it clear what has already happened, what can happen next and where recovery should resume after a failure.",
        ],
      },
      {
        heading: "Retries need limits and recovery paths",
        paragraphs: [
          "Unbounded agent loops are difficult to operate in production. Retries should have clear ceilings, tool failures should be visible in traces, and fallback behavior should be designed rather than improvised by the model.",
          "For high-impact actions, human approval is a stronger control than prompt wording. Approval gates are especially useful around external side effects, access changes, irreversible operations or actions with compliance implications.",
        ],
      },
      {
        heading: "Multi-agent systems need ownership",
        paragraphs: [
          "Multiple agents are useful when responsibilities are genuinely different. A planning agent, execution agent and review agent can work well when each has a narrow contract and clear handoff criteria.",
          "What I try to avoid is several agents repeatedly reasoning over the same task without ownership boundaries. That usually increases latency, cost and debugging difficulty without creating a corresponding reliability gain.",
        ],
      },
    ],
  },
  {
    slug: "llm-observability-production-ai",
    title: "LLM observability should explain why a system failed",
    seoTitle: "LLM Observability for Production AI | Pathan Afnan Khan",
    summary:
      "A production-oriented observability framework for LLM systems covering traces, prompts, retrieval evidence, tool calls, latency, cost, evaluation and user feedback.",
    excerpt:
      "HTTP 200 does not mean an AI system worked. Good LLM observability should make failures reproducible by showing the full reasoning and retrieval path around each response.",
    keywords: [
      "LLM Observability",
      "LLM Evaluation",
      "AI Monitoring",
      "Tracing",
      "MLOps",
      "Production AI",
    ],
    relatedProjectSlugs: [
      "dash-2-enterprise-ai-assistant",
      "rag-semantic-search",
      "slide-narrator-multimodal-ai",
    ],
    sections: [
      {
        heading: "Uptime is not answer quality",
        paragraphs: [
          "Traditional service metrics are necessary but incomplete for an LLM application. A request can return HTTP 200 while the model cites irrelevant evidence, misunderstands intent, chooses the wrong tool or produces an answer that is fluent but unsupported.",
          "Observability therefore has to capture semantic behavior as well as infrastructure behavior.",
        ],
      },
      {
        heading: "Capture the complete execution path",
        paragraphs: [
          "A useful trace records user intent, prompt version, model choice, retrieved context, tool calls, structured-output validation, retries, latency, token usage and the final answer. For RAG systems, the retrieved evidence and its ranking are especially important.",
          "When this context is attached to each request, failures become reproducible. Teams can compare successful and unsuccessful runs instead of relying on screenshots or anecdotal reports.",
        ],
      },
      {
        heading: "Separate online monitoring from offline evaluation",
        paragraphs: [
          "Online monitoring should catch operational regressions such as rising latency, higher cost, tool failures, empty retrievals and changes in user behavior. Offline evaluation should measure quality on a curated dataset before a model, prompt or retrieval change reaches production.",
          "Useful evaluation dimensions include groundedness, answer relevance, retrieval quality, structured-output validity and task completion. The exact score matters less than having a stable benchmark that makes regressions visible.",
        ],
      },
      {
        heading: "Feedback should connect back to traces",
        paragraphs: [
          "User feedback is most valuable when it can be connected to the exact prompt, retrieval result and tool path that produced the answer. A thumbs-down without execution context tells a team that something went wrong, but not why.",
          "Closing that loop turns production feedback into engineering evidence and helps prioritize the changes that actually improve user outcomes.",
        ],
      },
    ],
  },
];

export const articleBySlug = Object.fromEntries(
  articleFieldNotes.map((article) => [article.slug, article])
);
