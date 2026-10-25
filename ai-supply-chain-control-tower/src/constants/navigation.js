export const APP_NAME = 'ChainPulse';
export const APP_TAGLINE = 'Supply Ops';
export const BASE_PATH = '/tower';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/demand`, label: 'Demand' },
  { to: `${BASE_PATH}/shipments`, label: 'Shipments' },
  { to: `${BASE_PATH}/suppliers`, label: 'Suppliers' },
  { to: `${BASE_PATH}/inventory`, label: 'Inventory' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'manage',
    label: 'Manage',
    columns: [
      {
        heading: 'Network',
        items: [
          { to: `${BASE_PATH}/demand`, title: 'Demand plan', body: 'Forecasts and spikes.' },
          { to: `${BASE_PATH}/shipments`, title: 'Shipments', body: 'Lanes, ETAs, and exceptions.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Control tower snapshot.' },
        ],
      },
      {
        heading: 'Risk & stock',
        items: [
          { to: `${BASE_PATH}/suppliers`, title: 'Supplier risk', body: 'Scores and mitigations.' },
          { to: `${BASE_PATH}/inventory`, title: 'Inventory', body: 'On-hand and coverage.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Floors, alerts, exports.' },
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
          { to: `${BASE_PATH}/shipments`, title: 'Lane tracker', body: 'Follow containers in transit.' },
          { to: `${BASE_PATH}/demand`, title: 'Spike alerts', body: 'Catch demand surges early.' },
          { to: `${BASE_PATH}/inventory`, title: 'Coverage map', body: 'SKU health by region.' },
        ],
      },
      {
        heading: 'Enhancements',
        items: [
          { to: `${BASE_PATH}/suppliers`, title: 'Risk compare', body: 'Vendors side by side.' },
          { to: `${BASE_PATH}/overview`, title: 'Network heatmap', body: 'Lane density on home.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Pause alerts for Nina Poluru.' },
        ],
      },
    ],
  },
  {
    id: 'org',
    label: 'Org',
    columns: [
      {
        heading: 'Desks',
        items: [
          { to: `${BASE_PATH}/demand`, title: 'Planning', body: 'Avery Poluru · forecasts.' },
          { to: `${BASE_PATH}/shipments`, title: 'Logistics', body: 'Rahul Poluru · lanes.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/suppliers`, title: 'Vendor desk', body: 'Jonah Poluru · risk review.' },
          { to: `${BASE_PATH}/inventory`, title: 'Stock desk', body: 'Elena Poluru · coverage.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'ChainPulse',
  to: `${BASE_PATH}/overview`,
};
