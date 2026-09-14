import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { projectCaseStudies } from "../data/projectCaseStudies";

const SITE = "https://pathan-afnan-khan.vercel.app";

export default function Projects() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Engineering Projects — Pathan Afnan Khan",
    description:
      "Selected production AI, RAG, agentic AI, multimodal AI and enterprise data projects by Pathan Afnan Khan.",
    url: `${SITE}/projects`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projectCaseStudies.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE}/projects/${project.slug}`,
      })),
    },
  };

  return (
    <>
      <Head>
        <title>AI Engineering Projects | Pathan Afnan Khan</title>
        <meta
          name="description"
          content="Explore production AI, Agentic AI, RAG, semantic search, multimodal AI, LLM automation and enterprise data projects by Pathan Afnan Khan."
        />
        <meta
          name="keywords"
          content="Pathan Afnan Khan projects, AI Engineer projects, Agentic AI projects, RAG projects, LLM Engineer, Generative AI, MLOps, semantic search"
        />
        <link rel="canonical" href={`${SITE}/projects`} />
        <meta property="og:title" content="AI Engineering Projects | Pathan Afnan Khan" />
        <meta
          property="og:description"
          content="Selected production AI systems and case studies across Agentic AI, RAG, multimodal AI and enterprise data."
        />
        <meta property="og:url" content={`${SITE}/projects`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      </Head>

      <main className="w-full min-h-screen text-dark dark:text-light">
        <Layout className="pt-24 sm:pt-16">
          <section className="max-w-6xl mx-auto">
            <div className="max-w-4xl mb-16">
              <p className="uppercase tracking-[0.28em] text-xs font-semibold text-dark/55 dark:text-light/55 mb-5">
                Selected engineering work
              </p>
              <h1 className="text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold leading-tight mb-7">
                AI systems built for real-world use.
              </h1>
              <p className="text-xl md:text-lg leading-8 text-dark/70 dark:text-light/70">
                Production AI, enterprise RAG, semantic search, multimodal systems and workflow automation — with architecture, implementation decisions and measurable outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
              {projectCaseStudies.map((project, index) => (
                <article
                  key={project.slug}
                  className="group rounded-2xl border border-dark/15 dark:border-light/15 p-8 sm:p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-5 mb-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-dark/50 dark:text-light/50 mb-3">
                        {String(index + 1).padStart(2, "0")} / {project.category}
                      </p>
                      <h2 className="text-3xl sm:text-2xl font-bold leading-tight">
                        {project.title}
                      </h2>
                    </div>
                    <span className="text-sm text-dark/45 dark:text-light/45 whitespace-nowrap">
                      {project.period}
                    </span>
                  </div>

                  <p className="text-dark/70 dark:text-light/70 leading-7 mb-7">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.slice(0, 5).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-dark/15 dark:border-light/15 px-3 py-1.5 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-5 border-t border-dark/10 dark:border-light/10 pt-5">
                    <div className="text-sm">
                      <span className="text-dark/45 dark:text-light/45">Role: </span>
                      <span className="font-medium">{project.role}</span>
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-semibold underline underline-offset-4 decoration-1"
                    >
                      Read case study →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-20 border-t border-dark/15 dark:border-light/15 pt-12">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-8 items-end">
                <div>
                  <p className="uppercase tracking-[0.24em] text-xs text-dark/50 dark:text-light/50 mb-4">
                    More context
                  </p>
                  <h2 className="text-4xl md:text-3xl font-bold">
                    See how the projects connect to my broader AI engineering work.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-6 md:justify-start justify-end">
                  <Link href="/about" className="underline underline-offset-4">
                    About
                  </Link>
                  <Link href="/articles" className="underline underline-offset-4">
                    Technical articles
                  </Link>
                  <Link href="/resume" className="underline underline-offset-4">
                    Professional profile
                  </Link>
                </div>
              </div>
            </section>
          </section>
        </Layout>
      </main>
    </>
  );
}
