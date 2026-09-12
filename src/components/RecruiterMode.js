"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ROLE_PROFILES = {
  "AI Engineer": {
    headline: "Production AI systems from idea to deployment.",
    summary:
      "4+ years building applied AI systems across LLMs, RAG, agentic workflows, machine learning, APIs, cloud infrastructure and production deployment.",
    strengths: ["Agentic AI", "RAG", "FastAPI", "Azure OpenAI", "AWS / Azure / GCP", "MLOps"],
    evidence: [
      "Enterprise conversational AI and workflow automation at DeliverHealth.",
      "End-to-end APIs, cloud deployment, security controls and observability.",
      "Production work spanning LLM, ML, retrieval and automation systems.",
    ],
  },
  "Data Scientist": {
    headline: "From data to models to measurable decisions.",
    summary:
      "Hands-on work across machine learning, experimentation, NLP, computer vision, analytics, retrieval quality and model evaluation with a strong focus on business outcomes.",
    strengths: ["Machine Learning", "Statistics", "NLP", "Computer Vision", "Experimentation", "Model Evaluation"],
    evidence: [
      "Built ML and semantic-search systems around enterprise data and metadata.",
      "Worked with precision@k, MRR, hit-rate style retrieval evaluation and human review.",
      "Applied NLP, OCR and document intelligence to real product workflows.",
    ],
  },
  "ML Engineer": {
    headline: "Models and services built to survive production.",
    summary:
      "End-to-end ML engineering across inference, APIs, containers, Kubernetes, orchestration, monitoring, data pipelines and cloud-native deployment.",
    strengths: ["Python", "FastAPI", "Docker", "Kubernetes", "Airflow", "Monitoring"],
    evidence: [
      "Production APIs and services built with Python and FastAPI.",
      "Hands-on Docker, AKS/Kubernetes, Airflow, Kafka and cloud infrastructure.",
      "Monitoring and reliability work using metrics, logs and production observability.",
    ],
  },
  "Agentic AI Engineer": {
    headline: "AI systems that reason, act, use tools and recover.",
    summary:
      "Built agentic workflows using orchestration, function calling, retrieval, structured outputs, tool execution, guardrails and production observability.",
    strengths: ["LangChain", "LangGraph", "Tool Calling", "Multi-Agent Systems", "RAG", "Guardrails"],
    evidence: [
      "Designed enterprise assistants and agentic workflow automation.",
      "Worked with tool loops, structured outputs, state, routing and human review.",
      "Focused on reliability, permissions, observability and production behavior.",
    ],
  },
  "LLM Engineer": {
    headline: "Reliable LLM applications beyond prompting.",
    summary:
      "Experience with retrieval, embeddings, reranking, context engineering, structured outputs, evaluation, citations and enterprise LLM integrations.",
    strengths: ["LLMs", "Embeddings", "Vector Search", "Reranking", "Prompt Engineering", "Evaluation"],
    evidence: [
      "Built RAG systems with metadata filters, hybrid retrieval and reranking.",
      "Worked with enterprise knowledge assistants and citation-grounded outputs.",
      "Experience across Azure OpenAI, Gemini, Claude and open-source model workflows.",
    ],
  },
  "Generative AI Engineer": {
    headline: "Generative AI that ships as a real product capability.",
    summary:
      "Builds production GenAI experiences across enterprise assistants, RAG, multimodal document workflows, summarization, structured generation and evaluation.",
    strengths: ["Generative AI", "RAG", "Multimodal AI", "Prompt Systems", "Structured Outputs", "Evaluation"],
    evidence: [
      "Built enterprise GenAI assistants over secured knowledge.",
      "Worked on multimodal slide narration, OCR, tables and grounded summarization.",
      "Implemented reusable prompting, evaluation and review workflows.",
    ],
  },
  "Applied AI Engineer": {
    headline: "AI research translated into useful products.",
    summary:
      "Combines ML, LLMs, agents, cloud and product engineering to deliver systems that solve real operational problems and can be measured in production.",
    strengths: ["Applied ML", "Generative AI", "Agentic AI", "Cloud", "APIs", "Product Engineering"],
    evidence: [
      "Comfortable owning the path from problem framing to deployment.",
      "Combines model behavior, backend engineering and cloud operations.",
      "Optimizes for measurable user impact instead of demo-only AI.",
    ],
  },
  "MLOps Engineer": {
    headline: "Reliable AI delivery across pipelines, infra and observability.",
    summary:
      "Hands-on MLOps experience across orchestration, containers, Kubernetes, cloud services, streaming, deployment, monitoring and operational reliability.",
    strengths: ["Airflow", "Docker", "Kubernetes", "AKS", "Kafka", "Prometheus / Grafana"],
    evidence: [
      "Built and operated data and ML pipelines with Airflow and Python.",
      "Worked with containerized inference and Kubernetes-based deployments.",
      "Production monitoring experience across latency, health and system metrics.",
    ],
  },
};

