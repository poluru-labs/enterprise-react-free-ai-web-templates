export const APP_NAME = 'ReviewLoop';
export const APP_TAGLINE = 'HITL Ops';
export const BASE_PATH = '/hitl';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/annotation`, label: 'Annotation' },
  { to: `${BASE_PATH}/consensus`, label: 'Consensus' },
  { to: `${BASE_PATH}/calibration`, label: 'Calibration' },
  { to: `${BASE_PATH}/tasks`, label: 'Tasks' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Labeling',
        items: [
          { to: `${BASE_PATH}/annotation`, title: 'Annotation', body: 'Queues, rubrics, and spans.' },
          { to: `${BASE_PATH}/consensus`, title: 'Consensus', body: 'Reviewer agreement and tie-breaks.' },
          { to: `${BASE_PATH}/calibration`, title: 'Calibration', body: 'Gold sets and drift checks.' },
        ],
      },
      {
        heading: 'Ops',
        items: [
          { to: `${BASE_PATH}/tasks`, title: 'Tasks', body: 'Assignments and SLAs.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Projects and access.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Program snapshot.' },
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
          { to: `${BASE_PATH}/consensus`, title: 'Majority vote', body: 'Auto-resolve when three agree.' },
          { to: `${BASE_PATH}/calibration`, title: 'Weekly gold', body: 'Fresh calibration pack every Monday.' },
          { to: `${BASE_PATH}/annotation`, title: 'Span shortcuts', body: 'Keyboard labels for entities.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/tasks`, title: 'Batch assign', body: 'Round-robin by Nina Poluru.' },
          { to: `${BASE_PATH}/consensus`, title: 'Tie-break queue', body: 'Lead reviewer on disputes.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'No pings after 6pm local.' },
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
          { to: `${BASE_PATH}/overview`, title: 'Vision lane', body: 'Priya Poluru · bounding boxes.' },
          { to: `${BASE_PATH}/annotation`, title: 'Text lane', body: 'Marcus Poluru · NER.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/calibration`, title: 'Calibration', body: 'Jonah Poluru · weekly.' },
          { to: `${BASE_PATH}/consensus`, title: 'Quality', body: 'Elena Poluru · disputes.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Org',
  to: `${BASE_PATH}/overview`,
};
