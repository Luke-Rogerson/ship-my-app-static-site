import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS } from "../config";
import { useDarkMode } from "../hooks/useDarkMode";
import { BrandLogo } from "./BrandLogo";

function ThemeToggle({
  isDark,
  toggle,
  className,
}: {
  isDark: boolean;
  toggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`rounded-md p-2 text-gray-500 ${className ?? ""}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function ContactNav({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="#contact"
      onClick={onClick}
      className={`rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-neon-cyan ${className ?? ""}`}
    >
      Contact
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-neon-cyan/10 dark:bg-void-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#"
          className="font-mono text-lg font-bold tracking-tight text-gray-900 dark:text-neon-cyan dark:text-glow-cyan"
        >
          <BrandLogo />
        </a>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
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
          <ThemeToggle
            isDark={isDark}
            toggle={toggle}
            className="transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-neon-cyan/10 dark:hover:text-neon-cyan"
          />
          <ContactNav className="ml-2 transition-all hover:bg-brand-600 hover:text-white dark:hover:bg-neon-cyan/20 dark:hover:glow-cyan" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle isDark={isDark} toggle={toggle} className="dark:text-gray-400" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-gray-500 dark:text-neon-cyan"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-neon-cyan/10 dark:bg-void-950"
          aria-label="Mobile navigation"
        >
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
          <ContactNav className="mt-3 block text-center" onClick={() => setMenuOpen(false)} />
        </nav>
      )}
    </header>
  );
}