const ROLE_ORDER = Object.keys(ROLE_PROFILES);

const PROOF_POINTS = [
  ["4+", "Years Experience"],
  ["56+", "Projects Completed"],
  ["50+", "Certifications"],
  ["3", "Cloud Platforms"],
];

const SIGNALS = [
  {
    label: "Production AI",
    title: "DeliverHealth — Agentic AI Specialist",
    text: "Enterprise assistants, workflow automation, RAG, narration and production integrations.",
  },
  {
    label: "Global Signal",
    title: "Lockheed Martin — Offer Received",
    text: "Selected through the hiring process for a senior AI/security-focused opportunity.",
  },
  {
    label: "International Recruitment",
    title: "ByteDance / TikTok",
    text: "Approached for an international data-focused opportunity supporting the German market.",
  },
];

export default function RecruiterMode() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("AI Engineer");
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const profile = useMemo(() => ROLE_PROFILES[role], [role]);

  useEffect(() => {
    const onShortcut = (event) => {
      const target = event.target;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (!typing && event.shiftKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("afnankhan67445@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      window.location.href = "mailto:afnankhan67445@gmail.com";
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 left-5 z-[780] flex items-center gap-3 rounded-full border border-dark/10 bg-light/90 px-4 py-3 text-dark shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-light/10 dark:bg-dark/90 dark:text-light md:bottom-4 md:left-4 md:px-3.5 md:py-2.5"
        aria-label="Open recruiter mode"
        title="Recruiter Mode — Shift + R"
      >
        <motion.span
          animate={reducedMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
        <span className="text-[9px] font-black uppercase tracking-[0.18em]">Recruiter Mode</span>
        <span className="hidden rounded-md border border-current/10 px-1.5 py-1 text-[7px] font-black uppercase tracking-[0.12em] opacity-35 xl:inline">Shift R</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] overflow-y-auto bg-dark/80 p-5 backdrop-blur-xl dark:bg-black/80 md:p-3"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Recruiter mode candidate overview"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto my-5 w-full max-w-[1220px] overflow-hidden rounded-[2rem] border border-light/10 bg-[#111] text-light shadow-[0_35px_100px_rgba(0,0,0,0.45)] md:my-2 md:rounded-[1.4rem]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="pointer-events-none absolute -right-[3%] top-[8%] text-[13vw] font-black leading-none tracking-[-0.09em] text-white/[0.018]">HIRE</div>

              <div className="relative z-10 p-8 lg:p-6 md:p-5">
                <div className="flex items-start justify-between gap-6 border-b border-light/10 pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-light/35">60-Second Candidate Brief</p>
                      <span className="flex items-center gap-2 rounded-full border border-light/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-light/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-light" />
                        Remote-first • Immediate
                      </span>
                    </div>
                    <h2 className="mt-3 text-[clamp(2.6rem,6vw,5.6rem)] font-black leading-[0.86] tracking-[-0.07em]">PATHAN AFNAN KHAN</h2>
                    <p className="mt-4 max-w-4xl text-sm leading-7 text-light/55">
                      AI/ML Engineer focused on production-grade intelligent systems across Data Science, Machine Learning, Agentic AI, LLMs, Generative AI and MLOps.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-light/15 text-xl transition hover:bg-light hover:text-dark"
                    aria-label="Close recruiter mode"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-light/35">Hiring for</p>
                      <p className="mt-1 text-xs text-light/35">Choose the closest role to instantly reframe the profile.</p>
                    </div>
                    <span className="hidden text-[8px] font-black uppercase tracking-[0.16em] text-light/25 md:hidden">Role-aware briefing</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {ROLE_ORDER.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setRole(item)}
                        className={`rounded-full border px-4 py-2 text-[10px] font-bold transition ${
                          item === role
                            ? "border-light bg-light text-dark"
                            : "border-light/12 text-light/55 hover:border-light/30 hover:text-light"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-[1.15fr_0.85fr] gap-5 lg:grid-cols-1">
                  <motion.div
                    key={role}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className="rounded-[1.7rem] border border-light/10 bg-light/[0.035] p-6 md:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-light/35">Role Fit Snapshot</span>
                      <span className="rounded-full border border-light/10 px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-light/45">{role}</span>
                    </div>

                    <h3 className="mt-5 text-[clamp(2rem,4vw,4rem)] font-black leading-[0.92] tracking-[-0.055em]">{profile.headline}</h3>
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-light/55">{profile.summary}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {profile.strengths.map((item) => (
                        <span key={item} className="rounded-full border border-light/10 bg-light/[0.025] px-3 py-2 text-[9px] font-semibold text-light/65">{item}</span>
                      ))}
                    </div>

                    <div className="mt-7 border-t border-light/[0.08] pt-5">
                      <p className="text-[8px] font-black uppercase tracking-[0.17em] text-light/30">Evidence mapped to this role</p>
                      <div className="mt-4 space-y-3">
                        {profile.evidence.map((item, index) => (
                          <div key={item} className="flex items-start gap-3 text-xs leading-6 text-light/55">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-light/65" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                    {PROOF_POINTS.map(([value, label]) => (
                      <motion.div
                        key={label}
                        whileHover={reducedMotion ? undefined : { y: -3 }}
                        className="relative overflow-hidden rounded-[1.4rem] border border-light/10 bg-light/[0.035] p-5"
                      >
                        <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full border border-dashed border-light/[0.06]" />
                        <div className="text-4xl font-black tracking-[-0.06em]">{value}</div>
                        <div className="mt-2 text-[8px] font-black uppercase tracking-[0.15em] text-light/35">{label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-1">
                  {SIGNALS.map((signal) => (
                    <motion.div
                      key={signal.title}
                      whileHover={reducedMotion ? undefined : { y: -3 }}
                      className="rounded-[1.4rem] border border-light/10 bg-light/[0.018] p-5"
                    >
                      <p className="text-[8px] font-black uppercase tracking-[0.17em] text-light/30">{signal.label}</p>
                      <p className="mt-2 text-sm font-bold">{signal.title}</p>
                      <p className="mt-2 text-xs leading-6 text-light/45">{signal.text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-4 rounded-[1.4rem] border border-light/10 bg-light/[0.025] p-5 lg:grid-cols-1">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.17em] text-light/30">Recruiter-ready availability</p>
                    <p className="mt-2 text-sm font-bold">Open to remote AI / ML opportunities</p>
                    <p className="mt-1 text-xs leading-6 text-light/45">Targeting Data Scientist, AI Engineer, ML Engineer, Agentic AI Engineer, LLM Engineer and closely related applied AI roles.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="rounded-full border border-light/15 px-4 py-2.5 text-[8px] font-black uppercase tracking-[0.14em] transition hover:bg-light hover:text-dark"
                    >
                      {copied ? "Email Copied ✓" : "Copy Email"}
                    </button>
                    <a
                      href="https://www.linkedin.com/in/afnan-khan4/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-light/15 px-4 py-2.5 text-[8px] font-black uppercase tracking-[0.14em] transition hover:bg-light hover:text-dark"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href="https://github.com/PathanAfnanKhan020319"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-light/15 px-4 py-2.5 text-[8px] font-black uppercase tracking-[0.14em] transition hover:bg-light hover:text-dark"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-light/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    <Link href="/about" onClick={() => setOpen(false)} className="rounded-full border border-light/15 px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition hover:bg-light hover:text-dark">Full Experience</Link>
                    <Link href="/projects" onClick={() => setOpen(false)} className="rounded-full border border-light/15 px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition hover:bg-light hover:text-dark">View Projects</Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a href="/afnans.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-light px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] text-dark transition hover:opacity-85">Resume ↗</a>
                    <a href="mailto:afnankhan67445@gmail.com" className="rounded-full border border-light/15 px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition hover:bg-light hover:text-dark">Contact</a>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
