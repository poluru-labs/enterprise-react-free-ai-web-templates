export const APP_NAME = 'MaintDesk';
export const APP_TAGLINE = 'Maintainer Ops';
export const BASE_PATH = '/maint';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/issues`, label: 'Issues' },
  { to: `${BASE_PATH}/releases`, label: 'Releases' },
  { to: `${BASE_PATH}/contributors`, label: 'Contributors' },
  { to: `${BASE_PATH}/packages`, label: 'Packages' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'MaintDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Triage',
        items: [
          { to: `${BASE_PATH}/issues`, title: 'Issues', body: 'Bugs and requests.' },
          { to: `${BASE_PATH}/releases`, title: 'Releases', body: 'Tags and notes.' },
        ],
      },
      {
        heading: 'Community',
        items: [
          { to: `${BASE_PATH}/contributors`, title: 'Contributors', body: 'Review and thanks.' },
          { to: `${BASE_PATH}/packages`, title: 'Packages', body: 'Health and downloads.' },
        ],
      },
    ],
  },
];
