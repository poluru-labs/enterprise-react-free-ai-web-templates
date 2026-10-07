export const APP_NAME = 'VariantLab';
export const APP_TAGLINE = 'Experiment Ops';
export const BASE_PATH = '/lab';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/variants`, label: 'Variants' },
  { to: `${BASE_PATH}/experiments`, label: 'Experiments' },
  { to: `${BASE_PATH}/metrics`, label: 'Metrics' },
  { to: `${BASE_PATH}/rollouts`, label: 'Rollouts' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'platform',
    label: 'Platform',
    columns: [
      {
        heading: 'Build',
        items: [
          { to: `${BASE_PATH}/variants`, title: 'Variants', body: 'Model versions and configs.' },
          { to: `${BASE_PATH}/experiments`, title: 'Experiments', body: 'Arms, traffic, and duration.' },
          { to: `${BASE_PATH}/metrics`, title: 'Metrics', body: 'Primary and guardrail KPIs.' },
        ],
      },
      {
        heading: 'Ship',
        items: [
          { to: `${BASE_PATH}/rollouts`, title: 'Rollouts', body: 'Gates, canary, and promote.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Workspace and access.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Program-wide snapshot.' },
        ],
      },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    columns: [
      {
        heading: 'New',
        items: [
          { to: `${BASE_PATH}/experiments`, title: 'Multi-arm tests', body: 'More than two variants in one run.' },
          { to: `${BASE_PATH}/metrics`, title: 'Guardrail alerts', body: 'Stop on regression automatically.' },
          { to: `${BASE_PATH}/rollouts`, title: 'Gate templates', body: 'Reusable promote checklists.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/variants`, title: 'Variant diff', body: 'Compare configs side by side.' },
          { to: `${BASE_PATH}/metrics`, title: 'CUPED', body: 'Variance reduction on metrics.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Pager rules for Sofia Poluru.' },
        ],
      },
    ],
  },
  {
    id: 'program',
    label: 'Program',
    columns: [
      {
        heading: 'Teams',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'Search team', body: 'Avery Poluru · ranking.' },
          { to: `${BASE_PATH}/experiments`, title: 'Checkout team', body: 'Priya Poluru · conversion.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/rollouts`, title: 'Release', body: 'Sofia Poluru · promote.' },
          { to: `${BASE_PATH}/metrics`, title: 'Analysis', body: 'Jonah Poluru · stats review.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Program',
  to: `${BASE_PATH}/overview`,
};
