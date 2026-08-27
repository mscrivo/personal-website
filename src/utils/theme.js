import { useSyncExternalStore } from 'react'

const THEME_KEY = 'mscrivo-theme'

// The pre-paint script in index.html applies the stored theme before React
// loads, so the initial snapshot just reads what is already on <html>.
let theme =
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'

const listeners = new Set()

const subscribeTheme = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getTheme = () => theme

const applyTheme = (next) => {
  if (next === theme) return
  theme = next
  document.documentElement.classList.toggle('dark', next === 'dark')
  listeners.forEach((listener) => listener())
}

// Explicit visitor choice: applies and persists, taking precedence over the
// operating system's color scheme from then on.
export const setTheme = (next) => {
  applyTheme(next)
  try {
    localStorage.setItem(THEME_KEY, next)
  } catch {
    // Storage unavailable (private mode) — theme still applies for the session.
  }
}

// Follow the operating system's color scheme while the visitor has not made
// an explicit choice (toggling stores one, which then takes precedence).
if (typeof window !== 'undefined' && 'matchMedia' in window) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', (event) => {
    let stored = null
    try {
      stored = localStorage.getItem(THEME_KEY)
    } catch {
      // Storage unavailable (private mode) — keep following the OS.
    }
    if (stored !== 'dark' && stored !== 'light') {
      applyTheme(event.matches ? 'dark' : 'light')
    }
  })
}

export const useTheme = () => useSyncExternalStore(subscribeTheme, getTheme)
