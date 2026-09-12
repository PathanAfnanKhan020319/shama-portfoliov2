"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const QUICK_PROMPTS = [
  "Why is Afnan a strong Agentic AI Engineer?",
  "What is his RAG and LLM experience?",
  "Show me his Data Science strengths",
  "What cloud and MLOps experience does he have?",
];

const KNOWLEDGE = [
  {
    id: "overview",
    title: "Profile overview",
    keywords: [
      "about afnan",
      "who is afnan",
      "overview",
      "profile",
      "experience",
      "background",
      "summary",
      "tell me about",
    ],
    answer:
      "Pathan Afnan Khan is an AI/ML Engineer with 4+ years of experience across applied AI, Data Science, Machine Learning, LLM systems, Agentic AI and production engineering. His work spans enterprise assistants, RAG, workflow automation, NLP/CV, APIs, cloud deployment and MLOps, with a strong focus on systems that are measurable and production-ready.",
    links: [
      { label: "Full Experience", href: "/about" },
      { label: "View Projects", href: "/projects" },
    ],
  },
  {
    id: "agentic",
    title: "Agentic AI fit",
    keywords: [
      "agentic",
      "agent",
      "agents",
      "multi agent",
      "multi-agent",
      "langgraph",
      "langchain",
      "tool calling",
      "function calling",
      "orchestration",
      "react",
      "workflow automation",
    ],
    answer:
      "Afnan is a strong fit for Agentic AI roles because he has worked beyond chat interfaces: orchestration, tool/function calling, retrieval, structured outputs, routing, state, guardrails, human review and observability. At DeliverHealth, his work included enterprise AI assistants and workflow automation, while his broader experience covers LangChain/LangGraph-style orchestration and production reliability concerns such as permissions, latency and monitoring.",
    links: [{ label: "See Experience", href: "/about" }],
  },
  {
    id: "rag",
    title: "RAG & retrieval",
    keywords: [
      "rag",
      "retrieval",
      "vector",
      "embedding",
      "embeddings",
      "rerank",
      "reranking",
      "semantic search",
      "pinecone",
      "pgvector",
      "hybrid search",
      "citation",
      "knowledge base",
    ],
    answer:
      "Afnan has hands-on RAG experience across semantic and section-aware chunking, embeddings, vector search, metadata filtering, hybrid retrieval, reranking and citation-grounded answers. His work includes enterprise knowledge assistants and resume/document retrieval systems, with evaluation using metrics such as precision@k and MRR plus human review for retrieval quality.",
    links: [{ label: "Explore Projects", href: "/projects" }],
  },
  {
    id: "llm",
    title: "LLM engineering",
    keywords: [
      "llm",
      "large language",
      "openai",
      "azure openai",
      "claude",
      "gemini",
      "prompt",
      "prompting",
      "structured output",
      "context engineering",
      "generative ai",
      "genai",
    ],
    answer:
      "His LLM engineering work covers Azure OpenAI and other modern model ecosystems, retrieval-augmented generation, context engineering, structured outputs, prompt systems, evaluation, citations and production integration. He has also worked with multimodal document workflows, summarization and enterprise assistants where reliability and groundedness matter more than prompt demos alone.",
    links: [{ label: "View Projects", href: "/projects" }],
  },
  {
    id: "data-science",
    title: "Data Science fit",
    keywords: [
      "data scientist",
      "data science",
      "statistics",
      "experimentation",
      "analytics",
      "machine learning",
      "model evaluation",
      "classification",
      "clustering",
      "nlp",
      "computer vision",
      "cv",
    ],
    answer:
      "For Data Scientist roles, Afnan brings a mix of machine learning, statistics, experimentation, NLP, computer vision, analytics and evaluation. He has applied these skills to enterprise search, document intelligence, OCR, semantic systems and ML workflows, while tying technical work back to measurable business outcomes rather than model metrics alone.",
    links: [{ label: "See Role Evidence", href: "/about" }],
  },
  {
    id: "ml-engineering",
    title: "ML Engineering fit",
    keywords: [
      "ml engineer",
      "machine learning engineer",
      "inference",
      "fastapi",
      "python",
      "docker",
      "kubernetes",
      "aks",
      "api",
      "deployment",
      "production ml",
    ],
    answer:
      "Afnan's ML Engineering strength is end-to-end delivery: Python services, FastAPI, inference, Docker, Kubernetes/AKS, orchestration, data pipelines and production monitoring. He is comfortable connecting models to APIs and cloud infrastructure, then operating them with latency, health and reliability in mind.",
    links: [{ label: "Full Experience", href: "/about" }],
  },
  {
    id: "mlops",
    title: "MLOps & production",
    keywords: [
      "mlops",
      "airflow",
      "kafka",
      "prometheus",
      "grafana",
      "monitoring",
      "observability",
      "pipeline",
      "pipelines",
      "devops",
      "kubernetes",
      "docker",
    ],
    answer:
      "His MLOps experience includes Airflow DAGs, Python pipelines, Docker, Kubernetes/AKS, Kafka, monitoring and cloud deployment. He has worked with production observability across latency, service health and operational metrics, and understands that reliable AI delivery includes infrastructure and recovery—not just model training.",
    links: [{ label: "See Experience", href: "/about" }],
  },
  {
    id: "cloud",
    title: "Cloud experience",
    keywords: [
      "cloud",
      "aws",
      "azure",
      "gcp",
      "google cloud",
      "vertex ai",
      "bedrock",
      "sagemaker",
      "cloud run",
      "container apps",
    ],
    answer:
      "Afnan has worked across Azure, AWS and GCP. His experience includes Azure OpenAI, AKS and Azure storage/services; AWS services used around AI/data workloads; and GCP/Vertex AI patterns including Gemini, Cloud Run and managed AI components. That multi-cloud exposure is useful for teams that need model and infrastructure choices driven by product constraints rather than a single vendor.",
    links: [{ label: "View Skills", href: "/about" }],
  },
  {
    id: "deliverhealth",
    title: "DeliverHealth experience",
    keywords: [
      "deliverhealth",
      "deliver health",
      "dash",
      "dash 2.0",
      "healthcare",
      "hipaa",
      "hitrust",
      "slide narrator",
      "rfp chatbot",
    ],
    answer:
      "At DeliverHealth Solutions, Afnan worked as an Agentic AI Specialist on production-facing AI initiatives including DASH 2.0, workflow automation, Slide Narrator and RFP-oriented assistant capabilities. The work involved enterprise knowledge access, Azure OpenAI, APIs, SSO/security controls and healthcare-oriented governance considerations, with an emphasis on production usability and reliability.",
    links: [{ label: "Read Experience", href: "/about" }],
  },
  {
    id: "projects",
    title: "Projects",
    keywords: [
      "project",
      "projects",
      "portfolio",
      "built",
      "case study",
      "case studies",
      "work samples",
      "show work",
    ],
    answer:
      "The portfolio includes work across enterprise AI assistants, RAG and semantic search, multimodal document/slide intelligence, workflow automation, computer vision/OCR and ML platform engineering. For a recruiter, the Projects page is the fastest way to inspect the breadth of systems and the About page gives the role-by-role production context.",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Experience", href: "/about" },
    ],
  },
  {
    id: "security",
    title: "Security & enterprise AI",
    keywords: [
      "security",
      "secure",
      "sso",
      "oauth",
      "tenant",
      "audit",
      "hipaa",
      "gdpr",
      "governance",
      "permissions",
      "access control",
    ],
    answer:
      "Afnan's enterprise AI work includes security-aware patterns such as SSO/OAuth-style access, tenant isolation, permissions, auditability and governance considerations. In healthcare-oriented work, he has operated in environments where privacy and security reviews matter, so the design focus is not only model quality but also controlled access and traceability.",
    links: [{ label: "See Experience", href: "/about" }],
  },
  {
    id: "lockheed",
    title: "Lockheed Martin signal",
    keywords: [
      "lockheed",
      "lockheed martin",
      "offer",
      "defense",
      "global signal",
    ],
    answer:
      "The portfolio highlights that Afnan received an employment offer from Lockheed Martin through its hiring process. It is presented as a global opportunity signal—not as employment history—and the portfolio intentionally avoids overstating details that are not part of the supporting material.",
    links: [{ label: "See Global Signals", href: "/about" }],
  },
  {
    id: "bytedance",
    title: "ByteDance / TikTok signal",
    keywords: [
      "bytedance",
      "tiktok",
      "german market",
      "international recruitment",
      "kuala lumpur",
    ],
    answer:
      "Afnan was approached by international Talent Acquisition for a ByteDance/TikTok data-focused opportunity supporting the German market and advanced into role screening. The portfolio presents this accurately as international recruitment interest, not as a final offer or employment claim.",
    links: [{ label: "See Global Signals", href: "/about" }],
  },
  {
    id: "certifications",
    title: "Certifications",
    keywords: [
      "certification",
      "certifications",
      "certificate",
      "credentials",
      "courses",
      "learning",
    ],
    answer:
      "Afnan's portfolio highlights 50+ certifications and learning credentials spanning AI/ML, Generative AI, Agentic AI, LLMs, Data Science, MLOps, AWS, Azure, GCP, DevOps, NLP, Computer Vision, Analytics and Data Engineering.",
    links: [{ label: "View Profile", href: "/about" }],
  },
  {
    id: "availability",
    title: "Availability",
    keywords: [
      "available",
      "availability",
      "notice",
      "notice period",
      "joining",
      "join",
      "remote",
      "location",
      "hire",
      "hiring",
      "contact",
      "email",
    ],
    answer:
      "Afnan is positioned as an immediate, remote-first candidate for AI/ML opportunities. His target roles include Data Scientist, AI Engineer, ML Engineer, Agentic AI Engineer, LLM Engineer, Generative AI Engineer, Applied AI Engineer and related MLOps/AI roles. You can contact him directly by email or LinkedIn from this portfolio.",
    links: [
      { label: "Email Afnan", href: "mailto:afnankhan67445@gmail.com", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/afnan-khan4/", external: true },
    ],
  },
  {
    id: "resume",
    title: "Resume",
    keywords: ["resume", "cv", "download resume", "download cv"],
    answer:
      "You can open Afnan's current resume directly from the portfolio. For a quick recruiter scan, pair the resume with Recruiter View to map his evidence to the role you are hiring for.",
    links: [{ label: "Open Resume", href: "/afnans.pdf", external: true }],
  },
];

