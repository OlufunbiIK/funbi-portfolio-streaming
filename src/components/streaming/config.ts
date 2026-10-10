export type ProfileKey = 'rec' | 'eng' | 'fnd' | 'all'

/** Rows shown under the hero, keyed by name: [title, project ids]. */
export const ROWS: Record<string, [string, string[]]> = {
  leadway: ['The day job: Leadway', ['portal', 'vendor', 'life', 'general']],
  oss: ['Open source, every month', ['stellarts', 'sentinel', 'xconfess', 'maint']],
  personal: ['Weekend projects', ['money', 'quiz', 'food', 'inno', 'meal']],
  events: ['Eventlybuilt', ['wedding', 'shower', 'bday', 'popcorn']],
  backend: ['Backend and APIs', ['manta', 'ecom', 'stark']],
}

type Profile = { n: string; bg: string; hero: string; tag: string; top: string[]; ord: string[] }

/** "Who's watching?" profiles: each reorders the page for a different kind of visitor. */
export const PROFILES: Record<ProfileKey, Profile> = {
  rec: {
    n: 'Recruiter',
    bg: '#E8A33D',
    hero: 'portal',
    tag: 'Start here',
    top: ['reel', 'portal', 'vendor', 'life', 'maint', 'money'],
    ord: ['leadway', 'personal', 'oss', 'events', 'backend'],
  },
  eng: {
    n: 'Engineer',
    bg: '#4F9DDE',
    hero: 'maint',
    tag: 'For engineers',
    top: ['reel', 'maint', 'stellarts', 'sentinel', 'xconfess', 'portal'],
    ord: ['oss', 'backend', 'leadway', 'personal', 'events'],
  },
  fnd: {
    n: 'Founder',
    bg: '#6FBF73',
    hero: 'wedding',
    tag: 'For founders',
    top: ['reel', 'wedding', 'bday', 'shower', 'inno', 'portal'],
    ord: ['events', 'personal', 'leadway', 'oss', 'backend'],
  },
  all: {
    n: 'Just browsing',
    bg: '#B07CC6',
    hero: 'reel',
    tag: 'Showreel',
    top: ['reel', 'portal', 'vendor', 'life', 'maint', 'wedding'],
    ord: ['leadway', 'oss', 'personal', 'events', 'backend'],
  },
}

export const PROFILE_KEYS: ProfileKey[] = ['rec', 'eng', 'fnd', 'all']

export const PHONE_GRID = ['nest', 'node', 'pg', 'mongo', 'fb', 'stellar', 'pay', 'ci', 'gh', 'vc']
export const PHONE_DOCK = ['react', 'nextjs', 'ts', 'tw']
