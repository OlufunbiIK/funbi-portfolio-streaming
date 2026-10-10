// Case studies and the short quotes shown in "Kind words".
import type { Link } from '@/data/projects'

export type CaseStudy = {
  t: string
  sub: string
  live?: number
  priv?: number
  ill?: number
  facts: [string, string][]
  problem: string[]
  part: string[]
  dec: [string, string][]
  result: string[]
  quote?: string
  qby?: [string, string]
  links?: Link[]
}

export const EMM: [string, string] = ['Emmanuel Asunomeh', 'Team lead, Leadway Assurance']
export const BRIDE: [string, string] = ['The bride', 'Wedding microsite client']
export const QUOTES: [string, [string, string]][] = [
  ['You did a perfect work layout.', EMM],
  ['Everybody will follow the pattern [based] on the design.', EMM],
  ["I've gone through it. You did a fantastic job my love.", BRIDE],
]
export const CASE_STUDIES: Record<string, CaseStudy> = {
  portal: {
    t: 'Intermediary Portal',
    sub: 'One proposal flow for 16 insurance products',
    live: 1,
    priv: 1,
    facts: [
      ['Role', 'Frontend developer'],
      ['Timeline', 'Apr to Jun 2026'],
      ['Team', 'Backend engineers and a team lead'],
      ['Stack', 'React, Next.js, TypeScript, Tailwind CSS, Paystack, pdfmake'],
    ],
    problem: [
      'The Intermediary Portal needed a purchase journey for 16 insurance products, including the Deferred Annuity Plan, Leadway Lifetime Plan, Immediate Annuity and Education Savings Plan.',
      'Each product has its own questions and rules, but they all end the same way: a reviewed, signed proposal and a payment. The risk was sixteen one-off forms that slowly drift apart.',
    ],
    part: [
      'Built the multi-step proposal wizards: personal details, medical questionnaires, plan selection, declaration and signature, terms, and review.',
      'Replaced mock data with live API calls and checked every submit and review field against the backend DTOs.',
      'Implemented the Paystack payment flow for the Deferred Annuity Plan and the downloadable PDFs with pdfmake.',
    ],
    dec: [
      [
        'One pattern, many products',
        'I built the journey around one layout pattern, so a new product reuses the same steps and mostly changes the questions.',
      ],
      [
        'Questions that appear only when they matter',
        'Medical questionnaires use conditional fields, so people only see follow-up questions that apply to their answers.',
      ],
      [
        'Trust the contract, not the mock',
        'I audited each field against the backend DTO before submit, so a proposal cannot go out with a field the API does not expect.',
      ],
      [
        'Documents that look right',
        'The PDFs needed fixes for logo loading, font encoding and the Naira symbol before they were fit to send.',
      ],
      [
        'Say it once',
        'In review, we found terms and conditions repeated in personal details when they are already accepted on the first page, so I removed the duplicate.',
      ],
    ],
    result: [
      'The work was merged after review, and the design became the reference for the rest of the team.',
      '16 products now share the flow.',
    ],
    quote: 'Everybody will follow the pattern [based] on the design.',
  },
  vendor: {
    t: 'Vendor Bidding Portal',
    sub: 'Registration and bidding for Leadway vendors',
    live: 1,
    priv: 1,
    facts: [
      ['Role', 'Frontend developer'],
      ['Timeline', 'Jun to Dec 2025'],
      ['Status', 'Live'],
      ['My scope', 'Vendor registration and the vendor module'],
    ],
    problem: [
      'Leadway needed a platform where vendors can register, take part in bids and find out the outcome, while staff create bids, approve vendors and award them.',
      'The platform has three modules: one for vendors, and one each for managers and officers, who create bids, approve vendor accounts, assign work, approve bids and award them.',
    ],
    part: [
      'Built vendor registration, so a new vendor can create an account that staff then review and approve.',
      'Built the vendor module, where vendors join bids, see when a bid goes live, track it and find out whether they won.',
      'Built the vendor profile, so companies can see their own account details.',
    ],
    dec: [
      [
        'Registration that hands over cleanly',
        'Vendor accounts are approved by staff, so registration had to collect what reviewers need and then show the vendor where their application stands.',
      ],
      [
        'Make every bid easy to follow',
        'Vendors can see when a bid will go live, track it as it moves and see whether they won, so they never have to ask.',
      ],
      [
        'One platform, three audiences',
        'Vendors, managers and officers need different views of the same bids, so the vendor module stays simple and leaves the staff tools to the other modules.',
      ],
    ],
    result: [
      'The portal is live.',
      'Vendor registration and the vendor module shipped as part of a six-month project, June to December 2025.',
    ],
  },
  life: {
    t: 'Life Core Admin',
    sub: 'The admin application for the life insurance business',
    live: 1,
    priv: 1,
    facts: [
      ['Role', 'Frontend developer'],
      ['Timeline', 'May to Jul 2026'],
      ['Team', 'Backend engineers and a team lead'],
      ['Stack', 'React, Next.js, TypeScript, Tailwind CSS'],
    ],
    problem: [
      'The life insurance business needed an admin application where staff work quotations and tasks, with each person seeing only what their role allows.',
    ],
    part: [
      'Built user flows, quotation management and task management.',
      'Built role-based permissions across screens and actions.',
      'Built the animated sidebar, the dashboard header and a quotation chat widget.',
    ],
    dec: [
      [
        'The dashboard is the main screen',
        'In review, my team lead asked for the dashboard to be the main landing page and not sit under "admin", so I renamed and restructured it that way.',
      ],
      [
        'Permissions shape the interface',
        'What a person can see and do follows their role, so the app does not offer actions they cannot take.',
      ],
      [
        'Help close to the work',
        'A chat widget on the quotation dashboard keeps support one click away while someone works a quote.',
      ],
    ],
    result: ['The work was merged after review.', 'The layout became the pattern the rest of the team follows.'],
    quote: 'You did a perfect work layout.',
  },
  general: {
    t: 'Core General Business Admin',
    sub: 'The admin application for the general insurance business',
    live: 1,
    priv: 1,
    facts: [
      ['Role', 'Frontend developer'],
      ['Status', 'In progress'],
      ['Stack', 'Next.js, TypeScript, next-intl, RESTful APIs'],
    ],
    problem: [
      'The general insurance business needs its own admin application for quotations, tasks and permissions, with sign-in that is secure without getting in the way.',
    ],
    part: [
      'Built login, OTP verification and token refresh with automatic retry.',
      'Built user flows, quotations, tasks and permissions.',
      'Added an auth gate and privilege-gated screens and actions to close security findings.',
      'Set up an English and French interface with next-intl.',
    ],
    dec: [
      [
        'Refresh quietly, retry automatically',
        'Tokens refresh in the background and failed requests retry, so a session does not break halfway through a task.',
      ],
      [
        'Gate every screen and action',
        'An auth gate plus privilege checks decide what renders and what can be clicked, which closed the security findings raised in review.',
      ],
      [
        'Two languages from the start',
        'The interface is built for English and French with next-intl, so adding copy later does not mean reworking components.',
      ],
    ],
    result: ['The project is in progress, with sign-in and permissions in place.'],
  },
  xconfess: {
    t: 'Xconfess',
    sub: 'Moderating an anonymous platform',
    facts: [
      ['Role', 'Open-source contributor'],
      ['Status', 'Live, code on GitHub'],
      ['Stack', 'NestJS, Next.js, TypeScript, Stellar'],
    ],
    problem: [
      'Xconfess lets people share confessions anonymously, with optional proof anchored on Stellar. An open platform like that needs moderation: someone has to review reports, and every decision should be accountable.',
    ],
    part: [
      'Built a production-grade moderation queue with state-machine transitions and audit logging.',
      'Added request throttling to the Stellar anchor and tip endpoints.',
      'Fixed CI build failures caused by TypeScript import and path issues.',
    ],
    dec: [
      [
        'Moderation as a state machine',
        'Each report can only move through explicit, allowed transitions, so a decision cannot skip a step or land in an impossible state.',
      ],
      [
        'Audit every change',
        'Every state change is logged, so reviewers and maintainers can see what happened and why.',
      ],
      [
        'Throttle what touches the chain',
        'The anchor and tip endpoints are the easiest to abuse, so they get request limits.',
      ],
      [
        'Keep the pipeline green',
        'CI failures from imports and paths were fixed so other contributors are not blocked.',
      ],
    ],
    result: [
      'The moderation queue gives every report a clear lifecycle and a full audit trail.',
      'It is live at xconfess.vercel.app and open source on GitHub.',
    ],
    links: [
      ['Live site', 'https://xconfess.vercel.app/', 1],
      ['GitHub', 'https://github.com/OlufunbiIK/Xconfess/tree/main'],
    ],
  },
  maint: {
    t: 'StellarSplit',
    sub: 'Running an open-source project for contributors',
    facts: [
      ['Role', 'Owner and maintainer'],
      ['Programmes', 'GrantFox and Drips Wave'],
      ['Status', 'Live demo, open source'],
    ],
    problem: [
      'StellarSplit helps people track shared expenses and settle balances on Stellar. An open-source project like this needs contributors, and contributors need clear work to pick up.',
    ],
    part: [
      'Own and maintain the project, alongside TipTune, Stellar Quest and TitleChain.',
      'Wrote grant applications for the GrantFox and Drips Wave programmes.',
      'Wrote 30 structured issues across frontend, backend and contracts, based on the codebase.',
      'Set up branch protection rules to stop unauthorised merges.',
    ],
    dec: [
      [
        'Issues grounded in the code',
        'Each issue points to real files and behaviour, so a new contributor can start without a long explanation.',
      ],
      [
        'Protect the main branch',
        'Branch protection means nothing merges without review, which matters when contributors are strangers.',
      ],
      [
        'Apply to the programmes',
        'Programmes like GrantFox and Drips Wave can bring contributors, so I applied and kept the backlog ready for them.',
      ],
    ],
    result: [
      'The project is live and open source, with a structured backlog for contributors.',
      'Participation in GrantFox and Drips Wave is ongoing.',
    ],
    links: [
      ['Live demo', 'https://stellar-split-chi.vercel.app/', 1],
      ['GitHub', 'https://github.com/StellarSplit/StellarSplit'],
    ],
  },
  stellarts: {
    t: 'StellArts',
    sub: 'Trust in a marketplace for artisans',
    live: 1,
    ill: 1,
    facts: [
      ['Role', 'Open-source contributor'],
      ['Stack', 'Next.js, FastAPI, Soroban, Stellar'],
      ['Status', 'Open source'],
    ],
    problem: [
      'StellArts is a location-based marketplace that connects skilled artisans with nearby clients, with payments on Stellar and Soroban contracts for escrow and reputation. A marketplace like that depends on trust.',
    ],
    part: [
      'Migrated the Next.js theme.',
      'Built the reviews feature and fixed a cache invalidation bug.',
      'Worked on the Soroban escrow protocol fee system.',
    ],
    dec: [
      [
        'Reviews as a trust signal',
        'Reviews give clients a way to judge an artisan before they book, which matters most in a marketplace of strangers.',
      ],
      [
        'Fix stale data',
        'A cache invalidation bug could leave people looking at out-of-date information, so it was fixed.',
      ],
      [
        'A fee inside the escrow',
        'The protocol fee is part of the Soroban escrow logic, so it applies the same way to every job.',
      ],
    ],
    result: ['The contributions are part of the open-source project, and the code is on GitHub.'],
    links: [['GitHub', 'https://github.com/OlufunbiIK/StellArts', 1]],
  },
  sentinel: {
    t: 'Sentinel',
    sub: 'Catching risky transactions before they finalise',
    live: 1,
    ill: 1,
    facts: [
      ['Role', 'Open-source contributor'],
      ['Stack', 'NestJS, React, PostgreSQL, Prisma'],
      ['Status', 'Open source'],
    ],
    problem: [
      'A blockchain transaction waits in the mempool before it finalises. That is the window in which a risky ownership change or a large transfer can still be caught, which is what Sentinel watches for on Stellar and EVM networks.',
    ],
    part: [
      'Built a reputation scoring module in the NestJS backend.',
      'Fixed CI failures across TypeScript, ESLint and Prisma.',
    ],
    dec: [
      [
        'Scoring in its own module',
        'NestJS modules let the scoring logic stand apart from the rest of the monitoring bot, so it can be tested and changed on its own.',
      ],
      [
        'Fix the pipeline, not just the build',
        'CI failures across three tools were fixed so later contributions are not blocked by tooling.',
      ],
    ],
    result: ['The module and CI fixes are part of the open-source project, with the code on GitHub.'],
    links: [['GitHub', 'https://github.com/OlufunbiIK/Sentinel', 1]],
  },
  wedding: {
    t: 'Wedding microsite',
    sub: 'One site for everything an invitation could not hold',
    facts: [
      ['Role', 'Designer and developer'],
      ['Studio', 'Eventlybuilt'],
      ['Status', 'Live'],
    ],
    problem: [
      'A two-day wedding celebration, traditional and white, has more for guests to know than one invitation can hold. The invitation was too small for all the information, and guests still needed to know where to be, when, what to wear and how to reply.',
    ],
    part: [
      'Designed and built the site end to end.',
      'Built the invitation, story, weekend schedule, gallery, dress code and gift sections.',
      'Built the live countdown, the RSVP and a password-protected guest list.',
    ],
    dec: [
      [
        'Put what the invitation could not hold on the site',
        "The invitation stays short and the website carries the rest: the weekend schedule, dress code, gifts, gallery and the couple's story.",
      ],
      [
        "Organise by the guest's questions",
        'The navigation follows what guests ask: invitation, our story, the weekend, the gallery, dress code, gifts and RSVP.',
      ],
      ['Make the date feel close', 'A live countdown sits on the first screen, so the day is always in view.'],
      ['Keep the guest list private', "The guest list sits behind a password, so guests' details stay private."],
      ['Make replying easy', '"RSVP now" sits right beside "View the invitation" on the first screen.'],
    ],
    result: ['The site is live, and it was my first paying client project under Eventlybuilt.'],
    quote: "I've gone through it. You did a fantastic job my love.",
    qby: BRIDE,
    links: [['Live site', 'https://ini-ade.vercel.app/', 1]],
  },
  shower: {
    t: 'Baby shower site',
    sub: 'A surprise shower with everything in one place',
    facts: [
      ['Role', 'Designer and developer'],
      ['Studio', 'Eventlybuilt'],
      ['Status', 'Live'],
    ],
    problem: [
      'A surprise baby shower has to keep the secret while still giving guests everything they need: the details, an easy way to ask questions, and the baby registry. The host also needs to know who is coming.',
    ],
    part: [
      'Designed and built the invitation site, with the date, time and venue.',
      'Added more information for guests, easy communication and the baby registry.',
      'Collected guest details and saved them in Google Forms.',
      'Built an admin-only section, locked with a password, where the host can see who will attend.',
    ],
    dec: [
      [
        'Everything in one place',
        'The registry, the details and the ways to get in touch sit on one site, so guests do not have to chase the host for information.',
      ],
      [
        'Collect with Google Forms',
        'Guest details are saved in Google Forms, so the host can open and sort the responses without a custom backend.',
      ],
      [
        'Lock the guest list',
        "Attendee details are visible only in an admin section behind a password, so guests' information stays private.",
      ],
      [
        'Keep the surprise in the design',
        'The site opens with "Shhhh, don\'t tell anyone yet!", so the secret is part of the experience.',
      ],
    ],
    result: ['The site is live and gives the host one link to share with guests.'],
    links: [['Live site', 'https://baby-shower-henna.vercel.app/', 1]],
  },
  popcorn: {
    t: 'No More Popcorn',
    sub: 'A potluck where nobody brings the same dish',
    facts: [
      ['Role', 'Designer and developer'],
      ['Studio', 'Eventlybuilt'],
      ['Status', 'Live, code on GitHub'],
    ],
    problem: [
      'Potlucks go wrong in a familiar way: everyone brings the same thing and nobody brings the rest. A real picnic needed a way to avoid that.',
    ],
    part: ['Designed and built the site: event details, a menu board of dishes to claim, RSVPs and house rules.'],
    dec: [
      [
        'Claim a dish, do not just RSVP',
        'Guests pick a dish from the menu board, so the spread is planned and not left to chance.',
      ],
      [
        'Show progress',
        'A counter shows how many dishes are claimed and how many people have replied, which nudges others to join in.',
      ],
      [
        'Put the rules on the page',
        'A rules page, including "no duplicate popcorn", sets expectations before the day.',
      ],
    ],
    result: ['The site is live and was built for a real picnic at Jabi Lake Park on 12 July 2026.'],
    links: [
      ['Live site', 'https://no-more-popcorm.vercel.app/', 1],
      ['GitHub', 'https://github.com/OlufunbiIK/no-more-popcorm'],
    ],
  },
}

/** Card ids for every case study (the cs_ prefix marks a case-study card). */
export const CASE_IDS = Object.keys(CASE_STUDIES).map((k) => `cs_${k}`)
