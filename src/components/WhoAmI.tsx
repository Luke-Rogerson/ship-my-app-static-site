export function WhoAmI() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Who am I
        </h2>
        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <img
            src="/luke.jpeg"
            alt="Luke"
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-brand-600/30 ring-offset-2 ring-offset-white dark:ring-neon-cyan/40 dark:ring-offset-void-950"
          />
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            I'm Luke, a full-stack software engineer with 10+ years of experience
            shipping and operating web apps. I'm obsessive about the boring
            production stuff&nbsp;— auth edge cases, migrations, env/secrets,
            observability, and making sure there's a runbook when something breaks.
          </p>
        </div>
      </div>
    </section>
  )
}
