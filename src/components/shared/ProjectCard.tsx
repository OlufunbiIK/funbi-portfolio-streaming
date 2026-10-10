'use client'

import { PROJECTS } from '@/data/projects'
import { ProjectVisual } from './ProjectVisual'
import { useSheets } from './sheetsContext'

/** A card for a project, or for its case study when the id starts with "cs_". */
export function ProjectCard({ id }: { id: string }) {
  const { openProject, openCase } = useSheets()
  const isCase = id.startsWith('cs_')
  const baseId = isCase ? id.slice(3) : id
  const p = PROJECTS[baseId]
  const name = isCase ? `Case study: ${p.name}` : p.name
  const kind = isCase ? 'Case study' : p.kind
  const meta = isCase ? 'Problem, decisions, result' : p.meta

  return (
    <button
      type="button"
      className="card"
      data-id={id}
      aria-label={`${name}, ${kind}`}
      onClick={() => (isCase ? openCase(baseId) : openProject(baseId))}
    >
      <ProjectVisual id={baseId} />
      {!isCase && p.wip ? <i className="wip">In progress</i> : !isCase && p.nw ? <i className="wip nw">New</i> : null}
      <span className="cap">
        <span className="k">{kind}</span>
        <b>{name}</b>
        <small>{meta}</small>
      </span>
    </button>
  )
}
