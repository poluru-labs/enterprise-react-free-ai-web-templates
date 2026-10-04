export const APP_NAME = 'CareLine';
export const APP_TAGLINE = 'Healthcare Ops';
export const BASE_PATH = '/healthcare';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/queues`, label: 'Queues' },
  { to: `${BASE_PATH}/summaries`, label: 'Summaries' },
  { to: `${BASE_PATH}/coding`, label: 'Coding' },
  { to: `${BASE_PATH}/privacy`, label: 'Privacy' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'clinical',
    label: 'Clinical',
    columns: [
      {
        heading: 'Flow',
        items: [
          { to: `${BASE_PATH}/queues`, title: 'Queues', body: 'ED, clinic, and discharge worklists.' },
          { to: `${BASE_PATH}/summaries`, title: 'Summaries', body: 'Visit notes and handoff drafts.' },
          { to: `${BASE_PATH}/coding`, title: 'Coding', body: 'ICD-10 and CPT suggestions.' },
        ],
      },
      {
        heading: 'Trust',
        items: [
          { to: `${BASE_PATH}/privacy`, title: 'Privacy', body: 'Access, export, and break-glass.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Sites, retention, and alerts.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Network-wide health snapshot.' },
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
          { to: `${BASE_PATH}/queues`, title: 'Priority lanes', body: 'Triage by acuity and SLA.' },
          { to: `${BASE_PATH}/summaries`, title: 'Handoff packs', body: 'Structured sign-out in one view.' },
          { to: `${BASE_PATH}/coding`, title: 'Code confidence', body: 'Score every suggested code.' },
        ],
      },
      {
        heading: 'Compliance',
        items: [
          { to: `${BASE_PATH}/privacy`, title: 'Access audit', body: 'Who opened what, when.' },
          { to: `${BASE_PATH}/privacy`, title: 'Break-glass log', body: 'Emergency access with review.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Pager rules for Sofia Poluru.' },
        ],
      },
    ],
  },
  {
    id: 'network',
    label: 'Network',
    columns: [
      {
        heading: 'Sites',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'North campus', body: 'Avery Poluru · 412 beds.' },
          { to: `${BASE_PATH}/queues`, title: 'South clinic', body: 'Priya Poluru · 18 rooms.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/privacy`, title: 'Privacy desk', body: 'Jonah Poluru · 24/7.' },
          { to: `${BASE_PATH}/coding`, title: 'Coding review', body: 'Elena Poluru · weekdays.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Network',
  to: `${BASE_PATH}/overview`,
};
