import { Search, Zap, ShieldCheck } from "lucide-react";

const packages = [
  {
    icon: Search,
    name: "Codebase Triage",
    timeline: "48 hours",
    description: [
      "Production Readiness Score (Security, Data, Deploy, Reliability, Maintainability)",
      "Prioritized fix plan (Top 10 issues + why they matter)",
      "Salvage vs rebuild recommendation",
      "Locked Ship Sprint scope + acceptance criteria + timeline",
    ],
    price: "Typical: £750–£2,000 (depends on repo + infra complexity)",
    featured: false,
    accent: "neon-cyan" as const,
  },
  {
    icon: Zap,
    name: "Ship Sprint",
    timeline: "1-2 weeks, fixed scope",
    description: [
      "Auth sanity: roles/permissions, protected routes, access control checks",
      "Data integrity: schema cleanup, migrations, basic constraints",
      "Error handling: consistent API errors, boundaries, retries where appropriate",
      "Observability: structured logs, basic metrics, runtime checks",
      "Quality gates: lint/typecheck, minimal tests for critical paths, CI",
      "Deploy: reproducible env config, secrets hygiene, staging/prod separation",
      "Runbook: deploy/rollback/debug in plain English",
    ],
    acceptance: [
      "Deploy from clean clone with documented env vars",
      "No secrets in repo; safe secret management",
      "Core user flows pass (login + main flow + payments if applicable)",
      "Baseline monitoring/logging in place",
      "Minimal automated coverage for critical flows",
    ],
    price: "Typical: £6,000–£18,000 (fixed after triage)",
    featured: true,
    accent: "neon-magenta" as const,
    goal: "A stable production deploy plus guardrails so it stays stable.",
  },
  {
    icon: ShieldCheck,
    name: "Keep-It-Alive Retainer",
    timeline: "Monthly, capped",
    description: [
      "Bug fixes + small enhancements",
      "New feature development",
      "Dependency/security updates",
      "Performance tidy-ups",
      "Monitoring review + incident support",
      "Backlog/tech debt hygiene",
    ],
    price: "Typical: £750–£5,000/mo (SLA + hours cap)",
    featured: false,
    accent: "neon-purple" as const,
  },
] as const;

const accentMap = {
  "neon-cyan": {
    border: "dark:border-neon-cyan/30",
    borderHover: "dark:hover:border-neon-cyan/60",
    icon: "dark:text-neon-cyan",
    dot: "dark:bg-neon-cyan",
    glow: "dark:glow-cyan",
  },
  "neon-magenta": {
    border: "dark:border-neon-magenta/30",
    borderHover: "dark:hover:border-neon-magenta/60",
    icon: "dark:text-neon-magenta",
    dot: "dark:bg-neon-magenta",
    glow: "dark:glow-magenta",
  },
  "neon-purple": {
    border: "dark:border-neon-purple/30",
    borderHover: "dark:hover:border-neon-purple/60",
    icon: "dark:text-neon-purple",
    dot: "dark:bg-neon-purple",
    glow: "",
  },
} as const;

export function Packages() {
  return (
    <section
      id="packages"
      className="bg-gray-50 px-4 py-16 sm:px-6 dark:bg-void-900"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Packages
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const a = accentMap[pkg.accent];
            return (
              <div
                key={pkg.name}
                className={`flex flex-col rounded-xl border p-6 transition-colors ${
                  pkg.featured
                    ? `border-brand-600 bg-white shadow-lg dark:bg-void-800 ${a.border} ${a.borderHover} ${a.glow}`
                    : `border-gray-200 bg-white dark:bg-void-800 ${a.border} ${a.borderHover}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={22} className={`text-brand-600 ${a.icon}`} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>
                </div>
                <p className="mt-1 font-mono text-sm text-gray-500 dark:text-gray-500">
                  {pkg.timeline}
                </p>

                {"goal" in pkg && pkg.goal && (
                  <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {pkg.goal}
                  </p>
                )}

                <ul className="mt-4 flex-1 space-y-2">
                  {pkg.description.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600 ${a.dot}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t border-gray-100 pt-4 font-mono text-sm font-medium text-gray-800 dark:border-gray-800 dark:text-gray-200">
                  {pkg.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
