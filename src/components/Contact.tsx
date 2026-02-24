import { Linkedin, Send } from "lucide-react";
import { CONTACT_LINKS } from "../config";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";

const directLinks = [
  {
    href: CONTACT_LINKS.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    light: "bg-[#0A66C2] hover:bg-[#004182]",
    dark: "dark:bg-[#0A66C2]/20 dark:text-[#4d9de0] dark:border dark:border-[#0A66C2]/40 dark:hover:bg-[#0A66C2]/30",
  },
  {
    href: CONTACT_LINKS.telegram,
    icon: Send,
    label: "Telegram",
    light: "bg-[#26A5E4] hover:bg-[#1e8cbf]",
    dark: "dark:bg-[#26A5E4]/20 dark:text-[#26A5E4] dark:border dark:border-[#26A5E4]/40 dark:hover:bg-[#26A5E4]/30",
  },
] as const;

export function Contact() {
  return (
    <Section id="contact" title="Get in touch" shaded>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Send your stack + where you're stuck + the #1 flow that must work.
        I'll reply with the fastest path to a 48h triage and a rough cost
        band.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Send a message
          </h3>
          <ContactForm />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Or reach out directly
          </h3>
          <div className="space-y-3">
            {directLinks.map(({ href, icon: Icon, label, light, dark }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-all ${light} ${dark}`}
              >
                <Icon size={20} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
