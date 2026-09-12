"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const NUDGE_KEY = "afnan-recruiter-nudge-seen";

export default function RecruiterLauncher() {
  const reducedMotion = useReducedMotion();
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let showTimer;
    let hideTimer;

    try {
      const seen = window.sessionStorage.getItem(NUDGE_KEY);

      if (!seen) {
        showTimer = window.setTimeout(() => {
          setShowNudge(true);
          window.sessionStorage.setItem(NUDGE_KEY, "1");
        }, 1200);

        hideTimer = window.setTimeout(() => {
          setShowNudge(false);
        }, 6200);
      }
    } catch {
      showTimer = window.setTimeout(() => setShowNudge(true), 1200);
      hideTimer = window.setTimeout(() => setShowNudge(false), 6200);
    }

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const openRecruiterMode = () => {
    setShowNudge(false);

    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "r",
        code: "KeyR",
        shiftKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <>
      <style jsx global>{`
        button[aria-label="Open recruiter mode"] {
          display: none !important;
        }
      `}</style>

      <div className="pointer-events-none fixed right-6 top-[92px] z-[790] md:bottom-5 md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2">
        <AnimatePresence>
          {showNudge && (
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute right-0 top-[calc(100%+10px)] w-[250px] rounded-2xl border border-dark/10 bg-light/95 p-4 text-dark shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-light/10 dark:bg-dark/95 dark:text-light md:bottom-[calc(100%+10px)] md:left-1/2 md:right-auto md:top-auto md:w-[230px] md:-translate-x-1/2"
            >
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] opacity-40">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Hiring in AI / ML?
              </div>
              <p className="mt-2 text-sm font-black leading-5 tracking-[-0.02em]">
                See Afnan&apos;s fit in 60 seconds.
              </p>
              <p className="mt-1 text-[10px] leading-4 opacity-50">
                Pick your role and get a role-aware evidence snapshot.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative pointer-events-auto">
          {!reducedMotion && (
            <>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-dark/20 dark:border-light/20"
                animate={{ scale: [1, 1.26, 1.26], opacity: [0.45, 0, 0] }}
                transition={{ duration: 2.4, repeat: 2, repeatDelay: 1.1, ease: "easeOut" }}
              />
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-dark/10 dark:border-light/10"
                animate={{ scale: [1, 1.42, 1.42], opacity: [0.28, 0, 0] }}
                transition={{ duration: 2.4, repeat: 2, repeatDelay: 1.1, delay: 0.18, ease: "easeOut" }}
              />
            </>
          )}

          <motion.button
            type="button"
            onClick={openRecruiterMode}
            whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 rounded-full border border-dark/15 bg-dark px-4 py-3 text-light shadow-[0_18px_55px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] dark:border-light/20 dark:bg-light dark:text-dark md:px-4 md:py-3"
            aria-label="Open 60-second recruiter brief"
            title="Recruiter View — Shift + R"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-current/20">
              <motion.span
                animate={reducedMotion ? undefined : { scale: [0.75, 1, 0.75], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-current"
              />
            </span>

            <span className="text-left">
              <span className="block text-[7px] font-black uppercase tracking-[0.2em] opacity-45">
                Hiring AI / ML?
              </span>
              <span className="mt-0.5 block text-[10px] font-black uppercase tracking-[0.12em]">
                60s Recruiter View
              </span>
            </span>

            <span className="ml-1 text-sm transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
