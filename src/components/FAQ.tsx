import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What stacks do you support?',
    a: 'I specialize in Next.js/React + Supabase + Vercel (Blueprint A) and AWS-native Node.js stacks (Blueprint B). Outside these? The triage call will confirm whether I can help and the fastest path forward.',
  },
  {
    q: 'Do you sign an NDA?',
    a: "Yes. I'm happy to sign a mutual NDA before you share repo access. Just mention it when you get in touch.",
  },
  {
    q: 'Can you work on partially deployed apps?',
    a: "Absolutely \u2014 that's the most common starting point. The triage assesses what's live, what's broken, and what needs fixing to get to a stable production state.",
  },
  {
    q: "What if we're outside the blueprint?",
    a: "The triage will confirm scope and feasibility. If the stack is close enough, I can adapt. If it's too far off, I'll tell you honestly and suggest alternatives.",
  },
  {
    q: 'How do payments work?',
    a: 'Triage is paid upfront. Ship Sprints are fixed-price, paid 50% upfront and 50% on completion. Retainers are billed monthly. All invoices via Stripe.',
  },
] as const

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Frequently asked questions
        </h2>
        <dl className="mt-8 divide-y divide-gray-200 dark:divide-neon-cyan/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q} className="py-4">
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gray-400 transition-transform dark:text-neon-cyan/50 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </dt>
                {isOpen && (
                  <dd className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </dd>
                )}
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
