'use client'

import { useEffect, useRef, useState } from 'react'
import { useSound } from '@/lib/sound'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * The showreel. In the hero it loops silently until the visitor turns sound on;
 * in the project sheet it has controls and plays with sound.
 */
export function ReelVideo({ mode }: { mode: 'hero' | 'sheet' }) {
  const { on } = useSound()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(mode === 'hero')

  useEffect(() => {
    const v = ref.current
    if (!v || mode !== 'hero') return
    v.muted = !on
    if (on)
      v.play().catch(() => {
        v.muted = true
      })
  }, [on, mode])

  useEffect(() => {
    if (mode === 'hero' && reduced) ref.current?.pause()
  }, [reduced, mode])

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 6000)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <video
        ref={ref}
        className="rv"
        src="/media/reel.mp4"
        poster="/media/reel-poster.jpg"
        autoPlay
        muted={mode === 'hero'}
        loop
        playsInline
        controls={mode === 'sheet'}
        onPlaying={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {mode === 'hero' && loading && <i className="spin" aria-hidden="true" />}
    </>
  )
}
