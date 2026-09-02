export const APP_NAME = 'Prompt Bureau';
export const APP_TAGLINE = 'Prompt control plane';
export const BASE_PATH = '/prompt-management';
export const SIGNED_IN_USER = {
  name: 'Sravani Poluru',
  role: 'Prompt lead',
  email: 'sravani.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Desk',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Health, volume, and editor load',
      },
      {
        to: `${BASE_PATH}/library`,
        label: 'Library',
        icon: 'bi-journal-text',
        description: 'Catalog of live prompts',
      },
      {
        to: `${BASE_PATH}/versions`,
        label: 'Versions',
        icon: 'bi-layers',
        description: 'Family tree and lineage',
      },
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Workspace lookup',
      },
    ],
  },
  {
    label: 'Ship',
    items: [
      {
        to: `${BASE_PATH}/playground`,
        label: 'Playground',
        icon: 'bi-terminal',
        description: 'Draft and ground answers',
      },
      {
        to: `${BASE_PATH}/evaluations`,
        label: 'Evaluations',
        icon: 'bi-clipboard-check',
        description: 'Suites, pass rates, fails',
      },
      {
        to: `${BASE_PATH}/experiments`,
        label: 'Experiments',
        icon: 'bi-bezier2',
        description: 'A/B prompt tests',
      },
      {
        to: `${BASE_PATH}/releases`,
        label: 'Releases',
        icon: 'bi-rocket-takeoff',
        description: 'Draft to publish pipeline',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-sliders',
        description: 'Digest, PIN, and files',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Prompt Bureau',
  to: `${BASE_PATH}/overview`,
};

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: item.description,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'new-prompt',
    label: 'New prompt',
    hint: 'Name, draft, then attach eval cases',
    to: `${BASE_PATH}/library?create=1`,
    group: 'Actions',
  },
];

export const CREATE_STEPS = [
  { label: 'Name', description: 'Title and family' },
  { label: 'Draft', description: 'System prompt' },
  { label: 'Eval', description: 'Attach cases' },
];
