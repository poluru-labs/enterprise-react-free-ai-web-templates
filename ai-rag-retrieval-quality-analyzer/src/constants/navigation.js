export const APP_NAME = 'RqDesk';
export const APP_TAGLINE = 'Retrieval quality';
export const BASE_PATH = '/rq';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/queries`, label: 'Query log' },
  { to: `${BASE_PATH}/kpis`, label: 'KPIs' },
  { to: `${BASE_PATH}/corpus`, label: 'Corpus' },
  { to: `${BASE_PATH}/reviews`, label: 'Review queue' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'RqDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Signals',
        items: [
          { to: `${BASE_PATH}/queries`, title: 'Query log', body: 'Sessions and latency.' },
          { to: `${BASE_PATH}/kpis`, title: 'KPI board', body: 'Precision and recall style.' },
        ],
      },
      {
        heading: 'Coverage',
        items: [
          { to: `${BASE_PATH}/corpus`, title: 'Corpus map', body: 'Indexed sources.' },
          { to: `${BASE_PATH}/reviews`, title: 'Review queue', body: 'Human spot checks.' },
        ],
      },
    ],
  },
];
