import type { ReactNode } from 'react'
import { SITE } from '@/lib/site'

/** Downloads the CV straight from /public, no scripts needed. */
export function CvLink({ className = 'btn g', children }: { className?: string; children: ReactNode }) {
  return (
    <a className={className} href={SITE.cv} download="Olufunbi_Ibrahim_CV.pdf">
      {children}
    </a>
  )
}
