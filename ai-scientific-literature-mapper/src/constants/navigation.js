export const APP_NAME = 'LitDesk';
export const APP_TAGLINE = 'Library ops';
export const BASE_PATH = '/lit';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/corpus`, label: 'Corpus' },
  { to: `${BASE_PATH}/clusters`, label: 'Clusters' },
  { to: `${BASE_PATH}/citations`, label: 'Citations' },
  { to: `${BASE_PATH}/curation`, label: 'Curation' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'LitDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Map',
        items: [
          { to: `${BASE_PATH}/corpus`, title: 'Corpus', body: 'Indexed papers.' },
          { to: `${BASE_PATH}/clusters`, title: 'Topic clusters', body: 'Thematic groups.' },
        ],
      },
      {
        heading: 'Curate',
        items: [
          { to: `${BASE_PATH}/citations`, title: 'Citation links', body: 'Cross references.' },
          { to: `${BASE_PATH}/curation`, title: 'Curation queue', body: 'Review tasks.' },
        ],
      },
    ],
  },
];
