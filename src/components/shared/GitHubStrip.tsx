import { SITE } from '@/lib/site'

type Day = { date: string; count: number; level: number }
type ApiResult = { total?: Record<string, number>; contributions?: Day[] }

/**
 * Real GitHub contribution graph, fetched on the server and cached for a day.
 * Uses the public jogruber.de contributions API (no token needed). If it is unreachable, the section is hidden.
 */
export async function GitHubStrip() {
  let data: ApiResult | null = null
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${SITE.contributionsUser}?y=last`, {
      next: { revalidate: 86400 },
    })
    if (res.ok) data = (await res.json()) as ApiResult
  } catch {
    data = null
  }
  const days = data?.contributions
  if (!days || days.length === 0) return null

  const total = data?.total ? Object.values(data.total)[0] : days.reduce((n, d) => n + d.count, 0)
  const weeks: Day[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  return (
    <section id="gh" aria-labelledby="ght" className="ghs">
      <h2 id="ght">Building in public</h2>
      <p>
        {total} contributions in the last year on{' '}
        <a href={`https://github.com/${SITE.contributionsUser}`} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
      <div className="ghg" role="img" aria-label={`${total} GitHub contributions in the last year`}>
        {weeks.map((w, i) => (
          <div key={i} className="ghw">
            {w.map((d) => (
              <i key={d.date} className={`l${d.level}`} title={`${d.count} on ${d.date}`} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
