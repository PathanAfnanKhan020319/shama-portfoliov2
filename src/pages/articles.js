import Head from "next/head";
import Link from "next/link";
import { articleFieldNotes } from "../data/articleFieldNotes";

const SITE = "https://pathan-afnan-khan.vercel.app";

export default function Articles() {
  const collectionSchema = {
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
      itemListElement: articleFieldNotes.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE}/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <Head>
        <title>AI Engineering Articles | Pathan Afnan Khan</title>
        <meta
          name="description"
          content="AI engineering field notes by Pathan Afnan Khan on Agentic AI, production RAG, LLM evaluation, observability, MLOps and reliable AI systems."
        />
        <meta
          name="keywords"
          content="Pathan Afnan Khan articles, Agentic AI, production RAG, LLM evaluation, LLM observability, AI Engineer, production AI, MLOps"
        />
        <link rel="canonical" href={`${SITE}/articles`} />
        <meta property="og:title" content="AI Engineering Field Notes | Pathan Afnan Khan" />
        <meta
          property="og:description"
          content="Practical writing on Agentic AI, RAG, evaluation, observability and production AI systems."
        />
        <meta property="og:url" content={`${SITE}/articles`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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

          <div className="mt-14 grid grid-cols-1 gap-6">
            {articleFieldNotes.map((article) => (
              <article
                key={article.slug}
                className="rounded-3xl border border-dark/10 bg-white/50 p-8 dark:border-light/10 dark:bg-light/[0.03] md:p-6"
              >
                <p className="text-xs uppercase tracking-[0.18em] opacity-55 mb-3">AI Engineering</p>
                <h2 className="text-3xl font-bold leading-tight md:text-2xl">
                  <Link href={`/articles/${article.slug}`} className="hover:underline underline-offset-4">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-7 opacity-70">{article.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {article.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-dark/15 px-3 py-1 text-xs dark:border-light/15"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-7 inline-block text-sm font-semibold underline underline-offset-4"
                >
                  Read field note →
                </Link>
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
