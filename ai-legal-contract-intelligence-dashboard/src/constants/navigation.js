export const APP_NAME = 'ContractPulse';
export const APP_TAGLINE = 'Legal Ops';
export const BASE_PATH = '/legal';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/clauses`, label: 'Clauses' },
  { to: `${BASE_PATH}/obligations`, label: 'Obligations' },
  { to: `${BASE_PATH}/reviews`, label: 'Reviews' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'contracts',
    label: 'Contracts',
    columns: [
      {
        heading: 'Extract',
        items: [
          { to: `${BASE_PATH}/clauses`, title: 'Clauses', body: 'Indemnity, term, and renewal.' },
          { to: `${BASE_PATH}/obligations`, title: 'Obligations', body: 'Dates, owners, and renewals.' },
          { to: `${BASE_PATH}/reviews`, title: 'Reviews', body: 'Redlines and sign-off.' },
        ],
      },
      {
        heading: 'Program',
        items: [
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Playbooks and access.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Portfolio snapshot.' },
          { to: `${BASE_PATH}/clauses`, title: 'Clause library', body: 'Approved fallback language.' },
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
          { to: `${BASE_PATH}/clauses`, title: 'Clause diff', body: 'Compare to playbook baseline.' },
          { to: `${BASE_PATH}/obligations`, title: 'Renewal radar', body: '90-day obligation alerts.' },
          { to: `${BASE_PATH}/reviews`, title: 'Review pack', body: 'PDF bundle for counsel.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/reviews`, title: 'Sign-off queue', body: 'Pending Adira Poluru.' },
          { to: `${BASE_PATH}/obligations`, title: 'SLA tracker', body: 'Notice periods and filings.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'No pings after 6pm.' },
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
          { to: `${BASE_PATH}/overview`, title: 'Commercial', body: 'Adira Poluru · MSAs.' },
          { to: `${BASE_PATH}/clauses`, title: 'Vendor', body: 'Marcus Poluru · SOWs.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/reviews`, title: 'Review desk', body: 'Elena Poluru · daily.' },
          { to: `${BASE_PATH}/obligations`, title: 'Obligations', body: 'Jonah Poluru · weekly.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Org',
  to: `${BASE_PATH}/overview`,
};
