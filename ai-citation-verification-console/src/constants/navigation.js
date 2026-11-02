export const APP_NAME = 'CiteDesk';
export const APP_TAGLINE = 'Research Ops';
export const BASE_PATH = '/cite';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/citations`, label: 'Bibliography' },
  { to: `${BASE_PATH}/sources`, label: 'Sources' },
  { to: `${BASE_PATH}/queue`, label: 'Queue' },
  { to: `${BASE_PATH}/publishers`, label: 'Publishers' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'CiteDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Verification',
        items: [
          { to: `${BASE_PATH}/citations`, title: 'Bibliography', body: 'Entries and DOI checks.' },
          { to: `${BASE_PATH}/sources`, title: 'Source registry', body: 'Link health and archives.' },
        ],
      },
      {
        heading: 'Ops',
        items: [
          { to: `${BASE_PATH}/queue`, title: 'Verification queue', body: 'Analyst assignments.' },
          { to: `${BASE_PATH}/publishers`, title: 'Publishers', body: 'Metadata and contacts.' },
        ],
      },
    ],
  },
];
