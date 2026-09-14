import Head from "next/head";
import Link from "next/link";

const SITE = "https://pathan-afnan-khan.vercel.app";

const notes = [
  {
    title: "Production RAG: retrieval quality matters more than model size",
    slug: "production-rag-retrieval-quality",
    summary:
      "A practical view of why chunking, metadata, hybrid retrieval, reranking and evaluation usually move RAG quality more than simply switching to a larger language model.",
    body: [
      "In production RAG systems, the language model is only one part of the quality chain. If the system retrieves the wrong evidence, even a strong model can produce a polished but weak answer.",
      "I treat retrieval as an engineering problem: preserve document structure, use metadata filters where they reduce ambiguity, combine semantic retrieval with lexical signals when needed, and rerank the final candidate set before generation.",
      "Evaluation also needs to be explicit. Retrieval hit rate, precision at k, MRR, answer groundedness, latency and cost should be tracked independently so a team can tell whether a failure came from search, context construction or generation.",
    ],
    keywords: ["RAG", "Vector Search", "Reranking", "LLM Evaluation"],
  },
  {
    title: "Reliable AI agents need deterministic boundaries",
    slug: "reliable-ai-agents-deterministic-boundaries",
    summary:
      "Why production agents work better when reasoning is paired with typed tools, validation, explicit state, recovery paths and human review for high-impact actions.",
    body: [
      "An agent should not be autonomous everywhere. The strongest production designs give the model freedom where reasoning helps, while keeping calculations, permissions, side effects and business rules deterministic.",
      "Typed tool schemas, structured outputs, state machines and validation layers make behavior easier to test. Retries should be bounded, tool failures should be observable, and sensitive actions should have approval gates rather than relying on prompt wording alone.",
      "For multi-agent systems, I prefer clear ownership between agents instead of having several models reason over the same task without boundaries. That reduces duplicated work, hidden loops and hard-to-debug failures.",
    ],
    keywords: ["Agentic AI", "LangGraph", "Tool Calling", "Structured Outputs"],
  },
  {
    title: "LLM observability should explain why a system failed",
    slug: "llm-observability-production-ai",
    summary:
      "A production-oriented observability checklist covering traces, prompts, tool calls, retrieval evidence, latency, cost, evaluation and user feedback.",
    body: [
      "Traditional uptime metrics are not enough for an LLM application. A service can return HTTP 200 and still give the user the wrong answer, cite irrelevant evidence or call the wrong tool.",
      "Useful observability captures the full path: user intent, prompt version, retrieved context, model choice, structured output validation, tool calls, retries, latency, token usage and the final answer. That trace makes failures reproducible instead of anecdotal.",
      "I also separate online monitoring from offline evaluation. Online metrics surface regressions in latency, cost and user behavior; curated evaluation sets measure answer quality, groundedness and retrieval performance before changes reach production.",
    ],
    keywords: ["LLM Observability", "Evaluation", "Tracing", "MLOps"],
  },
];

export default function Articles() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Engineering Field Notes by Pathan Afnan Khan",
    url: `${SITE}/articles`,
    description:
      "Practical notes on Agentic AI, RAG, LLM evaluation, observability and production AI engineering by Pathan Afnan Khan.",
    author: {
      "@type": "Person",
      name: "Pathan Afnan Khan",
      url: SITE,
      sameAs: [
        "https://www.linkedin.com/in/afnan-khan4/",
        "https://github.com/PathanAfnanKhan020319",
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: notes.map((note, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: note.title,
          description: note.summary,
          author: { "@type": "Person", name: "Pathan Afnan Khan" },
          datePublished: "2026-09-14",
          dateModified: "2026-09-14",
          mainEntityOfPage: `${SITE}/articles#${note.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <Head>
        <title>AI Engineering Articles | Pathan Afnan Khan</title>
        <meta
          name="description"
          content="AI engineering field notes by Pathan Afnan Khan on Agentic AI, RAG, LLM evaluation, observability, MLOps and production-grade AI systems."
        />
        <meta
          name="keywords"
          content="Pathan Afnan Khan articles, Agentic AI, RAG, LLM evaluation, LLM observability, AI Engineer, production AI, MLOps"
        />
        <meta property="og:title" content="AI Engineering Field Notes | Pathan Afnan Khan" />
        <meta
          property="og:description"
          content="Practical writing on Agentic AI, RAG, evaluation, observability and production AI systems."
        />
        <meta property="og:url" content={`${SITE}/articles`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      </Head>

      <main className="min-h-screen bg-light text-dark dark:bg-dark dark:text-light pt-28 pb-24">
        <div className="mx-auto w-[90%] max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">
            Pathan Afnan Khan · AI Engineering Field Notes
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-4xl sm:text-3xl">
            Notes on building AI systems that work beyond the demo.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 opacity-75 md:text-base md:leading-7">
            Practical notes on retrieval, agents, evaluation and observability — the parts of AI engineering that decide whether a system survives production.
          </p>

          <div className="mt-14 space-y-10">
            {notes.map((note) => (
              <article
                key={note.slug}
                id={note.slug}
                className="rounded-3xl border border-dark/10 bg-white/50 p-8 dark:border-light/10 dark:bg-light/[0.03] md:p-6"
              >
                <h2 className="text-3xl font-bold leading-tight md:text-2xl">{note.title}</h2>
                <p className="mt-4 text-base leading-7 opacity-70">{note.summary}</p>
                <div className="mt-6 space-y-4 text-[15px] leading-7 opacity-90">
                  {note.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {note.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-dark/15 px-3 py-1 text-xs dark:border-light/15"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-5 text-sm font-semibold">
            <Link className="underline underline-offset-4" href="/projects">Explore projects →</Link>
            <Link className="underline underline-offset-4" href="/about">About Pathan Afnan Khan →</Link>
            <Link className="underline underline-offset-4" href="/resume">Professional profile →</Link>
          </div>
        </div>
      </main>
    </>
  );
}
