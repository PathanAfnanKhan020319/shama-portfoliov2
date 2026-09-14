import Head from "next/head";
import Link from "next/link";

const SITE = "https://pathan-afnan-khan.vercel.app";

const skillGroups = [
  ["Agentic AI", "LangGraph, tool calling, structured outputs, stateful workflows, multi-agent systems"],
  ["Generative AI & LLMs", "OpenAI, Gemini, Claude, prompt engineering, evaluation and guardrails"],
  ["RAG & Search", "Embeddings, vector search, hybrid retrieval, metadata filtering, reranking and citations"],
  ["AI Engineering", "Python, FastAPI, APIs, orchestration, testing, observability and production deployment"],
  ["MLOps & Cloud", "Docker, Kubernetes, Azure, AWS, GCP, monitoring and scalable inference"],
  ["Data Science & ML", "Machine learning, NLP, computer vision, experimentation, analytics and SQL"],
];

export default function ResumePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Pathan Afnan Khan — Professional AI Engineering Profile",
    url: `${SITE}/resume`,
    dateModified: "2026-09-14",
    mainEntity: {
      "@type": "Person",
      name: "Pathan Afnan Khan",
      url: SITE,
      image: `${SITE}/images/profile/afnan-think-exact.jpg`,
      jobTitle: [
        "AI Engineer",
        "Data Scientist",
        "Agentic AI Engineer",
        "Generative AI Engineer",
      ],
      description:
        "AI/ML Engineer with 4+ years of experience building production AI systems across Agentic AI, Generative AI, LLMs, RAG, Machine Learning, APIs, MLOps and cloud platforms.",
      knowsAbout: [
        "Agentic AI",
        "Generative AI",
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Machine Learning",
        "Data Science",
        "MLOps",
        "FastAPI",
        "LangGraph",
        "Cloud AI",
      ],
      sameAs: [
        "https://www.linkedin.com/in/afnan-khan4/",
        "https://github.com/PathanAfnanKhan020319",
      ],
    },
  };

  return (
    <>
      <Head>
        <title>Pathan Afnan Khan Resume | AI Engineer & Agentic AI</title>
        <meta
          name="description"
          content="Professional profile of Pathan Afnan Khan, an AI Engineer and Data Scientist with 4+ years of experience in Agentic AI, Generative AI, LLMs, RAG, ML, MLOps and cloud AI."
        />
        <meta
          name="keywords"
          content="Pathan Afnan Khan resume, Pathan Afnan Khan AI Engineer, Agentic AI Engineer, Data Scientist, Generative AI Engineer, LLM Engineer, RAG Engineer, MLOps"
        />
        <meta property="og:title" content="Pathan Afnan Khan | AI Engineer & Agentic AI" />
        <meta
          property="og:description"
          content="Professional AI engineering profile covering Agentic AI, LLMs, RAG, ML, MLOps and cloud systems."
        />
        <meta property="og:url" content={`${SITE}/resume`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>

      <main className="min-h-screen bg-light text-dark dark:bg-dark dark:text-light pt-28 pb-24">
        <div className="mx-auto w-[90%] max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">
            Official professional profile
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-4xl sm:text-3xl">
            Pathan Afnan Khan
          </h1>
          <p className="mt-3 text-xl font-medium opacity-75 md:text-lg">
            AI Engineer · Data Scientist · Agentic AI Engineer · Generative AI Engineer
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 opacity-80 md:text-base md:leading-7">
            AI/ML Engineer with 4+ years of experience building applied and production-grade AI systems. My work focuses on systems that retrieve knowledge, reason over context, use tools, automate workflows and operate reliably in real-world environments.
          </p>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Core expertise</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-1">
              {skillGroups.map(([title, detail]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-dark/10 bg-white/50 p-6 dark:border-light/10 dark:bg-light/[0.03]"
                >
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 opacity-70">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl border border-dark/10 p-8 dark:border-light/10 md:p-6">
            <h2 className="text-2xl font-bold">What I focus on in production</h2>
            <p className="mt-5 max-w-3xl leading-7 opacity-80">
              Reliable retrieval, typed tool interfaces, structured outputs, evaluation, grounded responses, latency and cost control, observability, access boundaries, failure recovery and cloud deployment. The goal is not just a strong demo — it is an AI system that can be measured, maintained and trusted.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Public profiles & work</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a className="underline underline-offset-4" href="https://www.linkedin.com/in/afnan-khan4/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="underline underline-offset-4" href="https://github.com/PathanAfnanKhan020319" target="_blank" rel="noreferrer">GitHub ↗</a>
              <Link className="underline underline-offset-4" href="/projects">Projects →</Link>
              <Link className="underline underline-offset-4" href="/articles">AI field notes →</Link>
              <a className="underline underline-offset-4" href="/afnans.pdf" target="_blank" rel="noreferrer">Resume PDF ↗</a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
