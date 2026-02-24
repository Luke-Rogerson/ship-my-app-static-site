const boundaries = [
  'Not open-ended consulting: everything is triaged, scoped, and delivered as PRs.',
  'Fixed sprint scope: new features go into a follow-up sprint or retainer.',
  "If it's unsalvageable, you'll know quickly — with a minimal rebuild option.",
] as const

export function Boundaries() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 dark:bg-gray-900/50">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Boundaries
        </h2>
        <ul className="mt-6 space-y-4">
          {boundaries.map((text) => (
            <li
              key={text}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600 dark:bg-brand-500" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
