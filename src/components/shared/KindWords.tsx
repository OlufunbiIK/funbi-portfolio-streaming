import { QUOTES } from '@/data/caseStudies'

export function Quotes() {
  return (
    <div className="qs">
      {QUOTES.map(([text, by]) => (
        <figure className="q" key={text}>
          <p>&ldquo;{text}&rdquo;</p>
          <footer>
            <b>{by[0]}</b>
            {by[1]}
          </footer>
        </figure>
      ))}
    </div>
  )
}
