import { GitHubStrip } from '@/components/shared/GitHubStrip'
import { StreamingApp } from '@/components/streaming/StreamingApp'

/** Rebuild at most once a day so the GitHub contribution graph stays fresh. */
export const revalidate = 86400

export default function Home() {
  return <StreamingApp strip={<GitHubStrip />} />
}
