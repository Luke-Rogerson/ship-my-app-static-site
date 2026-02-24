import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "./Section";

const faqs = [
  {
    q: "Can you work on partially deployed apps?",
    a: "Absolutely — that's the most common starting point. The triage assesses what's live, what's broken, and what needs fixing to get to a stable production state.",
  },
  {
    q: "What stacks do you work with?",
    a: [
      "JavaScript/TypeScript all the way through — React, Next.js, Node.js (Express, Fastify, NestJS).",
      "I'm very comfortable with the stacks that come out of AI-assisted and vibe-coded projects: Supabase, Vercel, Clerk, Prisma, Drizzle, tRPC, Tailwind.",
      "On the infrastructure side I work across AWS (ECS, Lambda, RDS, S3, CloudFront) and Vercel/Netlify.",
      "I've worked with all sorts of stacks in my career, so if your stack is close to this world, I can almost certainly help. If it's not, I'll tell you honestly on the triage call.",
    ],
  },
  {
    q: "How do payments work?",
    a: "Triage is paid upfront. Ship Sprints are fixed-price, paid 50% upfront and 50% on completion. Retainers are billed monthly. All invoices via Stripe.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Yes. I'm happy to sign a mutual NDA before you share repo access. Just mention it when you get in touch.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section title="Frequently asked questions">
      <dl className="mt-8 divide-y divide-gray-200 dark:divide-neon-cyan/10">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.q} className="py-4">
              <dt>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-400 transition-transform dark:text-neon-cyan/50 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </dt>
              {isOpen && (
                <dd className="mt-2 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {Array.isArray(faq.a) ? (
                    faq.a.map((p) => <p key={p}>{p}</p>)
                  ) : (
                    <p>{faq.a}</p>
                  )}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </Section>
  );
}
