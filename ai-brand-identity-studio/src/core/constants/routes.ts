export const ROUTES = {
  home: '/',
  voice: '/voice',
  naming: '/naming',
  palettes: '/palettes',
  compliance: '/compliance',
  chat: '/chat',
  agents: '/agents',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS = [
  { label: 'Overview', to: ROUTES.home, description: 'Product snapshot' },
  { label: 'Voice', to: ROUTES.voice, description: 'Guidelines and copy check' },
  { label: 'Naming', to: ROUTES.naming, description: 'Candidate explorations' },
  { label: 'Palettes', to: ROUTES.palettes, description: 'Lockups and contrast' },
  { label: 'Compliance', to: ROUTES.compliance, description: 'Asset checks' },
  { label: 'Brand chat', to: ROUTES.chat, description: 'Ask the brand assistant' },
  { label: 'Brand agents', to: ROUTES.agents, description: 'Specialized agents' },
  { label: 'Settings', to: ROUTES.settings, description: 'Theme and workspace' },
] as const
