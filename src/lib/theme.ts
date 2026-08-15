export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

export function getPreferredTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getInitialTheme(): Theme {
  return getStoredTheme() ?? getPreferredTheme()
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function getCurrentTheme(): Theme {
  return (document.documentElement.getAttribute('data-theme') as Theme | null) || 'light'
}

export function toggleTheme(): Theme {
  const next: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  localStorage.setItem(STORAGE_KEY, next)
  return next
}
