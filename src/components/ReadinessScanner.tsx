import { Terminal } from 'lucide-react'

export function ReadinessScanner() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
          <Terminal size={28} className="mx-auto text-brand-600 dark:text-brand-500" />
          <span className="mt-3 inline-block rounded-full bg-brand-600/10 px-3 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-500">
            Coming soon
          </span>
          <h2 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">Readiness Scanner</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            I'm building a readiness scanner CLI to make these audits faster and more standardized.
          </p>
        </div>
      </div>
    </section>
  )
}
