export const ROUTES = {
  home: '/',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Workload and usage' },
  { label: 'Chat', to: ROUTES.chat, description: 'Conversational AI' },
  { label: 'Agents', to: ROUTES.agents, description: 'Agent catalog' },
  { label: 'Settings', to: ROUTES.settings, description: 'Workspace preferences' },
] as const
