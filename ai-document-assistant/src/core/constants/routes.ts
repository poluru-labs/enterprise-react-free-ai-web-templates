export const ROUTES = {
  home: '/',
  documents: '/documents',
  templates: '/templates',
  reviews: '/reviews',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Document program KPIs' },
  { label: 'Documents', to: ROUTES.documents, description: 'Workspace library' },
  { label: 'Templates', to: ROUTES.templates, description: 'Reusable starters' },
  { label: 'Reviews', to: ROUTES.reviews, description: 'Approval queue' },
  { label: 'Assistant', to: ROUTES.chat, description: 'Ask about your docs' },
  { label: 'Playbooks', to: ROUTES.agents, description: 'Drafting workflows' },
  { label: 'Settings', to: ROUTES.settings, description: 'Workspace preferences' },
] as const
