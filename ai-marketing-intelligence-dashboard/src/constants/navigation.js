export const APP_NAME = 'MarkSight';
export const APP_TAGLINE = 'Intel Desk';
export const BASE_PATH = '/marketing';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/campaigns`, label: 'Campaigns' },
  { to: `${BASE_PATH}/audiences`, label: 'Audiences' },
  { to: `${BASE_PATH}/attribution`, label: 'Attribution' },
  { to: `${BASE_PATH}/content`, label: 'Content' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'analyze',
    label: 'Analyze',
    columns: [
      {
        heading: 'Performance',
        items: [
          {
            to: `${BASE_PATH}/campaigns`,
            title: 'Campaigns',
            body: 'Spend, ROAS, and channel mix.',
          },
          {
            to: `${BASE_PATH}/attribution`,
            title: 'Attribution',
            body: 'Touch paths and credit rules.',
          },
          {
            to: `${BASE_PATH}/overview`,
            title: 'Home',
            body: 'Weekly growth snapshot.',
          },
        ],
      },
      {
        heading: 'Audiences',
        items: [
          {
            to: `${BASE_PATH}/audiences`,
            title: 'Segments',
            body: 'Reach, lift, and overlap.',
          },
          {
            to: `${BASE_PATH}/content`,
            title: 'Generated content',
            body: 'Variants ready for review.',
          },
          {
            to: `${BASE_PATH}/settings`,
            title: 'Settings',
            body: 'Brand rules and exports.',
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
            to: `${BASE_PATH}/attribution`,
            title: 'Multi-touch compare',
            body: 'Side-by-side credit models.',
          },
          {
            to: `${BASE_PATH}/audiences`,
            title: 'Lookalike refresh',
            body: 'Weekly seed sync for paid.',
          },
          {
            to: `${BASE_PATH}/content`,
            title: 'Variant scoring',
            body: 'Rank copy by predicted CTR.',
          },
        ],
      },
      {
        heading: 'Enhancements',
        items: [
          {
            to: `${BASE_PATH}/campaigns`,
            title: 'Budget pacing',
            body: 'Alerts when spend drifts.',
          },
          {
            to: `${BASE_PATH}/overview`,
            title: 'Executive digest',
            body: 'Friday PDF for Elena Poluru.',
          },
          {
            to: `${BASE_PATH}/settings`,
            title: 'UTM guardrails',
            body: 'Block launches with bad tags.',
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
        heading: 'Teams',
        items: [
          {
            to: `${BASE_PATH}/campaigns`,
            title: 'Paid media',
            body: 'Maya Poluru · search & social.',
          },
          {
            to: `${BASE_PATH}/audiences`,
            title: 'Lifecycle',
            body: 'Kavya Poluru · email & CRM.',
          },
        ],
      },
      {
        heading: 'On-call',
        items: [
          {
            to: `${BASE_PATH}/attribution`,
            title: 'Attribution desk',
            body: 'Rahul Poluru · weekly review.',
          },
          {
            to: `${BASE_PATH}/content`,
            title: 'Creative QA',
            body: 'Priya Poluru · brand sign-off.',
          },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Org',
  to: `${BASE_PATH}/overview`,
};
