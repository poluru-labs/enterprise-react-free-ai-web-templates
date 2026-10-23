export const APP_NAME = 'Rankline';
export const APP_TAGLINE = 'Recommendation Ops';
export const BASE_PATH = '/recommend';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/recommendations`, label: 'Recommendations' },
  { to: `${BASE_PATH}/conversions`, label: 'Conversions' },
  { to: `${BASE_PATH}/experiments`, label: 'Experiments' },
  { to: `${BASE_PATH}/catalog`, label: 'Catalog' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'manage',
    label: 'Manage',
    columns: [
      {
        heading: 'Serving',
        items: [
          {
            to: `${BASE_PATH}/recommendations`,
            title: 'Recommendation slots',
            body: 'Surfaces, models, and rank.',
          },
          {
            to: `${BASE_PATH}/catalog`,
            title: 'Catalog coverage',
            body: 'Departments and thin SKUs.',
          },
          {
            to: `${BASE_PATH}/overview`,
            title: 'Home',
            body: 'Serving snapshot.',
          },
        ],
      },
      {
        heading: 'Outcomes',
        items: [
          {
            to: `${BASE_PATH}/conversions`,
            title: 'Conversions',
            body: 'Assisted orders and revenue.',
          },
          {
            to: `${BASE_PATH}/experiments`,
            title: 'Experiments',
            body: 'Traffic, lift, and guardrails.',
          },
          {
            to: `${BASE_PATH}/settings`,
            title: 'Settings',
            body: 'Windows, floors, and exports.',
          },
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
          {
            to: `${BASE_PATH}/conversions`,
            title: 'Attribution ledger',
            body: 'Credit a slot when an order lands.',
          },
          {
            to: `${BASE_PATH}/experiments`,
            title: 'Guardrail stop',
            body: 'Pause a test that misses the floor.',
          },
          {
            to: `${BASE_PATH}/catalog`,
            title: 'Coverage map',
            body: 'Departments with thin supply.',
          },
        ],
      },
      {
        heading: 'Enhancements',
        items: [
          {
            to: `${BASE_PATH}/recommendations`,
            title: 'Slot compare',
            body: 'Rank models on one surface.',
          },
          {
            to: `${BASE_PATH}/overview`,
            title: 'Holdout snapshot',
            body: 'Lift versus control on home.',
          },
          {
            to: `${BASE_PATH}/settings`,
            title: 'Serving window',
            body: 'Quiet hours for Nina Poluru.',
          },
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
          {
            to: `${BASE_PATH}/recommendations`,
            title: 'Slot desk',
            body: 'Maya Poluru · in-app rank.',
          },
          {
            to: `${BASE_PATH}/catalog`,
            title: 'Assortment',
            body: 'Kavya Poluru · coverage.',
          },
        ],
      },
      {
        heading: 'On-call',
        items: [
          {
            to: `${BASE_PATH}/experiments`,
            title: 'Experiment review',
            body: 'Rahul Poluru · weekday publish.',
          },
          {
            to: `${BASE_PATH}/conversions`,
            title: 'Attribution review',
            body: 'Elena Poluru · Monday close.',
          },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Rankline',
  to: `${BASE_PATH}/overview`,
};
