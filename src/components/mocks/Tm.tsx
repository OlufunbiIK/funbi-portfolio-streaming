'use client'

import { useEffect, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/** A labelled text field placeholder inside a recreated screen. */
export function Fld({ l, w = 100 }: { l: string; w?: number }) {
  return (
    <>
      <p className="t3">{l}</p>
      <div className="inp" style={{ width: `${w}%` }} />
    </>
  )
}

/** Rows with a status pill: [label, pill text, pill class]. */
export function Rows({ items }: { items: [string, string, string][] }) {
  return (
    <>
      {items.map(([label, pill, cls]) => (
        <div className="rw" key={label}>
          <p className="t2">{label}</p>
          <span className={`pl t3 ${cls}`}>{pill}</span>
        </div>
      ))}
    </>
  )
}

/** A small segmented choice, with one option switched on. */
export function Seg({ items, on }: { items: string[]; on: number }) {
  return (
    <div className="tg">
      {items.map((x, i) => (
        <i key={x} className={`${i === on ? 'on ' : ''}t3`} style={i === on ? { color: '#fff' } : undefined}>
          {x}
        </i>
      ))}
    </div>
  )
}

type Props = {
  ac: string
  brand: string
  tabs: string[]
  panes: ReactNode[]
  side?: boolean
  chat?: boolean
  /** Live mocks (inside a project sheet) can be clicked; otherwise they just cycle by themselves. */
  live?: boolean
}

/**
 * A recreated app screen with tabs. It cycles through its tabs by itself
 * until the visitor clicks one. Which pane is visible is driven by the data-s attribute in the CSS.
 */
export function TabbedMock({ ac, brand, tabs, panes, side, chat, live }: Props) {
  const [s, setS] = useState(0)
  const [manual, setManual] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (manual || reduced) return
    const id = window.setInterval(() => setS((v) => (v + 1) % tabs.length), 2600)
    return () => window.clearInterval(id)
  }, [manual, reduced, tabs.length])

  const pick = (i: number) => {
    setManual(true)
    setS(i)
  }

  const tabEls = tabs.map((t, i) => (
    <span
      key={t}
      className="tab t3"
      data-i={i}
      role={live ? 'tab' : undefined}
      aria-selected={live ? s === i : undefined}
      tabIndex={live ? 0 : undefined}
      onClick={live ? () => pick(i) : undefined}
      onKeyDown={
        live
          ? (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                pick(i)
              }
            }
          : undefined
      }
    >
      {t}
    </span>
  ))
  const paneEls = panes.map((p, i) => (
    <div key={i} className={`pane p${i}`}>
      {p}
    </div>
  ))

  return (
    <div
      className="win tm"
      style={{ '--ac': ac } as CSSProperties}
      data-s={s}
      data-n={tabs.length}
      role={live ? 'tablist' : undefined}
    >
      {side ? (
        <>
          <div className="sb">
            <b className="t1 br">{brand}</b>
            {tabEls}
          </div>
          <div className="mn">{paneEls}</div>
        </>
      ) : (
        <>
          <div className="bar">
            <b className="t1">{brand}</b>
            {tabEls}
          </div>
          <div className="body">{paneEls}</div>
        </>
      )}
      {chat && (
        <div className="chat">
          <i>Can I help with this quote?</i>
        </div>
      )}
    </div>
  )
}
