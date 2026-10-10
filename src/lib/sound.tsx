'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type SoundState = { on: boolean; toggle: () => void }

const SoundContext = createContext<SoundState>({ on: false, toggle: () => {} })

export const useSound = () => useContext(SoundContext)

/**
 * One switch for all sound: soft background music, plus the reel's voiceover.
 * Sound is off until the visitor turns it on, because browsers block audio before a click.
 * The music pauses while any video with sound is playing, so the two never fight.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false)
  const bgm = useRef<HTMLAudioElement | null>(null)

  const sync = useCallback(() => {
    const heard = Array.from(document.querySelectorAll('video')).some((v) => !v.muted && !v.paused && v.volume > 0)
    if (on && !heard) {
      if (!bgm.current) {
        bgm.current = new Audio('/audio/bgm.m4a')
        bgm.current.loop = true
        bgm.current.volume = 0.2
      }
      bgm.current.play().catch(() => {})
    } else {
      bgm.current?.pause()
    }
  }, [on])

  useEffect(() => {
    sync()
    const events = ['play', 'pause', 'volumechange', 'ended']
    const onMedia = () => window.setTimeout(sync, 60)
    const onVisibility = () => (document.hidden ? bgm.current?.pause() : sync())
    events.forEach((e) => document.addEventListener(e, onMedia, true))
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      events.forEach((e) => document.removeEventListener(e, onMedia, true))
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [sync])

  useEffect(() => () => bgm.current?.pause(), [])

  const value = useMemo(() => ({ on, toggle: () => setOn((v) => !v) }), [on])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
