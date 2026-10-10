'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { CASE_IDS } from '@/data/caseStudies'
import { PROJECTS } from '@/data/projects'
import { STACK } from '@/data/stack'
import { SITE } from '@/lib/site'
import { SoundProvider, useSound } from '@/lib/sound'
import { getStored, setStored, useStored } from '@/lib/useStored'
import { useScrolled } from '@/lib/useScrolled'
import { BootSplash } from '@/components/shared/BootSplash'
import { CvLink } from '@/components/shared/CvLink'
import { Quotes } from '@/components/shared/KindWords'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { ProjectVisual } from '@/components/shared/ProjectVisual'
import { SheetsProvider } from '@/components/shared/Sheets'
import { useSheets } from '@/components/shared/sheetsContext'
import { ThemeSwitch } from '@/components/shared/ThemeSwitch'
import { PHONE_DOCK, PHONE_GRID, PROFILES, PROFILE_KEYS, ROWS, type ProfileKey } from './config'

const GLYPHS: Record<ProfileKey, ReactNode> = {
  rec: (
    <>
      <rect x="26" y="40" width="48" height="34" rx="4" fill="#1A1204" />
      <path d="M40 40V32h20v8" stroke="#1A1204" strokeWidth="6" fill="none" />
      <rect x="26" y="54" width="48" height="4" fill="#E8A33D" />
    </>
  ),
  eng: (
    <path
      d="M38 34L20 52L38 70M62 34L80 52L62 70M55 28L45 76"
      stroke="#1A1204"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  fnd: (
    <>
      <path d="M50 20C66 34 68 56 58 72H42C32 56 34 34 50 20Z" fill="#1A1204" />
      <circle cx="50" cy="46" r="7" fill="#6FBF73" />
      <path d="M42 72L34 84M58 72L66 84" stroke="#1A1204" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  all: (
    <>
      <path d="M14 50C30 28 70 28 86 50C70 72 30 72 14 50Z" fill="none" stroke="#1A1204" strokeWidth="6" />
      <circle cx="50" cy="50" r="11" fill="#1A1204" />
    </>
  ),
}

export function StreamingApp() {
  const raw = useStored('lv')
  const viewed = useMemo<string[]>(() => {
    try {
      return JSON.parse(raw || '[]')
    } catch {
      return []
    }
  }, [raw])

  const onViewed = useCallback((id: string) => {
    if (id === 'reel') return
    let current: string[] = []
    try {
      current = JSON.parse(getStored('lv') || '[]')
    } catch {
      /* ignore bad stored data */
    }
    setStored('lv', JSON.stringify([id, ...current.filter((x) => x !== id)].slice(0, 6)))
  }, [])

  return (
    <SoundProvider>
      <SheetsProvider onViewed={onViewed}>
        <Page viewed={viewed} />
      </SheetsProvider>
    </SoundProvider>
  )
}

function SoundSwitch() {
  const { on, toggle } = useSound()
  return (
    <button type="button" className="snd" role="switch" aria-checked={on} aria-label="Sound" onClick={toggle}>
      {on ? 'Sound on' : 'Sound off'}
    </button>
  )
}

function Row({ id, title, ids }: { id: string; title: string; ids: string[] }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <section className="row" id={`r-${id}`}>
      <h2>{title}</h2>
      <button type="button" className="arr l" aria-label="Scroll left" onClick={() => scroll(-1)}>
        &#8249;
      </button>
      <div className="tr" ref={track}>
        {ids.map((i) => (
          <ProjectCard key={i} id={i} />
        ))}
      </div>
      <button type="button" className="arr r" aria-label="Scroll right" onClick={() => scroll(1)}>
        &#8250;
      </button>
    </section>
  )
}

function AppIcon({ k }: { k: string }) {
  const { openStack } = useSheets()
  const [name, short, [c1, c2], ids] = STACK[k]
  return (
    <button
      type="button"
      className="app"
      data-k={k}
      aria-label={`${name}, ${ids.length} projects`}
      onClick={() => openStack(k)}
    >
      <i style={{ background: `linear-gradient(145deg,${c1},${c2})` }}>{short}</i>
      <span>{name.split(' ')[0]}</span>
    </button>
  )
}

function Page({ viewed }: { viewed: string[] }) {
  const saved = useStored('fp')
  const [choosing, setChoosing] = useState(false)
  const scrolled = useScrolled(40)
  const profile: ProfileKey = saved && saved in PROFILES ? (saved as ProfileKey) : 'all'
  const gate = choosing || !(saved && saved in PROFILES)
  const { openProject } = useSheets()
  const firstProfile = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (gate) firstProfile.current?.focus()
  }, [gate])

  // Arrow keys move between cards: left/right inside a row, up/down between rows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null
      if (!el?.classList.contains('card') || el.closest('dialog')) return
      const track = el.parentElement as HTMLElement
      const cards = Array.from(track.children) as HTMLElement[]
      const i = cards.indexOf(el)
      let next: HTMLElement | undefined
      if (e.key === 'ArrowRight') next = cards[i + 1]
      else if (e.key === 'ArrowLeft') next = cards[i - 1]
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const rows = Array.from(document.querySelectorAll<HTMLElement>('.row .tr'))
        const target = rows[rows.indexOf(track) + (e.key === 'ArrowDown' ? 1 : -1)]
        if (target) next = target.children[Math.min(i, target.children.length - 1)] as HTMLElement
      }
      if (next) {
        e.preventDefault()
        next.focus()
        next.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const pick = (k: ProfileKey) => {
    setStored('fp', k)
    setChoosing(false)
    window.scrollTo(0, 0)
  }

  const p = PROFILES[profile]
  const heroId = p.hero
  const hero = PROJECTS[heroId]
  const resume = viewed.filter((i) => PROJECTS[i]).slice(0, 6)

  return (
    <>
      <BootSplash />
      <a className="skipl" href="#main">
        Skip to projects
      </a>

      <div
        id="gate"
        className={gate ? '' : 'h'}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gt"
        aria-hidden={!gate}
      >
        <p className="hola" lang="es">
          ¡Bienvenidos!
        </p>
        <h1 id="gt">Who&apos;s watching?</h1>
        <div className="pf" id="pf">
          {PROFILE_KEYS.map((k, i) => (
            <button
              key={k}
              ref={i === 0 ? firstProfile : undefined}
              type="button"
              className="pr"
              data-k={k}
              onClick={() => pick(k)}
            >
              <span className="av" style={{ backgroundColor: PROFILES[k].bg }}>
                <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                  {GLYPHS[k]}
                </svg>
              </span>
              <span className="nm">{PROFILES[k].n}</span>
            </button>
          ))}
        </div>
        <button type="button" className="sk" onClick={() => pick('all')}>
          Skip and browse everything
        </button>
      </div>

      <nav id="nav" className={scrolled ? 's' : ''}>
        <a className="logo" href="#top">
          FUNBI
        </a>
        <div className="lk">
          <a href="#top">Home</a>
          <a href="#r-leadway">Leadway</a>
          <a href="#r-oss">Open source</a>
          <a href="#r-personal">Weekend projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nvr">
          <ThemeSwitch />
          <SoundSwitch />
          <CvLink className="btn g cvn">Résumé</CvLink>
          <button type="button" className="me" aria-label="Switch profile" onClick={() => setChoosing(true)}>
            <span id="who" style={{ color: '#d6d1c9', fontSize: '.9rem' }}>
              {p.n}
            </span>
            <img src="/images/photo.webp" alt="" width={34} height={34} />
          </button>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hbg" id="hart" style={{ background: `linear-gradient(135deg,${hero.c[0]},${hero.c[1]})` }}>
          <div className="heroart">
            <ProjectVisual id={heroId} hero />
          </div>
        </div>
        <div className="in">
          <p className="avail">
            <i aria-hidden="true" />
            Open to remote roles
          </p>
          <p className="kick" id="hk">
            {p.tag}
          </p>
          <h1 id="ht">{hero.name}</h1>
          <p className="d" id="hd">
            {hero.desc}
          </p>
          <div className="b">
            <button type="button" className="btn" onClick={() => openProject(heroId)}>
              View the story
            </button>
            <a className="btn g" href="#contact">
              Get in touch
            </a>
            <CvLink>Download CV</CvLink>
          </div>
        </div>
      </header>

      <main id="main">
        <div id="rows">
          <Row id="top" title={`Top picks for ${profile === 'all' ? 'you' : `a ${p.n.toLowerCase()}`}`} ids={p.top} />
          <Row id="cases" title="Case studies" ids={CASE_IDS} />
          {resume.length > 0 && <Row id="resume" title="Pick up where you left off" ids={resume} />}
          {p.ord.map((k) => (
            <Row key={k} id={k} title={ROWS[k][0]} ids={ROWS[k][1]} />
          ))}
        </div>

        <section id="stack" aria-labelledby="stt">
          <div className="stk">
            <div className="stx">
              <h2 id="stt">On my home screen</h2>
              <p>The tools I reach for most. Tap an app to see what I built with it.</p>
            </div>
            <div className="phone">
              <div className="stb">
                <b>9:41</b>
                <span>5G</span>
              </div>
              <div className="wdg">
                <small>Currently building</small>
                <b>Core General Business Admin</b>
                <span className="bar2">
                  <i />
                </span>
              </div>
              <div className="grid" id="grid">
                {PHONE_GRID.map((k) => (
                  <AppIcon key={k} k={k} />
                ))}
              </div>
              <div className="dock" id="dock">
                {PHONE_DOCK.map((k) => (
                  <AppIcon key={k} k={k} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="kind" aria-labelledby="kt">
          <h2 id="kt">Kind words</h2>
          <p>Short notes from my team lead at Leadway and from a client, in their own words.</p>
          <Quotes />
        </section>

        <section id="about">
          <img src="/images/photo.webp" alt="Portrait of Olufunbi Ibrahim" width={720} height={720} />
          <div>
            <h2>About Funbi</h2>
            <p className="hola" lang="es" style={{ marginBottom: 4 }}>
              ¡Hola! Me llamo Funbi.
            </p>
            <p>
              Frontend developer at Leadway Assurance in Abuja since 2023. I turn long insurance forms into flows people
              finish, I contribute to open source every month, and I build event sites through Eventlybuilt. Open to
              remote roles. My Spanish is still at beginner level, so please be patient with me.
            </p>
          </div>
        </section>

        <section id="contact">
          <h2>Have something worth building?</h2>
          <p>I read every message.</p>
          <div className="b">
            <a className="btn" href={`mailto:${SITE.email}`}>
              Email me
            </a>
            <CvLink>Download CV</CvLink>
            <a className="btn g" href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="btn g" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
      <footer>Olufunbi Ibrahim, Abuja, Nigeria</footer>
    </>
  )
}
