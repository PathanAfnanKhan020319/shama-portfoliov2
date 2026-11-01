import Head from "next/head";
import Link from "next/link";

const SITE = "https://pathan-afnan-khan.vercel.app";
const publications = [
  {
    "name": "Applied AI Engineering",
    "url": "https://afnan-ai-engineering.vercel.app/",
    "description": "Systems, evidence, and production AI architecture."
  },
  {
    "name": "Agentic Systems",
    "url": "https://afnan-agentic-systems.vercel.app/",
    "description": "Bounded autonomy, multi-agent orchestration, and agent safety."
  },
  {
    "name": "RAG Research",
    "url": "https://afnan-rag-research.vercel.app/",
    "description": "Retrieval quality, entity linking, and grounded generation."
  },
  {
    "name": "MLOps Field Notes",
    "url": "https://afnan-mlops-fieldnotes.vercel.app/",
    "description": "Observability, versioning, and AI evaluation pipelines."
  },
  {
    "name": "Technology Vision",
    "url": "https://afnan-tech-vision.vercel.app/",
    "description": "Human-centered AI, entrepreneurship, and useful technology."
  }
];

export default function Publications() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": SITE + "/publications#webpage",
    url: SITE + "/publications",
    name: "AI Engineering Publications by Pathan Afnan Khan",
    description: "Five technical publications on applied AI, agents, retrieval, MLOps and responsible technology by Pathan Afnan Khan.",
    author: { "@id": SITE + "/#person" },
    isPartOf: { "@id": SITE + "/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publications.map((publication, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: publication.name,
        url: publication.url,
      })),
    },
  };

  return (
    <>
      <Head>
        <title>Publications & AI Research | Pathan Afnan Khan</title>
        <meta
          name="description"
          content="Explore five publications by Pathan Afnan Khan covering applied AI engineering, agentic systems, RAG research, MLOps and technology vision."
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <section className="min-h-screen bg-light px-8 pb-24 pt-36 text-dark dark:bg-dark dark:text-light sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-dark/60 dark:text-light/60">
            Pathan Afnan Khan / Independent Publications
          </p>
          <h1 className="mb-7 text-5xl font-bold tracking-tight md:text-4xl sm:text-3xl">
            AI Engineering & Research Publications
          </h1>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-dark/75 dark:text-light/75">
            A collection of technical essays and field notes authored by Pathan Afnan Khan, an AI Engineer and Data Scientist, focused on making intelligent systems useful and dependable.
          </p>
          <article className="mb-10 rounded-3xl border border-dark/15 bg-dark/[0.04] p-8 dark:border-light/20 dark:bg-light/[0.05]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">Featured original research · Open source</p>
            <h2 className="mt-4 text-3xl font-bold">Grounded RAG Lab: evidence-first retrieval</h2>
            <p className="mt-4 max-w-3xl leading-7 text-dark/70 dark:text-light/70">
              A runnable, MIT-licensed research prototype with BM25, LSA vectors, hybrid fusion,
              exact citations, permission tests and an honestly reported 12-question synthetic evaluation.
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
              <Link href="/articles/grounded-rag-lab-evidence-first-retrieval" className="underline underline-offset-4">Read the case study ↗</Link>
              <a href="https://github.com/PathanAfnanKhan020319/shama-portfoliov2/tree/main/open-source/grounded-rag-lab" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Source & tests ↗</a>
            </div>
          </article>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
            {publications.map((publication) => (
              <a
                key={publication.url}
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-dark/10 p-7 transition-colors hover:bg-dark/5 dark:border-light/20 dark:hover:bg-light/5"
              >
                <h2 className="mb-3 text-xl font-bold">{publication.name}</h2>
                <p className="mb-4 text-dark/70 dark:text-light/70">{publication.description}</p>
                <span className="text-sm font-semibold underline">Visit publication ↗</span>
              </a>
            ))}
          </div>
          <p className="mt-12 text-sm text-dark/70 dark:text-light/70">
            These publications are authored and operated by Pathan Afnan Khan. They are not independent third-party endorsements.
          </p>
          <Link href="/articles" className="mt-8 inline-block font-semibold underline">
            View articles on the main portfolio
          </Link>
        </div>
      </section>
    </>
  );
}
