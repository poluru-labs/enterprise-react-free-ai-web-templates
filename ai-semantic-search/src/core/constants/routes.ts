export const ROUTES = {
  home: '/',
  queries: '/queries',
  indexes: '/indexes',
  rankings: '/rankings',
  evaluations: '/evaluations',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Search program KPIs' },
  { label: 'Queries', to: ROUTES.queries, description: 'Query log' },
  { label: 'Indexes', to: ROUTES.indexes, description: 'Vector indexes' },
  { label: 'Rankings', to: ROUTES.rankings, description: 'nDCG / MRR' },
  { label: 'Evaluations', to: ROUTES.evaluations, description: 'Human ratings' },
  { label: 'Assistant', to: ROUTES.chat, description: 'Debug search' },
  { label: 'Playbooks', to: ROUTES.agents, description: 'Tuning workflows' },
  { label: 'Settings', to: ROUTES.settings, description: 'Preferences' },
] as const
