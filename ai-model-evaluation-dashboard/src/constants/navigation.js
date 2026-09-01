export const APP_NAME = 'Prism Eval';
export const APP_TAGLINE = 'Model evaluation';
export const BASE_PATH = '/model-eval';
export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Evaluation lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Scoring',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Pass rate and live jobs',
      },
      {
        to: `${BASE_PATH}/leaderboard`,
        label: 'Leaderboard',
        icon: 'bi-trophy',
        description: 'Ranked model index',
      },
      {
        to: `${BASE_PATH}/suites`,
        label: 'Suites',
        icon: 'bi-collection',
        description: 'Gold packs and gates',
      },
      {
        to: `${BASE_PATH}/runs`,
        label: 'Runs',
        icon: 'bi-play-circle',
        description: 'Eval jobs and scorecards',
      },
    ],
  },
  {
    label: 'Judges',
    items: [
      {
        to: `${BASE_PATH}/compare`,
        label: 'Compare',
        icon: 'bi-columns-gap',
        description: 'Side-by-side deltas',
      },
      {
        to: `${BASE_PATH}/review`,
        label: 'Review',
        icon: 'bi-clipboard-check',
        description: 'Human sample queue',
      },
      {
        to: `${BASE_PATH}/datasets`,
        label: 'Datasets',
        icon: 'bi-database',
        description: 'Gold packs and owners',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Webhooks and thresholds',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Model evaluation',
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
    id: 'lens-invoice',
    label: 'lens-invoice-31',
    hint: 'Needs review · Madhav Poluru',
    to: `${BASE_PATH}/runs/ev_1840`,
    group: 'Runs',
  },
  {
    id: 'safety-suite',
    label: 'Customer reply safety',
    hint: 'Live suite · Meera Poluru',
    to: `${BASE_PATH}/suites/s_safety`,
    group: 'Suites',
  },
  {
    id: 'queue-eval',
    label: 'Run evaluation',
    hint: 'Queue a suite, model, and judge',
    to: `${BASE_PATH}/runs?queue=1`,
    group: 'Actions',
  },
];
