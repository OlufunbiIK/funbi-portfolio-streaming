'use client'

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { CASE_STUDIES, EMM } from '@/data/caseStudies'
import { PROJECTS } from '@/data/projects'
import { STACK } from '@/data/stack'
import { Modal } from './Modal'
import { ProjectCard } from './ProjectCard'
import { ProjectVisual } from './ProjectVisual'
import { Ctx, useSheets, type SheetsApi } from './sheetsContext'

type Active = { type: 'project' | 'case' | 'stack'; id: string } | null

/** Projects whose sheet shows a taller, clickable recreated screen. */
const TALL = new Set(['portal', 'vendor', 'life', 'general', 'stellarts', 'sentinel', 'manta', 'ecom', 'stark'])

export function SheetsProvider({ children, onViewed }: { children: ReactNode; onViewed?: (id: string) => void }) {
  const [active, setActive] = useState<Active>(null)
  const close = useCallback(() => setActive(null), [])

  const api = useMemo<SheetsApi>(
    () => ({
      openProject: (id) => {
        onViewed?.(id)
        setActive({ type: 'project', id })
      },
      openCase: (id) => {
        onViewed?.(id)
        setActive({ type: 'case', id })
      },
      openStack: (key) => setActive({ type: 'stack', id: key }),
    }),
    [onViewed],
  )

  return (
    <Ctx.Provider value={api}>
      {children}
      <Modal
        id="dlg"
        label="Project details"
        open={active?.type === 'project' || active?.type === 'stack'}
        onClose={close}
      >
        {active?.type === 'project' && <ProjectSheet id={active.id} close={close} />}
        {active?.type === 'stack' && <StackSheet stackKey={active.id} close={close} />}
      </Modal>
      <Modal id="cs" className="csd" label="Case study" open={active?.type === 'case'} onClose={close}>
        {active?.type === 'case' && <CaseStudy id={active.id} close={close} />}
      </Modal>
    </Ctx.Provider>
  )
}

function ProjectSheet({ id, close }: { id: string; close: () => void }) {
  const t = PROJECTS[id]
  const { openCase } = useSheets()
  return (
    <>
      <div className={`mh${TALL.has(id) ? ' lv' : ''}${t.vid ? ' vd' : ''}`}>
        <ProjectVisual id={id} live />
        <button type="button" className="x" aria-label="Close" onClick={close}>
          &times;
        </button>
      </div>
      <div className="mb">
        <h2>{t.name}</h2>
        <p className="meta">
          {t.kind}, {t.meta}
        </p>
        <p>{t.desc}</p>
        {t.pts && (
          <ul>
            {t.pts.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        )}
        {t.st && (
          <div className="st">
            {t.st.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        )}
        {(CASE_STUDIES[id] || t.ln) && (
          <div className="ls">
            {CASE_STUDIES[id] && (
              <button type="button" className="btn" onClick={() => openCase(id)}>
                Read the case study
              </button>
            )}
            {t.ln?.map(([label, href, primary]) => (
              <a
                key={label}
                className={`btn${primary ? '' : ' g'}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </div>
        )}
        {t.pv === 1 && (
          <p className="pv">
            Screens are recreated with sample data and a neutral name. The real source is private; I can walk you
            through the architecture and my part in it on a call.
          </p>
        )}
        {t.pv === 3 && <p className="pv">This was client work and is private. Happy to discuss it.</p>}
        {t.pv === 4 && (
          <p className="pv">
            There is no hosted demo. The screens above are illustrations based on the project&apos;s README; the code is
            on GitHub.
          </p>
        )}
        {t.pv === 5 && (
          <p className="pv">The screens above are illustrations of the API, not a hosted app. The code is on GitHub.</p>
        )}
      </div>
    </>
  )
}

function CaseStudy({ id, close }: { id: string; close: () => void }) {
  const c = CASE_STUDIES[id]
  const by = c.qby ?? EMM
  return (
    <div className="csb">
      <div className="csh">
        <b>Case study</b>
        <button type="button" onClick={close}>
          Close
        </button>
      </div>
      <div className="cs-hero">
        <h2>{c.t}</h2>
        <p>{c.sub}</p>
      </div>
      <div className="facts">
        {c.facts.map(([k, v]) => (
          <div key={k}>
            <small>{k}</small>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div className={`cs-vis${c.live ? ' lv' : ''}`}>
        <ProjectVisual id={id} live={Boolean(c.live)} />
      </div>
      <div className="cs-sec">
        <h3>The problem</h3>
        {c.problem.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h3>My part</h3>
        <ul>
          {c.part.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <h3>Hard decisions</h3>
        <div className="dec">
          {c.dec.map(([title, body]) => (
            <div key={title}>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <h3>The result</h3>
        {c.result.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {c.quote && (
          <div className="cs-q">
            &ldquo;{c.quote}&rdquo;
            <small>
              {by[0]}, {by[1]}
            </small>
          </div>
        )}
        {c.links && (
          <p>
            {c.links.map(([label, href, primary]) => (
              <a
                key={label}
                className={`btn${primary ? '' : ' g'}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </p>
        )}
        {c.priv && (
          <p className="cs-note">
            Screens are recreated with sample data and a neutral name. The real source is private; I can walk you
            through the architecture on a call.
          </p>
        )}
        {c.ill && (
          <p className="cs-note">
            The screens are illustrations based on the project&apos;s README. There is no hosted demo; the code is on
            GitHub.
          </p>
        )}
      </div>
    </div>
  )
}

function StackSheet({ stackKey, close }: { stackKey: string; close: () => void }) {
  const [name, , , ids] = STACK[stackKey]
  return (
    <div className="mb" style={{ marginTop: 0, paddingTop: 30 }}>
      <button type="button" className="x" aria-label="Close" onClick={close}>
        &times;
      </button>
      <h2>Built with {name}</h2>
      <p className="meta">
        {ids.length} project{ids.length > 1 ? 's' : ''}
      </p>
      <div className="tr" style={{ padding: '6px 0 12px' }}>
        {ids.map((i) => (
          <ProjectCard key={i} id={i} />
        ))}
      </div>
    </div>
  )
}
