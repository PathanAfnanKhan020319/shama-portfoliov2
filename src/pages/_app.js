import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";
import RecruiterMode from "@/components/RecruiterMode";
import RecruiterLauncher from "@/components/RecruiterLauncher";
import AskAfnan from "@/components/AskAfnan";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

const SITE_URL = "https://pathan-afnan-khan.vercel.app";
const PROFILE_IMAGE = `${SITE_URL}/images/profile/pathan-afnan-khan-ai-engineer.jpg`;
const PROFILE_IMAGE_ID = `${SITE_URL}/#primaryimage`;
const ROUTES_TO_PREFETCH = ["/", "/about", "/projects"];

const identityStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Pathan Afnan Khan",
      alternateName: ["Afnan Khan", "Pathan Afnan"],
      url: SITE_URL,
      image: {
        "@id": PROFILE_IMAGE_ID,
      },
      jobTitle: ["AI Engineer", "Data Scientist", "Agentic AI Engineer"],
      description:
        "AI Engineer and Data Scientist specializing in Agentic AI, Generative AI, LLMs, RAG, Machine Learning, MLOps, and production-grade intelligent systems.",
      sameAs: [
        "https://www.linkedin.com/in/afnan-khan4/",
        "https://github.com/PathanAfnanKhan020319",
        "https://x.com/AfnanKhan",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Agentic AI",
        "Generative AI",
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "LangChain",
        "LangGraph",
        "MLOps",
        "Cloud AI",
      ],
      mainEntityOfPage: {
        "@id": `${SITE_URL}/#profilepage`,
      },
      subjectOf: [
        { "@id": `${SITE_URL}/about#webpage` },
        { "@id": `${SITE_URL}/resume#webpage` },
        { "@id": `${SITE_URL}/projects#webpage` },
        { "@id": `${SITE_URL}/articles#webpage` },
      ],
    },
    {
      "@type": "ImageObject",
      "@id": PROFILE_IMAGE_ID,
      url: PROFILE_IMAGE,
      contentUrl: PROFILE_IMAGE,
      encodingFormat: "image/jpeg",
      name: "Pathan Afnan Khan — AI Engineer and Data Scientist",
      caption: "Pathan Afnan Khan — AI Engineer and Data Scientist",
      creator: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Pathan Afnan Khan — AI Portfolio",
      alternateName: "Afnan Khan AI Portfolio",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
};

const homeProfileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Pathan Afnan Khan | AI Engineer, Data Scientist & Agentic AI",
  description:
    "Official portfolio of Pathan Afnan Khan featuring AI engineering, data science, Agentic AI, Generative AI, LLM, RAG, machine learning, and MLOps work.",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  mainEntity: {
    "@id": `${SITE_URL}/#person`,
  },
  image: {
    "@id": PROFILE_IMAGE_ID,
  },
  primaryImageOfPage: {
    "@id": PROFILE_IMAGE_ID,
  },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const cleanPath = (router.asPath || "/").split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const isHome = router.pathname === "/";

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const prefetchRoutes = () => {
      ROUTES_TO_PREFETCH.forEach((route) => {
        if (route !== router.pathname) {
          router.prefetch(route).catch(() => {});
        }
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetchRoutes, {
        timeout: 1200,
      });

      return () => {
        window.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(prefetchRoutes, 450);
    return () => window.clearTimeout(timeoutId);
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:site_name" content="Pathan Afnan Khan — AI Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={PROFILE_IMAGE} />
        <meta property="og:image:secure_url" content={PROFILE_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="533" />
        <meta
          property="og:image:alt"
          content="Pathan Afnan Khan — AI Engineer and Data Scientist"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@AfnanKhan" />
        <meta name="twitter:image" content={PROFILE_IMAGE} />
        <meta
          name="twitter:image:alt"
          content="Pathan Afnan Khan — AI Engineer and Data Scientist"
        />
        <meta name="theme-color" content="#0b0b0b" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(identityStructuredData),
          }}
        />

        {isHome && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(homeProfileStructuredData),
            }}
          />
        )}
      </Head>

      <main
        className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}
      >
        <NavBar />
        <Component {...pageProps} />
        <Footer />
        <RecruiterMode />
        <RecruiterLauncher />
        <AskAfnan />
      </main>
    </>
  );
}