const NORMALIZE_REPLACEMENTS = [
  ["gen ai", "generative ai"],
  ["gen-ai", "generative ai"],
  ["machine-learning", "machine learning"],
  ["multi agent", "multi-agent"],
  ["large language model", "llm"],
  ["large language models", "llm"],
];

function normalizeQuery(value) {
  let normalized = value.toLowerCase().replace(/[^a-z0-9+#./ -]/g, " ");

  NORMALIZE_REPLACEMENTS.forEach(([from, to]) => {
    normalized = normalized.replaceAll(from, to);
  });

  return normalized.replace(/\s+/g, " ").trim();
}

function scoreKnowledge(entry, query) {
  const normalized = normalizeQuery(query);
  if (!normalized) return 0;

  const tokens = normalized.split(" ").filter((token) => token.length > 2);
  let score = 0;

  entry.keywords.forEach((keyword) => {
    const key = normalizeQuery(keyword);

    if (normalized === key) score += 14;
    else if (normalized.includes(key)) score += key.includes(" ") ? 9 : 5;

    const keyTokens = key.split(" ");
    const overlap = keyTokens.filter((token) => tokens.includes(token)).length;
    score += overlap * 2;
  });

  const searchable = normalizeQuery(`${entry.title} ${entry.answer}`);
  tokens.forEach((token) => {
    if (searchable.includes(token)) score += 0.55;
  });

  return score;
}

function findBestAnswer(query) {
  const ranked = KNOWLEDGE.map((entry) => ({
    entry,
    score: scoreKnowledge(entry, query),
  })).sort((a, b) => b.score - a.score);

  if (!ranked[0] || ranked[0].score < 2.8) {
    return {
      title: "Portfolio-grounded answers only",
      answer:
        "I couldn't map that question confidently to Afnan's verified portfolio profile. Try asking about his Agentic AI, RAG/LLM, Data Science, ML Engineering, cloud/MLOps, DeliverHealth experience, projects, availability or global opportunity signals.",
      links: [
        { label: "Explore Experience", href: "/about" },
        { label: "Browse Projects", href: "/projects" },
      ],
    };
  }

  return ranked[0].entry;
}

function ActionLinks({ links = [], onNavigate }) {
  if (!links.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map((link) => {
        const classes =
          "rounded-full border border-light/10 bg-light/[0.035] px-3 py-2 text-[8px] font-black uppercase tracking-[0.12em] text-light/65 transition hover:border-light/25 hover:bg-light hover:text-dark";

        if (link.external || link.href.startsWith("mailto:")) {
          return (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "noreferrer" : undefined}
              className={classes}
            >
              {link.label} ↗
            </a>
          );
        }

        return (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            onClick={onNavigate}
            className={classes}
          >
            {link.label} ↗
          </Link>
        );
      })}
    </div>
  );
}

