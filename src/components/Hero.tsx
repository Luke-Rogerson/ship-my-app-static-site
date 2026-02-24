export function Hero() {
  return (
    <section id="offer" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
          Prototype → Production,{' '}
          <span className="text-brand-600 dark:text-brand-500">without the rewrite spiral</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
          If you have an AI-assisted / vibe-coded app that mostly works but isn't production-ready,
          I'll help you ship it fast, stabilize it, and put guardrails in place so it stays shippable.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get started
          </a>
          <a
            href="#packages"
            className="rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            See packages
          </a>
        </div>
      </div>
    </section>
  )
}
