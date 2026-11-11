export const ROUTES = {
  home: '/',
  recommend: '/recommend',
  annotations: '/annotations',
  palettes: '/palettes',
  exports: '/exports',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Product snapshot' },
  { label: 'Recommender', to: ROUTES.recommend, description: 'Pick the right chart' },
  { label: 'Annotations', to: ROUTES.annotations, description: 'Callouts and notes' },
  { label: 'Palettes', to: ROUTES.palettes, description: 'Accessible color sets' },
  { label: 'Exports', to: ROUTES.exports, description: 'Presets per destination' },
  { label: 'Chart chat', to: ROUTES.chat, description: 'Ask the chart assistant' },
  { label: 'Viz agents', to: ROUTES.agents, description: 'Specialized agents' },
  { label: 'Settings', to: ROUTES.settings, description: 'Theme and workspace' },
] as const
