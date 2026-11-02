export const APP_NAME = 'LearnDesk';
export const APP_TAGLINE = 'Education Ops';
export const BASE_PATH = '/learn';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/learners`, label: 'Learners' },
  { to: `${BASE_PATH}/modules`, label: 'Modules' },
  { to: `${BASE_PATH}/accommodations`, label: 'Accommodations' },
  { to: `${BASE_PATH}/support`, label: 'Support' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'LearnDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Learning',
        items: [
          { to: `${BASE_PATH}/learners`, title: 'Learner roster', body: 'Progress and plans.' },
          { to: `${BASE_PATH}/modules`, title: 'Content modules', body: 'Paths and completion.' },
        ],
      },
      {
        heading: 'Support',
        items: [
          { to: `${BASE_PATH}/accommodations`, title: 'Accommodations', body: 'IEP-style requests.' },
          { to: `${BASE_PATH}/support`, title: 'Support desk', body: 'Tickets and owners.' },
        ],
      },
    ],
  },
];
