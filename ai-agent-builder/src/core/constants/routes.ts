export const ROUTES = {
  home: '/',
  graph: '/graph',
  policies: '/policies',
  sandbox: '/sandbox',
  deployments: '/deployments',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Product snapshot' },
  { label: 'Tool graph', to: ROUTES.graph, description: 'Visual agent flow' },
  { label: 'Policies', to: ROUTES.policies, description: 'Allowlists and guards' },
  { label: 'Sandbox', to: ROUTES.sandbox, description: 'Test runs and traces' },
  { label: 'Deployments', to: ROUTES.deployments, description: 'Versions and reviews' },
  { label: 'Test chat', to: ROUTES.chat, description: 'Try an agent live' },
  { label: 'Agents', to: ROUTES.agents, description: 'Agent catalog' },
  { label: 'Settings', to: ROUTES.settings, description: 'Theme and workspace' },
] as const
