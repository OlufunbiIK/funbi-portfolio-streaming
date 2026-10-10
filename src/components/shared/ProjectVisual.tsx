'use client'

import { useState, type ReactNode } from 'react'
import { PROJECTS } from '@/data/projects'
import { Mock } from '@/components/mocks/Mock'
import { ReelVideo } from './ReelVideo'

type Props = {
  id: string
  /** Inside a project sheet: mock screens become clickable. */
  live?: boolean
  /** Big featured image at the top of the page. */
  hero?: boolean
}

/** The picture for a project: a real screenshot, the showreel, or a recreated screen. */
export function ProjectVisual({ id, live, hero }: Props) {
  const p = PROJECTS[id]
  const [loaded, setLoaded] = useState(false)
  const heavy = Boolean(p.img || p.vid)
  const track = (el: HTMLImageElement | null) => {
    if (el?.complete) setLoaded(true)
  }

  let inner: ReactNode
  if (p.vid) {
    inner = hero ? (
      <ReelVideo mode="hero" />
    ) : live ? (
      <ReelVideo mode="sheet" />
    ) : (
      <>
        <img
          ref={track}
          src="/media/reel-poster.jpg"
          alt="Trailer preview"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
        <i className="play" />
      </>
    )
  } else if (p.img) {
    inner = (
      <img
        ref={track}
        src={`/images/${p.img}.webp`}
        alt={`Screenshot of ${p.name}`}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    )
  } else {
    inner = (
      <div className="mk" aria-hidden={live ? undefined : true}>
        <Mock id={id} live={live} />
      </div>
    )
  }

  return (
    <div
      className={`art ${heavy && !loaded ? 'sk' : 'ok'}`}
      style={{ background: `linear-gradient(135deg,${p.c[0]},${p.c[1]})` }}
    >
      {inner}
    </div>
  )
}
