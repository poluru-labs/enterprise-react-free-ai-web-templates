export const APP_NAME = 'LocalePulse';
export const APP_TAGLINE = 'Translation Ops';
export const BASE_PATH = '/translate';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/translations`, label: 'Translations' },
  { to: `${BASE_PATH}/coverage`, label: 'Coverage' },
  { to: `${BASE_PATH}/terminology`, label: 'Terminology' },
  { to: `${BASE_PATH}/reviews`, label: 'Reviews' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'manage',
    label: 'Manage',
    columns: [
      {
        heading: 'Content',
        items: [
          { to: `${BASE_PATH}/translations`, title: 'Translation queue', body: 'Jobs, locales, and status.' },
          { to: `${BASE_PATH}/reviews`, title: 'Reviews', body: 'Linguist sign-off and QA.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Operations snapshot.' },
        ],
      },
      {
        heading: 'Quality',
        items: [
          { to: `${BASE_PATH}/coverage`, title: 'Language coverage', body: 'Locales and completion.' },
          { to: `${BASE_PATH}/terminology`, title: 'Terminology', body: 'Glossary and conflicts.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Floors, MT policy, exports.' },
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
          { to: `${BASE_PATH}/translations`, title: 'Batch publish', body: 'Ship approved strings together.' },
          { to: `${BASE_PATH}/coverage`, title: 'Locale gap map', body: 'See missing languages fast.' },
          { to: `${BASE_PATH}/terminology`, title: 'Term diff', body: 'Compare glossary proposals.' },
        ],
      },
      {
        heading: 'Enhancements',
        items: [
          { to: `${BASE_PATH}/reviews`, title: 'Review routing', body: 'Assign Nina Poluru by locale.' },
          { to: `${BASE_PATH}/overview`, title: 'Throughput chart', body: 'Words per day on home.' },
          { to: `${BASE_PATH}/settings`, title: 'MT guardrails', body: 'Block auto-publish below score.' },
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
          { to: `${BASE_PATH}/translations`, title: 'Production', body: 'Maya Poluru · string desk.' },
          { to: `${BASE_PATH}/reviews`, title: 'Linguistics', body: 'Leela Poluru · review lead.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/terminology`, title: 'Terminology', body: 'Priya Poluru · glossary.' },
          { to: `${BASE_PATH}/coverage`, title: 'Locales', body: 'Kavya Poluru · coverage.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'LocalePulse',
  to: `${BASE_PATH}/overview`,
};
