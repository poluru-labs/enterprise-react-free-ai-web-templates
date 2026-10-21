export const APP_NAME = 'PersonaDesk';
export const APP_TAGLINE = 'Personal Ops';
export const BASE_PATH = '/personalize';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/segments`, label: 'Segments' },
  { to: `${BASE_PATH}/journeys`, label: 'Journeys' },
  { to: `${BASE_PATH}/recommendations`, label: 'Recommendations' },
  { to: `${BASE_PATH}/retention`, label: 'Retention' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'manage',
    label: 'Manage',
    columns: [
      {
        heading: 'Audience',
        items: [
          {
            to: `${BASE_PATH}/segments`,
            title: 'User segments',
            body: 'Rules, size, and overlap.',
          },
          {
            to: `${BASE_PATH}/journeys`,
            title: 'Journeys',
            body: 'Steps, triggers, and exits.',
          },
          {
            to: `${BASE_PATH}/overview`,
            title: 'Home',
            body: 'Personalization snapshot.',
          },
        ],
      },
      {
        heading: 'Outcomes',
        items: [
          {
            to: `${BASE_PATH}/recommendations`,
            title: 'Recommendations',
            body: 'Slots, models, and lift.',
          },
          {
            to: `${BASE_PATH}/retention`,
            title: 'Retention',
            body: 'Cohorts and churn risk.',
          },
          {
            to: `${BASE_PATH}/settings`,
            title: 'Settings',
            body: 'Policies and exports.',
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
            to: `${BASE_PATH}/journeys`,
            title: 'Journey simulator',
            body: 'Preview paths before publish.',
          },
          {
            to: `${BASE_PATH}/recommendations`,
            title: 'Slot ranking',
            body: 'Compare models per surface.',
          },
          {
            to: `${BASE_PATH}/retention`,
            title: 'Churn radar',
            body: 'Weekly risk cohort alerts.',
          },
        ],
      },
      {
        heading: 'Enhancements',
        items: [
          {
            to: `${BASE_PATH}/segments`,
            title: 'Segment diff',
            body: 'Side-by-side rule compare.',
          },
          {
            to: `${BASE_PATH}/overview`,
            title: 'Holdout dashboard',
            body: 'Lift vs control in one view.',
          },
          {
            to: `${BASE_PATH}/settings`,
            title: 'Quiet hours',
            body: 'Pause sends for Nina Poluru.',
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
            to: `${BASE_PATH}/segments`,
            title: 'Lifecycle',
            body: 'Kavya Poluru · CRM segments.',
          },
          {
            to: `${BASE_PATH}/recommendations`,
            title: 'Product surfaces',
            body: 'Maya Poluru · in-app slots.',
          },
        ],
      },
      {
        heading: 'On-call',
        items: [
          {
            to: `${BASE_PATH}/journeys`,
            title: 'Journey desk',
            body: 'Rahul Poluru · publish review.',
          },
          {
            to: `${BASE_PATH}/retention`,
            title: 'Retention review',
            body: 'Elena Poluru · monthly QBR.',
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
