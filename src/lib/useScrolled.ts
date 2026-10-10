'use client'

import { useSyncExternalStore } from 'react'

function subscribe(notify: () => void) {
  window.addEventListener('scroll', notify, { passive: true })
  return () => window.removeEventListener('scroll', notify)
}

/** True once the page has been scrolled past the given distance. */
export function useScrolled(threshold = 40): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
}
