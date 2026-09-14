import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { articleFieldNotes, articleBySlug } from "../../data/articleFieldNotes";
import { projectBySlug } from "../../data/projectCaseStudies";

const SITE = "https://pathan-afnan-khan.vercel.app";

export default function ArticlePage({ article, relatedProjects }) {
  const canonical = `${SITE}/articles/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: canonical,
    mainEntityOfPage: canonical,
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    keywords: article.keywords.join(", "),
    author: {
      "@type": "Person",
      name: "Pathan Afnan Khan",
      url: SITE,
      sameAs: [
        "https://www.linkedin.com/in/afnan-khan4/",
        "https://github.com/PathanAfnanKhan020319",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Pathan Afnan Khan",
      url: SITE,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  return (
    <>
      <Head>
        <title>{article.seoTitle}</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={article.keywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.seoTitle} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:url" content={canonical} />
        <meta property="article:author" content="Pathan Afnan Khan" />
        <meta property="article:published_time" content="2026-09-14" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      </Head>

      <main className="w-full min-h-screen text-dark dark:text-light">
        <Layout className="pt-24 sm:pt-16">
          <article className="max-w-4xl mx-auto">
            <nav className="mb-10 text-sm text-dark/60 dark:text-light/60">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/articles" className="hover:underline">Articles</Link>
              <span className="mx-2">/</span>
              <span>{article.title}</span>
            </nav>

            <header className="border-b border-dark/15 dark:border-light/15 pb-10">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-dark/60 dark:text-light/60 mb-4">
                AI Engineering Field Note · Pathan Afnan Khan
              </p>
              <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold leading-tight">
                {article.title}
              </h1>
              <p className="mt-6 text-xl md:text-lg leading-8 text-dark/70 dark:text-light/70">
                {article.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-dark/20 dark:border-light/20 px-3 py-1 text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </header>

            <div className="mt-12 space-y-12">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl md:text-2xl font-bold mb-5">{section.heading}</h2>
                  <div className="space-y-5 text-[17px] md:text-base leading-8 text-dark/80 dark:text-light/80">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>

            {relatedProjects.length > 0 && (
              <aside className="mt-16 border-t border-dark/15 dark:border-light/15 pt-10">
                <p className="uppercase tracking-[0.22em] text-xs opacity-60 mb-3">Related case studies</p>
                <h2 className="text-3xl md:text-2xl font-bold mb-7">See the ideas applied in real AI systems.</h2>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="rounded-2xl border border-dark/15 dark:border-light/15 p-5 hover:bg-dark/5 dark:hover:bg-light/5 transition-colors"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] opacity-55 mb-2">{project.category}</p>
                      <h3 className="font-bold text-lg leading-snug">{project.title}</h3>
                      <p className="mt-2 text-sm opacity-65 leading-6">{project.description}</p>
                    </Link>
                  ))}
                </div>
              </aside>
            )}

            <aside className="mt-16 rounded-2xl bg-dark text-light dark:bg-light dark:text-dark p-9 sm:p-7">
              <p className="text-xs uppercase tracking-[0.22em] opacity-60 mb-3">Continue exploring</p>
              <div className="flex flex-wrap gap-6 font-semibold">
                <Link href="/articles" className="underline underline-offset-4">All field notes</Link>
                <Link href="/projects" className="underline underline-offset-4">AI case studies</Link>
                <Link href="/resume" className="underline underline-offset-4">Professional profile</Link>
              </div>
            </aside>
          </article>
        </Layout>
      </main>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: articleFieldNotes.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const article = articleBySlug[params.slug];
  if (!article) return { notFound: true };

  const relatedProjects = article.relatedProjectSlugs
    .map((slug) => projectBySlug[slug])
    .filter(Boolean);

  return { props: { article, relatedProjects } };
}
