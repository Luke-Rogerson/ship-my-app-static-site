import { BRAND_NAME, CONTACT_LINKS } from '../config'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-8 sm:px-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row dark:text-gray-500">
        <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        <nav className="flex gap-4" aria-label="Footer links">
          <a
            href={CONTACT_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-900 dark:hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-900 dark:hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href={CONTACT_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-900 dark:hover:text-white"
          >
            Telegram
          </a>
        </nav>
      </div>
    </footer>
  )
}
