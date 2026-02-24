import { useState } from 'react'
import { Menu, X, Sun, Moon, Linkedin, MessageCircle, Send } from 'lucide-react'
import { BRAND_NAME, NAV_ITEMS, CONTACT_LINKS } from '../config'
import { useDarkMode } from '../hooks/useDarkMode'

const socialLinks = [
  { href: CONTACT_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: CONTACT_LINKS.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
  { href: CONTACT_LINKS.telegram, icon: Send, label: 'Telegram' },
] as const

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggle } = useDarkMode()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-neon-cyan/10 dark:bg-void-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="font-mono text-lg font-bold tracking-tight text-gray-900 dark:text-neon-cyan dark:text-glow-cyan">
          {'>'} {BRAND_NAME}
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-neon-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-neon-cyan/10 dark:hover:text-neon-cyan"
            >
              <Icon size={18} />
            </a>
          ))}

          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-neon-cyan/10 dark:hover:text-neon-cyan"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            className="ml-2 rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-brand-600 hover:text-white dark:text-neon-cyan dark:hover:bg-neon-cyan/20 dark:hover:glow-cyan"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-md p-2 text-gray-500 dark:text-gray-400"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-md p-2 text-gray-500 dark:text-neon-cyan"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-neon-cyan/10 dark:bg-void-950" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-400 dark:hover:text-neon-cyan"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-neon-cyan/10 dark:hover:text-neon-cyan"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-center text-sm font-semibold text-gray-900 dark:text-neon-cyan"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
