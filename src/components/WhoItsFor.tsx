import { User, Rocket, Building2, Handshake } from 'lucide-react'

const audiences = [
  { icon: User, text: 'Founders (solo or small team) with a fragile MVP' },
  { icon: Rocket, text: 'Startups hardening a prototype before customers touch it' },
  { icon: Building2, text: 'SMBs relying on internal tools that are risky' },
  { icon: Handshake, text: 'Agencies/studios who want a productionization partner' },
] as const

export function WhoItsFor() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 dark:bg-void-900">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Who it's for
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {audiences.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-brand-600/50 dark:cyber-border dark:bg-void-800 dark:hover:border-neon-cyan/40"
            >
              <Icon size={20} className="mt-0.5 shrink-0 text-brand-600 dark:text-neon-cyan" />
              <span className="text-gray-700 dark:text-gray-300">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
