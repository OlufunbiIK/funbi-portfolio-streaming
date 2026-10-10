'use client'

import { useEffect, useState } from 'react'

/** Loading screen that fades out once the page has finished loading (with a 4s safety net). */
export function BootSplash() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const done = () => window.setTimeout(() => setHide(true), 500)
    if (document.readyState === 'complete') done()
    else window.addEventListener('load', done, { once: true })
    const safety = window.setTimeout(() => setHide(true), 4000)
    return () => window.clearTimeout(safety)
  }, [])

  return (
    <>
      <div id="boot" className={hide ? 'hide' : ''} role="status" aria-live="polite">
        <span className="bl">FUNBI</span>
        <i className="bb">
          <b />
        </i>
        <small>Loading the portfolio</small>
      </div>
      <noscript>
        <style>{'#boot{display:none}'}</style>
      </noscript>
    </>
  )
}
