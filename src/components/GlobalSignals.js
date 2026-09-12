"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const SIGNALS = [
  {
    id: "01",
    company: "Lockheed Martin",
    eyebrow: "OFFER RECEIVED",
    role: "Senior AI Security Engineer",
    location: "United States",
    summary:
      "Received an employment offer from Lockheed Martin after progressing through the recruitment process for a senior AI and security-focused engineering opportunity.",
    decision:
      "I chose not to proceed because the role required an onsite, clearance-aligned working arrangement that did not match the remote-first setup I was targeting.",
    chips: ["AI Security", "Defense Technology", "High-Assurance Systems", "Offer Received"],
    brand: "lockheed",
  },
  {
    id: "02",
    company: "ByteDance / TikTok",
    eyebrow: "INTERNATIONAL RECRUITMENT",
    role: "Data Understanding Specialist — German Market",
    location: "Kuala Lumpur",
    summary:
      "Approached by ByteDance's international Talent Acquisition team and advanced into role screening for a global-scale data opportunity supporting the German market.",
    decision:
      "The position was fully onsite in Kuala Lumpur. I decided not to pursue relocation because my priority was a remote-first opportunity.",
    chips: ["ByteDance", "TikTok", "Global Data", "German Market"],
    brand: "tiktok",
  },
];

const CERTIFICATIONS = [
  "AI / ML",
  "Generative AI",
  "Agentic AI",
  "LLMs",
  "Data Science",
  "MLOps",
  "AWS",
  "Azure",
  "GCP",
  "DevOps",
  "NLP",
  "Computer Vision",
  "Analytics",
  "Data Engineering",
];

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function LockheedMark() {
  return (
    <svg
      viewBox="0 0 180 180"
      aria-hidden="true"
      className="h-[74%] w-[74%] overflow-visible"
      fill="none"
    >
      <motion.path
        d="M22 103C61 76 105 68 157 75"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />
      <motion.path
        d="M52 128C83 93 115 70 158 49"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.12 }}
      />
      <motion.path
        d="M131 37L136 57L158 62L138 70L139 92L127 74L107 81L120 64L107 47L128 55L131 37Z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
        animate={{ rotate: [0, 4, 0, -4, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "132px 64px" }}
      />
      <circle cx="35" cy="101" r="4.5" fill="currentColor" />
    </svg>
  );
}

function TikTokMark() {
  return (
    <svg
      viewBox="0 0 180 180"
      aria-hidden="true"
      className="h-[72%] w-[72%] overflow-visible"
      fill="none"
    >
      <motion.path
        d="M104 33V105.5C104 126.2 88.4 141 67.9 141C48.8 141 34 127.4 34 109.5C34 91.6 48.7 78 67.9 78C72 78 75.6 78.5 79.3 79.8V101C76.2 99.2 72.9 98.2 69.2 98.2C61.7 98.2 56.3 103 56.3 109.6C56.3 116.1 61.4 120.8 68.2 120.8C76.4 120.8 81.7 115.3 81.7 106.6V33H104Z"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d="M103 35C109.1 55.2 122.7 67.5 145.5 69.5V92.5C127.2 91.8 113.6 85.2 103 75.4"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.15 }}
      />
    </svg>
  );
}

function BrandOrb({ brand, company }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const move = (event) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 18);
    rotateX.set(y * -15);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative flex min-h-[260px] items-center justify-center md:min-h-[210px]">
      <motion.div
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute h-[210px] w-[210px] rounded-full border border-dashed border-dark/10 dark:border-light/10 md:h-[170px] md:w-[170px]"
      />

      <motion.div
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute h-[172px] w-[172px] rounded-full border border-dark/[0.06] dark:border-light/[0.07] md:h-[142px] md:w-[142px]"
      >
        <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-dark dark:bg-light" />
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={reset}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="relative flex h-[148px] w-[148px] items-center justify-center rounded-[2.2rem] border border-dark/10 bg-light/80 text-dark shadow-[0_30px_70px_rgba(0,0,0,0.10)] backdrop-blur-xl dark:border-light/10 dark:bg-dark/80 dark:text-light md:h-[124px] md:w-[124px]"
      >
        <div className="absolute inset-[9px] rounded-[1.8rem] border border-dark/[0.05] dark:border-light/[0.06]" />
        <div
          className="relative z-10 flex h-full w-full items-center justify-center"
          style={{ transform: "translateZ(32px)" }}
        >
          {brand === "lockheed" ? <LockheedMark /> : <TikTokMark />}
        </div>
        <motion.div
          animate={reducedMotion ? undefined : { opacity: [0.03, 0.09, 0.03] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_40%,currentColor,transparent_64%)]"
        />
      </motion.div>

      <span className="absolute bottom-3 text-center text-[8px] font-black uppercase tracking-[0.2em] text-dark/30 dark:text-light/30">
        {company}
      </span>
    </div>
  );
}

