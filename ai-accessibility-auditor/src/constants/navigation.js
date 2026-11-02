export const APP_NAME = 'AuditDesk';
export const APP_TAGLINE = 'Conformance Ops';
export const BASE_PATH = '/audit';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/audits`, label: 'Audits' },
  { to: `${BASE_PATH}/findings`, label: 'Findings' },
  { to: `${BASE_PATH}/reports`, label: 'Reports' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'AuditDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Scans',
        items: [
          { to: `${BASE_PATH}/audits`, title: 'Audit runs', body: 'Schedules and WCAG profiles.' },
          { to: `${BASE_PATH}/findings`, title: 'Findings queue', body: 'Severity and assignees.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'Overview', body: 'Compliance snapshot.' },
          { to: `${BASE_PATH}/reports`, title: 'Reports', body: 'Exports for Nina Poluru.' },
        ],
      },
    ],
  },
];
