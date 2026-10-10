'use client'

import { useSyncExternalStore } from 'react'

const EVENT = 'funbi-storage'
/** Fallback for browsers that block localStorage: choices still work for the current visit. */
const memory = new Map<string, string>()

function subscribe(notify: () => void) {
  window.addEventListener('storage', notify)
  window.addEventListener(EVENT, notify)
  return () => {
    window.removeEventListener('storage', notify)
    window.removeEventListener(EVENT, notify)
  }
}

export function getStored(key: string): string | null {
  try {
    return localStorage.getItem(key) ?? memory.get(key) ?? null
  } catch {
    return memory.get(key) ?? null
  }
}

export function setStored(key: string, value: string) {
  memory.set(key, value)
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage can be blocked; the in-memory copy still works for this visit */
  }
  window.dispatchEvent(new Event(EVENT))
}

/** Reads a localStorage value without effects or hydration mismatches (null on the server). */
export function useStored(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => getStored(key),
    () => null,
  )
}
