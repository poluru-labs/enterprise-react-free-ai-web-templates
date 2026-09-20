export const APP_NAME = 'Agent Studio';
export const APP_TAGLINE = 'Builder';
export const BASE_PATH = '/studio';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home', icon: 'home' },
  { to: `${BASE_PATH}/tools`, label: 'Tools', icon: 'folder' },
  { to: `${BASE_PATH}/workflows`, label: 'Workflows', icon: 'link' },
  { to: `${BASE_PATH}/memory`, label: 'Memory', icon: 'file' },
  { to: `${BASE_PATH}/tests`, label: 'Tests', icon: 'check-circle' },
  { to: `${BASE_PATH}/deployments`, label: 'Deploy', icon: 'upload' },
  { to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'settings' },
];

export const MEGA_MENU = [
  {
    id: 'product',
    label: 'Product',
    columns: [
      {
        heading: 'Build',
        items: [
          { to: `${BASE_PATH}/tools`, title: 'Tools', body: 'Schemas, versions, and connectors.' },
          { to: `${BASE_PATH}/workflows`, title: 'Workflows', body: 'Steps, branches, and retries.' },
          { to: `${BASE_PATH}/memory`, title: 'Memory', body: 'Stores, TTL, and retrieval.' },
        ],
      },
      {
        heading: 'Ship',
        items: [
          { to: `${BASE_PATH}/tests`, title: 'Tests', body: 'Evals, fixtures, and gates.' },
          { to: `${BASE_PATH}/deployments`, title: 'Deployments', body: 'Environments and rollouts.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Workspace and access.' },
        ],
      },
    ],
  },
  {
    id: 'studio',
    label: 'Studio',
    columns: [
      {
        heading: 'Workspace',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'Overview', body: 'Status across the workspace.' },
          { to: `${BASE_PATH}/tools`, title: 'Registry', body: 'Approved tools in one catalog.' },
          { to: `${BASE_PATH}/workflows`, title: 'Canvas', body: 'Compose and version flows.' },
        ],
      },
      {
        heading: 'Release',
        items: [
          { to: `${BASE_PATH}/tests`, title: 'Eval board', body: 'Pass rates and failures.' },
          { to: `${BASE_PATH}/deployments`, title: 'Rollouts', body: 'Canary and production.' },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    columns: [
      {
        heading: 'Guides',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'Getting started', body: 'Create a workspace in minutes.' },
          { to: `${BASE_PATH}/tools`, title: 'Tool spec', body: 'Input, output, and errors.' },
          { to: `${BASE_PATH}/tests`, title: 'Eval cookbook', body: 'Fixtures and scorecards.' },
        ],
      },
      {
        heading: 'Ops',
        items: [
          { to: `${BASE_PATH}/deployments`, title: 'Changelog', body: 'What shipped this week.' },
          { to: `${BASE_PATH}/settings`, title: 'Support', body: 'Reach the studio team.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Studio',
  to: `${BASE_PATH}/overview`,
};