export default function AskAfnan() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      title: "Ask Afnan",
      text: "I’m a portfolio-grounded assistant for recruiters and hiring managers. Ask me about Afnan’s experience, role fit, projects, AI/ML stack, cloud work or availability.",
      links: [],
    },
  ]);
  const reducedMotion = useReducedMotion();
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const promptChips = useMemo(() => QUICK_PROMPTS, []);

  useEffect(() => {
    const onShortcut = (event) => {
      const target = event.target;
      const typingTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (!typingTarget && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, typing, open, reducedMotion]);

  const ask = (rawQuestion) => {
    const question = rawQuestion.trim();
    if (!question || typing) return;

    const id = Date.now();
    setMessages((current) => [
      ...current,
      { id: `q-${id}`, role: "user", text: question },
    ]);
    setInput("");
    setTyping(true);

    const result = findBestAnswer(question);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `a-${id}`,
          role: "assistant",
          title: result.title,
          text: result.answer,
          links: result.links || [],
        },
      ]);
      setTyping(false);
    }, reducedMotion ? 80 : 420);
  };

  const submit = (event) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }}
        whileTap={{ scale: 0.97 }}
        className="group fixed bottom-5 right-5 z-[785] flex items-center gap-3 rounded-full border border-dark/15 bg-light/95 px-3.5 py-3 text-dark shadow-[0_18px_55px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-shadow hover:shadow-[0_24px_70px_rgba(0,0,0,0.2)] dark:border-light/15 dark:bg-dark/95 dark:text-light md:bottom-[84px] md:right-3 md:px-3 md:py-2.5"
        aria-label="Open Ask Afnan portfolio assistant"
        title="Ask Afnan — Shift + A"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-current/15 md:h-7 md:w-7">
          {!reducedMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-[5px] rounded-full border border-current/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          )}
          <span className="text-[10px] font-black">AI</span>
        </span>
        <span className="text-left md:hidden">
          <span className="block text-[7px] font-black uppercase tracking-[0.18em] opacity-40">Portfolio Assistant</span>
          <span className="mt-0.5 block text-[10px] font-black uppercase tracking-[0.12em]">Ask Afnan</span>
        </span>
        <span className="text-sm opacity-40 transition-transform duration-300 group-hover:translate-x-0.5 md:hidden">↗</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close Ask Afnan assistant"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[899] cursor-default bg-dark/25 backdrop-blur-[2px]"
            />

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Ask Afnan portfolio assistant"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-5 right-5 z-[900] flex h-[min(720px,calc(100vh-40px))] w-[min(460px,calc(100vw-40px))] flex-col overflow-hidden rounded-[2rem] border border-light/10 bg-[#0f0f0f] text-light shadow-[0_35px_100px_rgba(0,0,0,0.45)] md:bottom-3 md:right-3 md:h-[min(680px,calc(100vh-24px))] md:w-[calc(100vw-24px)] md:rounded-[1.5rem]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:38px_38px]" />

              <header className="relative z-10 flex items-center justify-between gap-4 border-b border-light/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-light/15 bg-light/[0.035]">
                    {!reducedMotion && (
                      <motion.span
                        className="absolute inset-1 rounded-full border border-dashed border-light/15"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <span className="text-[10px] font-black">AI</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-black tracking-[-0.02em]">Ask Afnan</h2>
                      <span className="flex items-center gap-1.5 rounded-full border border-light/10 px-2 py-1 text-[6px] font-black uppercase tracking-[0.14em] text-light/40">
                        <span className="h-1 w-1 rounded-full bg-light" />
                        Grounded
                      </span>
                    </div>
                    <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-light/30">
                      Recruiter portfolio assistant
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-light/10 text-lg text-light/60 transition hover:bg-light hover:text-dark"
                  aria-label="Close assistant"
                >
                  ×
                </button>
              </header>

              <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                    >
                      {message.role === "user" ? (
                        <div className="max-w-[82%] rounded-[1.3rem] rounded-br-[0.45rem] bg-light px-4 py-3 text-xs font-semibold leading-5 text-dark">
                          {message.text}
                        </div>
                      ) : (
                        <div className="max-w-[92%] rounded-[1.35rem] rounded-bl-[0.45rem] border border-light/10 bg-light/[0.035] px-4 py-4">
                          {message.title && (
                            <p className="mb-2 text-[9px] font-black uppercase tracking-[0.15em] text-light/38">
                              {message.title}
                            </p>
                          )}
                          <p className="text-xs leading-6 text-light/68">{message.text}</p>
                          <ActionLinks
                            links={message.links}
                            onNavigate={() => setOpen(false)}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-1.5 rounded-full border border-light/10 bg-light/[0.035] px-4 py-3">
                        {[0, 1, 2].map((index) => (
                          <motion.span
                            key={index}
                            className="h-1.5 w-1.5 rounded-full bg-light/50"
                            animate={reducedMotion ? undefined : { y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.12 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={endRef} />
                </div>
              </div>

              <div className="relative z-10 border-t border-light/10 bg-[#0f0f0f]/95 p-4 backdrop-blur-xl">
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {promptChips.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => ask(prompt)}
                      disabled={typing}
                      className="shrink-0 rounded-full border border-light/10 px-3 py-2 text-[7px] font-black uppercase tracking-[0.1em] text-light/42 transition hover:border-light/25 hover:text-light disabled:cursor-wait disabled:opacity-30"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <form onSubmit={submit} className="flex items-end gap-2 rounded-[1.3rem] border border-light/10 bg-light/[0.035] p-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        ask(input);
                      }
                    }}
                    rows={1}
                    maxLength={240}
                    placeholder="Ask about RAG, Agentic AI, cloud, projects..."
                    className="max-h-24 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-3 text-xs leading-5 text-light outline-none placeholder:text-light/25"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || typing}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light text-dark transition disabled:cursor-not-allowed disabled:opacity-20"
                    aria-label="Send question"
                  >
                    ↑
                  </motion.button>
                </form>

                <div className="mt-2 flex items-center justify-between gap-3 px-1">
                  <p className="text-[7px] leading-3 text-light/25">
                    Answers are limited to curated portfolio evidence to reduce unsupported claims.
                  </p>
                  <span className="shrink-0 text-[6px] font-black uppercase tracking-[0.12em] text-light/20 md:hidden">
                    Shift A
                  </span>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
