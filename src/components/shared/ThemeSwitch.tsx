'use client'

import { useSyncExternalStore } from 'react'

function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

/** Light/dark switch. The initial theme is set by an inline script in the layout, so there is no flash. */
export function ThemeSwitch() {
  const light = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === 'light',
    () => false,
  )

  const toggle = () => {
    const next = light ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('th', next)
    } catch {
      /* storage can be blocked; the choice just won't persist */
    }
  }

  return (
    <button type="button" className="thm" role="switch" aria-checked={light} aria-label="Light mode" onClick={toggle}>
      {light ? 'Dark mode' : 'Light mode'}
    </button>
  )
}
