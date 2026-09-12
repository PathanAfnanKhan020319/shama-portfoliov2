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
  },
  "Data Scientist": {
    headline: "From messy data to measurable decisions.",
    summary:
      "Hands-on experience across machine learning, experimentation, NLP, computer vision, analytics and model evaluation with a strong focus on business impact.",
    strengths: ["Machine Learning", "Statistics", "NLP", "Computer Vision", "Experimentation", "Model Evaluation"],
  },
  "ML Engineer": {
    headline: "Models that survive production.",
    summary:
      "End-to-end ML engineering across training, inference, APIs, containers, Kubernetes, observability, pipelines and cloud-native deployment.",
    strengths: ["Python", "FastAPI", "Docker", "Kubernetes", "Airflow", "Monitoring"],
  },
  "Agentic AI Engineer": {
    headline: "AI systems that reason, act and use tools.",
    summary:
      "Built agentic workflows using orchestration, function calling, retrieval, structured outputs, tool execution, guardrails and production observability.",
    strengths: ["LangChain", "LangGraph", "Tool Calling", "Multi-Agent Systems", "RAG", "Guardrails"],
  },
  "LLM Engineer": {
    headline: "Reliable LLM applications beyond prompting.",
    summary:
      "Experience with retrieval, embeddings, reranking, context engineering, structured outputs, evaluation and enterprise LLM integrations.",
    strengths: ["LLMs", "Embeddings", "Vector Search", "Reranking", "Prompt Engineering", "Evaluation"],
  },
  "Applied AI Engineer": {
    headline: "AI research translated into useful products.",
    summary:
      "Combines ML, LLMs, agents, cloud and product engineering to deliver systems that solve real operational problems and can be measured in production.",
    strengths: ["Applied ML", "Generative AI", "Agentic AI", "Cloud", "APIs", "Product Engineering"],
  },
};

const ROLE_ORDER = Object.keys(ROLE_PROFILES);

const PROOF_POINTS = [
  ["4+", "Years Experience"],
  ["56+", "Projects Completed"],
  ["50+", "Certifications"],
  ["3", "Cloud Platforms"],
];

export default function RecruiterMode() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("AI Engineer");
  const reducedMotion = useReducedMotion();
  const profile = useMemo(() => ROLE_PROFILES[role], [role]);

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

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 left-5 z-[780] flex items-center gap-3 rounded-full border border-dark/10 bg-light/90 px-4 py-3 text-dark shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-light/10 dark:bg-dark/90 dark:text-light md:bottom-4 md:left-4 md:px-3.5 md:py-2.5"
        aria-label="Open recruiter mode"
      >
        <motion.span
          animate={reducedMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
        <span className="text-[9px] font-black uppercase tracking-[0.18em]">Recruiter Mode</span>
        <span className="text-xs opacity-35">↗</span>
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
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto my-5 w-full max-w-[1180px] overflow-hidden rounded-[2rem] border border-light/10 bg-[#111] text-light shadow-[0_35px_100px_rgba(0,0,0,0.45)] md:my-2 md:rounded-[1.4rem]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="pointer-events-none absolute -right-[5%] top-[8%] text-[13vw] font-black leading-none tracking-[-0.09em] text-white/[0.018]">HIRE</div>

              <div className="relative z-10 p-8 lg:p-6 md:p-5">
                <div className="flex items-start justify-between gap-6 border-b border-light/10 pb-6">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-light/35">60-Second Candidate Brief</p>
                    <h2 className="mt-3 text-[clamp(2.6rem,6vw,5.6rem)] font-black leading-[0.86] tracking-[-0.07em]">
                      PATHAN AFNAN KHAN
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-light/55">
                      AI/ML Engineer focused on production-grade intelligent systems, with depth across data science, machine learning, LLMs and agentic AI.
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
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-light/35">Hiring for</p>
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
                    className="rounded-[1.6rem] border border-light/10 bg-light/[0.035] p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-light/35">Role Match</span>
                      <span className="rounded-full border border-light/10 px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-light/45">{role}</span>
                    </div>
                    <h3 className="mt-5 text-[clamp(2rem,4vw,4rem)] font-black leading-[0.92] tracking-[-0.055em]">{profile.headline}</h3>
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-light/55">{profile.summary}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {profile.strengths.map((item) => (
                        <span key={item} className="rounded-full border border-light/10 bg-light/[0.025] px-3 py-2 text-[9px] font-semibold text-light/65">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                    {PROOF_POINTS.map(([value, label]) => (
                      <div key={label} className="rounded-[1.4rem] border border-light/10 bg-light/[0.035] p-5">
                        <div className="text-4xl font-black tracking-[-0.06em]">{value}</div>
                        <div className="mt-2 text-[8px] font-black uppercase tracking-[0.15em] text-light/35">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-1">
                  <div className="rounded-[1.4rem] border border-light/10 p-5">
                    <p className="text-[8px] font-black uppercase tracking-[0.17em] text-light/30">Recent Production Work</p>
                    <p className="mt-2 text-sm font-bold">DeliverHealth — Agentic AI Specialist</p>
                    <p className="mt-2 text-xs leading-6 text-light/45">Enterprise AI assistants, workflow automation, RAG, narration and production integrations.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-light/10 p-5">
                    <p className="text-[8px] font-black uppercase tracking-[0.17em] text-light/30">Global Signal</p>
                    <p className="mt-2 text-sm font-bold">Lockheed Martin — Offer Received</p>
                    <p className="mt-2 text-xs leading-6 text-light/45">Selected through the hiring process for a senior AI/security-focused opportunity.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-light/10 p-5">
                    <p className="text-[8px] font-black uppercase tracking-[0.17em] text-light/30">International Recruitment</p>
                    <p className="mt-2 text-sm font-bold">ByteDance / TikTok</p>
                    <p className="mt-2 text-xs leading-6 text-light/45">Approached for an international data-focused opportunity supporting the German market.</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-light/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    <Link href="/about" onClick={() => setOpen(false)} className="rounded-full border border-light/15 px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition hover:bg-light hover:text-dark">
                      Full Experience
                    </Link>
                    <Link href="/projects" onClick={() => setOpen(false)} className="rounded-full border border-light/15 px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition hover:bg-light hover:text-dark">
                      View Projects
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a href="/afnans.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-light px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] text-dark transition hover:opacity-85">
                      Resume ↗
                    </a>
                    <a href="mailto:afnankhan67445@gmail.com" className="rounded-full border border-light/15 px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition hover:bg-light hover:text-dark">
                      Contact
                    </a>
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
