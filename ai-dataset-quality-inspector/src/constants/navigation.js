export const APP_NAME = 'QualDesk';
export const APP_TAGLINE = 'Quality Ops';
export const BASE_PATH = '/qual';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/schemas`, label: 'Schemas' },
  { to: `${BASE_PATH}/anomalies`, label: 'Anomalies' },
  { to: `${BASE_PATH}/rules`, label: 'Rules' },
  { to: `${BASE_PATH}/releases`, label: 'Releases' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'QualDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Validation',
        items: [
          { to: `${BASE_PATH}/schemas`, title: 'Schema checks', body: 'Columns and types.' },
          { to: `${BASE_PATH}/anomalies`, title: 'Anomaly counts', body: 'Spikes and drift.' },
        ],
      },
      {
        heading: 'Release',
        items: [
          { to: `${BASE_PATH}/rules`, title: 'Rule catalog', body: 'Thresholds and owners.' },
          { to: `${BASE_PATH}/releases`, title: 'Readiness', body: 'Scores and sign-off.' },
        ],
      },
    ],
  },
];
