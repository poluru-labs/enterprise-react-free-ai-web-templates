export const ROUTES = {
  home: '/',
  diffs: '/diffs',
  heuristics: '/heuristics',
  patches: '/patches',
  triage: '/triage',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Product snapshot' },
  { label: 'Diff review', to: ROUTES.diffs, description: 'Line comments on a PR' },
  { label: 'Heuristics', to: ROUTES.heuristics, description: 'Security and smell scan' },
  { label: 'Suggested patches', to: ROUTES.patches, description: 'Proposed fixes' },
  { label: 'Triage', to: ROUTES.triage, description: 'Findings by severity' },
  { label: 'Review chat', to: ROUTES.chat, description: 'Ask about a change' },
  { label: 'Review bots', to: ROUTES.agents, description: 'Specialized agents' },
  { label: 'Settings', to: ROUTES.settings, description: 'Theme and workspace' },
] as const
