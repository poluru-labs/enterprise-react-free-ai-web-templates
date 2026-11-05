export const APP_NAME = 'PrivDesk';
export const APP_TAGLINE = 'Privacy Ops';
export const BASE_PATH = '/priv';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/metrics`, label: 'Metrics' },
  { to: `${BASE_PATH}/consent`, label: 'Consent' },
  { to: `${BASE_PATH}/access`, label: 'Access log' },
  { to: `${BASE_PATH}/exports`, label: 'Exports' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'PrivDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Analytics',
        items: [
          { to: `${BASE_PATH}/metrics`, title: 'Aggregates', body: 'K-anonymized KPIs.' },
          { to: `${BASE_PATH}/consent`, title: 'Consent scopes', body: 'Purposes and regions.' },
        ],
      },
      {
        heading: 'Governance',
        items: [
          { to: `${BASE_PATH}/access`, title: 'Access log', body: 'Who queried what.' },
          { to: `${BASE_PATH}/exports`, title: 'Report exports', body: 'Signed bundles.' },
        ],
      },
    ],
  },
];