function SignalCard({ item, index }) {
  return (
    <motion.article
      custom={index * 0.08}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="relative overflow-hidden rounded-[2.4rem] border border-dark/[0.08] bg-light/60 shadow-[0_28px_90px_rgba(0,0,0,0.055)] dark:border-light/[0.09] dark:bg-dark/55 md:rounded-[1.8rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] dark:opacity-25" />

      <div className="pointer-events-none absolute right-5 top-1 text-[6rem] font-black leading-none tracking-[-0.1em] text-dark/[0.025] dark:text-light/[0.03] md:text-[4rem]">
        {item.id}
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8 p-8 xl:gap-5 md:block md:p-5">
        <div className="col-span-4 md:mb-8">
          <BrandOrb brand={item.brand} company={item.company} />
        </div>

        <div className="col-span-8 flex flex-col justify-center py-4 md:py-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-dark/10 bg-dark/[0.025] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] dark:border-light/10 dark:bg-light/[0.035]">
              {item.eyebrow}
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.18em] text-dark/30 dark:text-light/30">
              {item.location}
            </span>
          </div>

          <h3 className="mt-5 text-[clamp(2.2rem,4.6vw,5rem)] font-black leading-[0.88] tracking-[-0.065em]">
            {item.company}
          </h3>

          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-dark/45 dark:text-light/45">
            {item.role}
          </p>

          <p className="mt-6 max-w-3xl text-sm font-medium leading-[1.9] text-dark/58 dark:text-light/58 md:text-xs">
            {item.summary}
          </p>

          <div className="mt-6 rounded-[1.35rem] border border-dark/[0.07] bg-dark/[0.018] p-5 dark:border-light/[0.08] dark:bg-light/[0.025]">
            <p className="text-[7px] font-black uppercase tracking-[0.2em] text-dark/30 dark:text-light/30">
              DECISION CONTEXT
            </p>
            <p className="mt-2 text-xs font-medium leading-[1.8] text-dark/55 dark:text-light/55">
              {item.decision}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-dark/[0.07] px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.12em] text-dark/38 dark:border-light/[0.08] dark:text-light/38"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CertificationCloud() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={rise}
      custom={0.16}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative mt-8 overflow-hidden rounded-[2.4rem] border border-dark/[0.08] bg-light/55 p-8 dark:border-light/[0.09] dark:bg-dark/55 md:rounded-[1.8rem] md:p-5"
    >
      <div className="pointer-events-none absolute -right-8 -top-14 text-[10rem] font-black tracking-[-0.1em] text-dark/[0.02] dark:text-light/[0.025] md:text-[6rem]">
        50+
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8 md:block">
        <div className="col-span-5">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-dark/35 dark:text-light/35">
            CREDENTIAL INTELLIGENCE
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-[clamp(4.8rem,9vw,8.5rem)] font-black leading-[0.7] tracking-[-0.09em]">
              50+
            </span>
            <span className="pb-1 text-[9px] font-black uppercase tracking-[0.16em] text-dark/35 dark:text-light/35">
              PROFESSIONAL
              <br />
              CERTIFICATIONS
            </span>
          </div>

          <p className="mt-7 max-w-lg text-sm font-medium leading-[1.9] text-dark/55 dark:text-light/55 md:text-xs">
            Continuous upskilling across AI, machine learning, cloud, data engineering, analytics, DevOps, and production AI systems.
          </p>
        </div>

        <div className="col-span-7 flex items-center md:mt-8">
          <div className="flex flex-wrap gap-2.5">
            {CERTIFICATIONS.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.035, 0.42) }}
                animate={
                  reducedMotion
                    ? undefined
                    : index % 3 === 0
                    ? { y: [0, -2, 0] }
                    : undefined
                }
                className="rounded-full border border-dark/[0.08] bg-light/70 px-4 py-2 text-[8px] font-black uppercase tracking-[0.13em] text-dark/50 dark:border-light/[0.09] dark:bg-dark/70 dark:text-light/50"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const GlobalSignals = () => {
  return (
    <section
      id="global-signals"
      className="relative my-64 w-full md:my-32"
    >
      <motion.div
        variants={rise}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-dark/25 dark:bg-light/25" />
          <span className="text-[8px] font-black uppercase tracking-[0.22em] text-dark/35 dark:text-light/35">
            SELECTED GLOBAL OPPORTUNITIES / 2026
          </span>
        </div>

        <h2 className="mt-8 text-[clamp(4.5rem,10vw,10rem)] font-black leading-[0.75] tracking-[-0.09em]">
          GLOBAL
          <br />
          <span className="text-dark/18 dark:text-light/18">SIGNALS.</span>
        </h2>

        <div className="mt-9 grid grid-cols-12 gap-8 md:block">
          <p className="col-span-7 max-w-3xl text-sm font-medium leading-[1.9] text-dark/52 dark:text-light/52 md:text-xs">
            Recognition from teams operating at global scale — opportunities that validated my work across production AI, data systems, and security-focused engineering.
          </p>

          <div className="col-span-5 flex items-end justify-end md:mt-5 md:justify-start">
            <span className="text-[8px] font-black uppercase tracking-[0.18em] text-dark/28 dark:text-light/28">
              OPPORTUNITY ≠ FIT
              <br />
              TECHNICAL ALIGNMENT + WORK MODEL MATTER
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-14 space-y-8">
        {SIGNALS.map((item, index) => (
          <SignalCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <CertificationCloud />
    </section>
  );
};

export default GlobalSignals;
