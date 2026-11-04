export const APP_NAME = 'ReliefDesk';
export const APP_TAGLINE = 'Emergency Logistics';
export const BASE_PATH = '/relief';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/inventory`, label: 'Inventory' },
  { to: `${BASE_PATH}/deployments`, label: 'Deployments' },
  { to: `${BASE_PATH}/requests`, label: 'Requests' },
  { to: `${BASE_PATH}/regions`, label: 'Regions' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'ReliefDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Supply',
        items: [
          { to: `${BASE_PATH}/inventory`, title: 'Inventory', body: 'Stock and warehouses.' },
          { to: `${BASE_PATH}/deployments`, title: 'Deployments', body: 'Convoys and staging.' },
        ],
      },
      {
        heading: 'Field',
        items: [
          { to: `${BASE_PATH}/requests`, title: 'Requests', body: 'Site needs and priority.' },
          { to: `${BASE_PATH}/regions`, title: 'Regions', body: 'Status by area.' },
        ],
      },
    ],
  },
];
