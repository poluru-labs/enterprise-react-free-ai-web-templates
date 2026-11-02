export const APP_NAME = 'ParityDesk';
export const APP_TAGLINE = 'Compliance Ops';
export const BASE_PATH = '/fairness';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/metrics`, label: 'Metrics' },
  { to: `${BASE_PATH}/cohorts`, label: 'Cohorts' },
  { to: `${BASE_PATH}/policies`, label: 'Policies' },
  { to: `${BASE_PATH}/reviews`, label: 'Reviews' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'ParityDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Analysis',
        items: [
          { to: `${BASE_PATH}/metrics`, title: 'Bias metrics', body: 'Disparity bands and trends.' },
          { to: `${BASE_PATH}/cohorts`, title: 'Cohort reviews', body: 'Segments and outcomes.' },
        ],
      },
      {
        heading: 'Governance',
        items: [
          { to: `${BASE_PATH}/policies`, title: 'Policy checks', body: 'Thresholds and sign-off.' },
          { to: `${BASE_PATH}/overview`, title: 'Overview', body: 'Program snapshot.' },
        ],
      },
    ],
  },
];
