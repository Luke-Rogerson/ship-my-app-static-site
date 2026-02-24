import { BRAND_NAME } from "../config";

export function Hero() {
  return (
    <section
      id="offer"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-30 dark:opacity-100" />
      <div className="relative mx-auto max-w-4xl">
        <div className="border-l-2 border-brand-600/40 pl-6 sm:pl-8 dark:border-neon-cyan/30">
          <p className="mb-4 font-mono text-sm tracking-widest text-brand-600 uppercase dark:text-neon-cyan dark:text-glow-cyan">
            {BRAND_NAME}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
            Prototype → Production,
            <br />
            <span className="bg-linear-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
              without the rewrite spiral
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
            Vibe-coded an app that's almost there? I'll bring the engineering
            experience to get it over the line: stable, secure, and ready for
            real users. Need something built from scratch? I do that too.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex justify-center rounded-md bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-brand-700 dark:bg-neon-cyan dark:text-void-950 dark:hover:glow-cyan-strong dark:hover:bg-neon-cyan/90"
            >
              Let's talk
            </a>
            <a
              href="#packages"
              className="inline-flex justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-neon-cyan/30 dark:text-neon-cyan dark:hover:bg-neon-cyan/10"
            >
              See packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
