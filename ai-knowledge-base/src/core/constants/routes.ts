export const ROUTES = {
  home: '/',
  articles: '/articles',
  categories: '/categories',
  maintenance: '/maintenance',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Knowledge program KPIs' },
  { label: 'Articles', to: ROUTES.articles, description: 'Help center library' },
  { label: 'Categories', to: ROUTES.categories, description: 'Taxonomy map' },
  { label: 'Maintenance', to: ROUTES.maintenance, description: 'Refresh queue' },
  { label: 'Assistant', to: ROUTES.chat, description: 'Ask the knowledge base' },
  { label: 'Playbooks', to: ROUTES.agents, description: 'Authoring workflows' },
  { label: 'Settings', to: ROUTES.settings, description: 'Workspace preferences' },
] as const
