// The tools shown on the home-screen / greenhouse shelf, with the projects built with each.
export const STACK: Record<string, [string, string, [string, string], string[]]> = {
  react: ['React', 'Re', ['#38BDF8', '#0C4A6E'], ['portal', 'life', 'general', 'money', 'quiz', 'food']],
  nextjs: [
    'Next.js',
    'Nx',
    ['#52525B', '#09090B'],
    ['portal', 'life', 'general', 'stellarts', 'xconfess', 'inno', 'meal'],
  ],
  ts: ['TypeScript', 'TS', ['#3B82F6', '#1E3A8A'], ['portal', 'life', 'general', 'xconfess', 'sentinel']],
  tw: ['Tailwind CSS', 'Tw', ['#2DD4BF', '#115E59'], ['portal', 'life', 'money', 'quiz', 'food', 'inno', 'meal']],
  nest: ['NestJS', 'Ne', ['#F43F5E', '#7F1D1D'], ['manta', 'sentinel', 'xconfess']],
  node: ['Node.js', 'No', ['#4ADE80', '#14532D'], ['money', 'manta', 'sentinel', 'xconfess']],
  pg: ['PostgreSQL', 'Pg', ['#60A5FA', '#1E3A5F'], ['sentinel']],
  mongo: ['MongoDB', 'Mo', ['#34D399', '#064E3B'], ['manta']],
  fb: ['Firebase', 'Fb', ['#FBBF24', '#92400E'], ['money', 'quiz']],
  stellar: ['Stellar and Soroban', 'St', ['#818CF8', '#312E81'], ['stellarts', 'maint', 'xconfess', 'sentinel']],
  pay: ['Paystack', 'Ps', ['#22D3EE', '#164E63'], ['portal']],
  ci: ['CI and tests', 'CI', ['#FB923C', '#7C2D12'], ['portal', 'stellarts', 'sentinel', 'xconfess']],
  gh: ['GitHub', 'Gh', ['#A1A1AA', '#18181B'], ['stellarts', 'sentinel', 'xconfess', 'maint', 'stark', 'ecom']],
  vc: [
    'Vercel',
    'Vc',
    ['#E4E4E7', '#27272A'],
    ['money', 'quiz', 'food', 'inno', 'meal', 'wedding', 'shower', 'bday', 'popcorn', 'xconfess', 'maint'],
  ],
}
