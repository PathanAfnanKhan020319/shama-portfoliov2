import React from "react";
import { CustomSVG } from "./Icon";

const HireMe = () => {
  const openAskAfnan = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "a",
        code: "KeyA",
        shiftKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <>
      <style jsx global>{`
        button[aria-label="Open Ask Afnan portfolio assistant"] {
          display: none !important;
        }
      `}</style>

      <div
        className="
          fixed
          left-4
          bottom-4
          z-[785]

          flex
          items-center
          justify-center

          md:right-8
          md:left-auto
          md:top-0
          md:bottom-auto
          md:absolute

          sm:right-0

          pointer-events-none
        "
      >
        <div
          className="
            relative
            w-48
            h-auto

            flex
            items-center
            justify-center

            md:w-24

            pointer-events-none
          "
        >
          <CustomSVG
            className="
              fill-dark
              animate-spin-slow
              dark:fill-light
              opacity-70

              pointer-events-none
            "
          />

          <button
            type="button"
            onClick={openAskAfnan}
            aria-label="Open Ask Afnan AI assistant"
            title="Ask Afnan — AI Portfolio Assistant"
            className="
              group
              absolute
              left-1/2
              top-1/2

              -translate-x-1/2
              -translate-y-1/2

              flex
              flex-col
              items-center
              justify-center

              w-20
              h-20

              rounded-full

              bg-dark
              text-light

              shadow-[0_14px_40px_rgba(0,0,0,0.22)]

              border
              border-solid
              border-dark

              hover:bg-light
              hover:text-dark

              dark:bg-light
              dark:text-dark

              hover:dark:bg-dark
              hover:dark:text-light
              hover:dark:border-light

              md:w-14
              md:h-14

              pointer-events-auto
              cursor-pointer

              transition-all
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            <span className="relative mb-1 flex h-6 w-6 items-center justify-center rounded-full border border-current/25 md:h-5 md:w-5">
              <span className="absolute inset-[4px] rounded-full border border-current/20 animate-pulse" />
              <span className="text-[8px] font-black md:text-[7px]">AI</span>
            </span>

            <span className="text-[9px] font-black uppercase tracking-[0.08em] md:text-[7px]">
              Ask Afnan
            </span>

            <span className="mt-0.5 text-[6px] font-semibold uppercase tracking-[0.12em] opacity-45 md:hidden">
              Portfolio AI
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HireMe;
