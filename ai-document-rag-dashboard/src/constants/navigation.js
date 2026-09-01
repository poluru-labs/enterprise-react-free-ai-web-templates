export const APP_NAME = 'Contextly';
export const APP_TAGLINE = 'Retrieval';
export const BASE_PATH = '/document-rag';
export const SIGNED_IN_USER = {
  name: 'Maya Poluru',
  role: 'Admin',
};

export const NAV_GROUPS = [
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Index health snapshot',
      },
      {
        to: `${BASE_PATH}/knowledge-base`,
        label: 'Knowledge base',
        icon: 'bi-database',
        description: 'Indexed documents',
      },
      {
        to: `${BASE_PATH}/sources`,
        label: 'Sources',
        icon: 'bi-plug',
        description: 'Connectors and crawls',
      },
      {
        to: `${BASE_PATH}/collections`,
        label: 'Collections',
        icon: 'bi-collection',
        description: 'Topic clusters',
      },
    ],
  },
  {
    label: 'Retrieval',
    items: [
      {
        to: `${BASE_PATH}/search`,
        label: 'Search & test',
        icon: 'bi-search',
        description: 'Playground and citations',
      },
      {
        to: `${BASE_PATH}/conversations`,
        label: 'Conversations',
        icon: 'bi-chat-square-text',
        description: 'Live answer review',
      },
      {
        to: `${BASE_PATH}/evaluations`,
        label: 'Evaluations',
        icon: 'bi-clipboard2-check',
        description: 'Faithfulness and drift',
      },
    ],
  },
  {
    label: 'Manage',
    items: [
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-sliders',
        description: 'Models and team access',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Contextly',
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
    id: 'upload-docs',
    label: 'Upload documents',
    hint: 'Add PDFs and direct uploads to the index',
    to: `${BASE_PATH}/knowledge-base?upload=1`,
    group: 'Actions',
  },
];
