import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { projectCaseStudies, projectBySlug } from "../../data/projectCaseStudies";
import { articleFieldNotes } from "../../data/articleFieldNotes";

const SITE = "https://pathan-afnan-khan.vercel.app";

export default function ProjectCaseStudy({ project, relatedArticles }) {
  const canonical = `${SITE}/projects/${project.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: canonical,
    keywords: project.keywords.join(", "),
    author: {
      "@type": "Person",
      name: "Pathan Afnan Khan",
      url: SITE,
      sameAs: [
        "https://www.linkedin.com/in/afnan-khan4/",
        "https://github.com/PathanAfnanKhan020319",
      ],
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: canonical },
    ],
  };

  return (
    <>
      <Head>
        <title>{project.seoTitle}</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.keywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={project.seoTitle} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      </Head>

      <main className="w-full min-h-screen text-dark dark:text-light">
        <Layout className="pt-24 sm:pt-16">
          <nav className="mb-10 text-sm text-dark/60 dark:text-light/60">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <span className="mx-2">/</span>
            <span>{project.title}</span>
          </nav>

          <section className="max-w-5xl mx-auto">
            <div className="mb-12 border-b border-dark/15 dark:border-light/15 pb-10">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-dark/60 dark:text-light/60 mb-4">
                {project.category}
              </p>
              <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold leading-tight mb-6">
                {project.title}
              </h1>
              <p className="text-xl md:text-lg text-dark/75 dark:text-light/75 leading-relaxed max-w-4xl">
                {project.description}
              </p>

              <div className="grid grid-cols-3 md:grid-cols-1 gap-4 mt-8 text-sm">
                <div>
                  <p className="text-dark/50 dark:text-light/50">Role</p>
                  <p className="font-semibold mt-1">{project.role}</p>
                </div>
                <div>
                  <p className="text-dark/50 dark:text-light/50">Context</p>
                  <p className="font-semibold mt-1">{project.organization}</p>
                </div>
                <div>
                  <p className="text-dark/50 dark:text-light/50">Period</p>
                  <p className="font-semibold mt-1">{project.period}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-14">
              <article>
                <h2 className="text-2xl font-bold mb-4">The challenge</h2>
                <p className="text-dark/75 dark:text-light/75 leading-8">{project.challenge}</p>
              </article>

              <article>
                <h2 className="text-2xl font-bold mb-4">What I built</h2>
                <p className="text-dark/75 dark:text-light/75 leading-8">{project.solution}</p>
              </article>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-10 mt-16">
              <section className="rounded-2xl border border-dark/15 dark:border-light/15 p-8">
                <h2 className="text-2xl font-bold mb-6">Architecture</h2>
                <ul className="space-y-4">
                  {project.architecture.map((item) => (
                    <li key={item} className="flex gap-3 text-dark/75 dark:text-light/75">
                      <span aria-hidden="true">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-dark/15 dark:border-light/15 p-8">
                <h2 className="text-2xl font-bold mb-6">Outcomes</h2>
                <ul className="space-y-4">
                  {project.outcomes.map((item) => (
                    <li key={item} className="flex gap-3 text-dark/75 dark:text-light/75">
                      <span aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-14">
              <h2 className="text-2xl font-bold mb-5">Technology</h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-dark/20 dark:border-light/20 px-4 py-2 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {relatedArticles.length > 0 && (
              <aside className="mt-16 border-t border-dark/15 dark:border-light/15 pt-10">
                <p className="uppercase tracking-[0.22em] text-xs opacity-60 mb-3">Related engineering notes</p>
                <h2 className="text-3xl sm:text-2xl font-bold mb-7">
                  The engineering ideas behind this system.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      className="rounded-2xl border border-dark/15 dark:border-light/15 p-5 hover:bg-dark/5 dark:hover:bg-light/5 transition-colors"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] opacity-55 mb-2">Field note</p>
                      <h3 className="font-bold text-lg leading-snug">{article.title}</h3>
                      <p className="mt-2 text-sm opacity-65 leading-6">{article.summary}</p>
                    </Link>
                  ))}
                </div>
              </aside>
            )}

            <aside className="mt-20 rounded-2xl bg-dark text-light dark:bg-light dark:text-dark p-10 sm:p-7">
              <p className="uppercase tracking-[0.24em] text-xs opacity-60 mb-3">Explore more</p>
              <h2 className="text-3xl sm:text-2xl font-bold mb-6">
                More AI systems, experiments and engineering work.
              </h2>
              <div className="flex flex-wrap gap-5">
                <Link href="/projects" className="underline underline-offset-4">All projects</Link>
                <Link href="/articles" className="underline underline-offset-4">Technical field notes</Link>
                <Link href="/resume" className="underline underline-offset-4">Professional profile</Link>
              </div>
            </aside>
          </section>
        </Layout>
      </main>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: projectCaseStudies.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const project = projectBySlug[params.slug];
  if (!project) return { notFound: true };

  const relatedArticles = articleFieldNotes.filter((article) =>
    article.relatedProjectSlugs.includes(project.slug)
  );

  return {
    props: { project, relatedArticles },
  };
}
