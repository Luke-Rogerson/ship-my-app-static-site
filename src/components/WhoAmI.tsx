import { Section } from "./Section"

export function WhoAmI() {
  return (
    <Section id="about" title="Who am I">
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
    </Section>
  )
}
