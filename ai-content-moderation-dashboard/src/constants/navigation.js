export const APP_NAME = 'ReviewBay';
export const APP_TAGLINE = 'Content Safety';
export const BASE_PATH = '/content-moderation';
export const SIGNED_IN_USER = {
  name: 'Nia Poluru',
  role: 'Trust & safety lead',
};

export const NAV_GROUPS = [
  {
    label: 'Review',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Queue health snapshot',
      },
      {
        to: `${BASE_PATH}/queue`,
        label: 'Queue',
        icon: 'bi-inbox',
        description: 'Items waiting on humans',
      },
      {
        to: `${BASE_PATH}/reviews`,
        label: 'Reviews',
        icon: 'bi-clipboard-check',
        description: 'Completed decisions',
      },
      {
        to: `${BASE_PATH}/appeals`,
        label: 'Appeals',
        icon: 'bi-arrow-counterclockwise',
        description: 'Requester challenges',
      },
    ],
  },
  {
    label: 'Safety',
    items: [
      {
        to: `${BASE_PATH}/policies`,
        label: 'Policies',
        icon: 'bi-shield-check',
        description: 'Enforcement modes',
      },
      {
        to: `${BASE_PATH}/automation`,
        label: 'Automation',
        icon: 'bi-cpu',
        description: 'Rules and classifiers',
      },
      {
        to: `${BASE_PATH}/reporters`,
        label: 'Reporters',
        icon: 'bi-flag',
        description: 'Trusted flaggers',
      },
      {
        to: `${BASE_PATH}/analytics`,
        label: 'Analytics',
        icon: 'bi-graph-up',
        description: 'Throughput and agreement',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Find cases and rules',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'On-call and channels',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Content moderation',
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
    id: 'assign-next',
    label: 'Assign next',
    hint: 'Claim the oldest unassigned queue item',
    to: `${BASE_PATH}/queue?assign=next`,
    group: 'Actions',
  },
];
