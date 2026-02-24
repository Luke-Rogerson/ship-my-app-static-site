export function Blueprint() {
  return (
    <section id="blueprint" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Supported blueprint
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          To keep this fast and predictable, I standardize around a known-good blueprint.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-colors dark:cyber-border dark:bg-void-800 dark:hover:border-neon-cyan/40">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Blueprint A{' '}
              <span className="ml-2 font-mono text-sm font-normal text-brand-600 dark:text-neon-cyan dark:text-glow-cyan">
                (default, fastest)
              </span>
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-sm text-gray-600 dark:text-gray-400">
              <li>Next.js / React (TypeScript)</li>
              <li>Supabase (Auth + Postgres + Storage, RLS/policies)</li>
              <li>Stripe</li>
              <li>Vercel (or lightweight AWS hosting when needed)</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-colors dark:cyber-border dark:bg-void-800 dark:hover:border-neon-magenta/40">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Blueprint B{' '}
              <span className="ml-2 font-mono text-sm font-normal text-gray-500 dark:text-neon-magenta">
                (AWS-native / heavier backend)
              </span>
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-sm text-gray-600 dark:text-gray-400">
              <li>React / Next.js (TypeScript)</li>
              <li>Node.js API (Express/Fastify/NestJS)</li>
              <li>Postgres (RDS) or Supabase Postgres</li>
              <li>AWS (ECS/Lambda, S3, CloudWatch) with Terraform-lite or existing IaC</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          Outside these lanes? Triage confirms scope and the fastest path.
        </p>
      </div>
    </section>
  )
}
