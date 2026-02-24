import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

function getSnapshot(): boolean {
  return document.documentElement.classList.contains('dark')
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

export function useDarkMode() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot)

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
  }, [])

  return { isDark, toggle } as const
}
