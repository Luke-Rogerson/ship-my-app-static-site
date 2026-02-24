import { BRAND_NAME } from "../config";

export function Hero() {
  return (
    <section
      id="offer"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid-bg dark:opacity-100 opacity-0" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-sm tracking-widest text-brand-600 uppercase dark:text-neon-cyan dark:text-glow-cyan">
          {BRAND_NAME}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
          Prototype → Production,{" "}
          <span className="bg-linear-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
            without the rewrite spiral
          </span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
          If you have an app that mostly works but isn’t production-ready
          (whether it was AI-assisted, vibe-coded, or traditionally built) I’ll
          take it from demo-ready to production-ready fast: stabilize it, lock
          down the basics, and add guardrails to keep it healthy after launch.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-md bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-brand-700 dark:bg-neon-cyan dark:text-void-950 dark:hover:glow-cyan-strong dark:hover:bg-neon-cyan/90"
          >
            Get started
          </a>
          <a
            href="#packages"
            className="rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-neon-cyan/30 dark:text-neon-cyan dark:hover:bg-neon-cyan/10"
          >
            See packages
          </a>
        </div>
      </div>
    </section>
  );
}
