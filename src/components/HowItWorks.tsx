import { Section } from "./Section"

const steps = [
  {
    number: '1',
    title: 'Share repo + hosting context',
    description: 'Give me access to your codebase and current infrastructure.',
  },
  {
    number: '2',
    title: 'Triage → report + fixed sprint quote',
    description: 'I audit the repo and deliver a production readiness report with a fixed quote.',
  },
  {
    number: '3',
    title: 'Ship Sprint → PRs + staging previews + daily updates',
    description: 'PR-based work with staging previews and daily progress updates.',
  },
  {
    number: '4',
    title: 'Launch → production deploy + runbook + handover',
    description: 'Production deploy, runbook, handover — or roll into a retainer.',
  },
] as const

export function HowItWorks() {
  return (
    <Section id="how-it-works" title="How it works">
      <div className="mt-10 space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
        {steps.map((step, i) => (
          <div key={step.number} className="relative flex gap-4 md:flex-col md:gap-0">
            {i < steps.length - 1 && (
              <div className="absolute left-5 top-10 z-0 h-full w-px bg-gray-200 md:left-10 md:right-0 md:top-5 md:h-px md:w-auto dark:bg-neon-cyan/20" />
            )}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-600 font-mono text-sm font-bold text-white dark:bg-[#063947] dark:text-neon-cyan dark:cyber-border-bright">
              {step.number}
            </div>
            <div className="md:mt-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
