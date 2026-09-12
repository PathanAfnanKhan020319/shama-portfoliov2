import React from "react";

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
          left-6
          bottom-6
          z-[785]
          pointer-events-none

          md:left-3
          md:bottom-[92px]
        "
      >
        <button
          type="button"
          onClick={openAskAfnan}
          aria-label="Open Ask Afnan AI assistant"
          title="Ask Afnan — AI Portfolio Assistant"
          className="
            group
            relative
            pointer-events-auto
            flex
            min-w-[220px]
            items-center
            gap-3
            overflow-hidden
            rounded-[1.35rem]
            border
            border-dark/10
            bg-light/90
            px-3
            py-3
            text-left
            text-dark
            shadow-[0_18px_55px_rgba(0,0,0,0.14)]
            backdrop-blur-xl
            transition-all
            duration-300

            hover:-translate-y-1
            hover:border-dark/20
            hover:shadow-[0_24px_70px_rgba(0,0,0,0.2)]

            active:translate-y-0
            active:scale-[0.98]

            dark:border-light/10
            dark:bg-[#111]/90
            dark:text-light
            dark:hover:border-light/20

            md:min-w-0
            md:w-[58px]
            md:h-[58px]
            md:rounded-[1.15rem]
            md:p-2
            md:justify-center
          "
        >
          {/* subtle portfolio grid */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.045]
              bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
              bg-[size:22px_22px]
            "
          />

          {/* soft spotlight */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-8
              -top-10
              h-28
              w-28
              rounded-full
              bg-dark/[0.05]
              blur-2xl
              dark:bg-light/[0.06]
            "
          />

          {/* AI core */}
          <span
            className="
              relative
              z-10
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-[1rem]
              bg-dark
              text-light
              shadow-[0_8px_24px_rgba(0,0,0,0.18)]

              dark:bg-light
              dark:text-dark

              md:h-10
              md:w-10
              md:rounded-[0.9rem]
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-[7px]
                rounded-full
                border
                border-current/20
                animate-spin
                [animation-duration:8s]
              "
            >
              <span className="absolute -right-[2px] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-current" />
            </span>

            <span className="relative text-[9px] font-black tracking-[-0.02em]">
              AI
            </span>
          </span>

          {/* label */}
          <span className="relative z-10 min-w-0 flex-1 md:hidden">
            <span className="flex items-center gap-2 text-[7px] font-black uppercase tracking-[0.2em] opacity-40">
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              Portfolio AI
            </span>

            <span className="mt-1 block text-[13px] font-black leading-none tracking-[-0.025em]">
              Ask Afnan
            </span>

            <span className="mt-1.5 block text-[8px] font-semibold uppercase tracking-[0.1em] opacity-35">
              Explore my experience
            </span>
          </span>

          {/* directional cue */}
          <span
            className="
              relative
              z-10
              ml-1
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-current/10
              text-sm
              opacity-45
              transition-all
              duration-300

              group-hover:translate-x-0.5
              group-hover:border-current/20
              group-hover:opacity-80

              md:hidden
            "
          >
            ↗
          </span>

          {/* bottom accent line */}
          <span
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-5
              right-5
              h-px
              origin-left
              scale-x-0
              bg-current/30
              transition-transform
              duration-500
              group-hover:scale-x-100

              md:hidden
            "
          />
        </button>
      </div>
    </>
  );
};

export default HireMe;
