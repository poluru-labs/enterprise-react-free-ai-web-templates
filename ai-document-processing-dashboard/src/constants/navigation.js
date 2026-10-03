export const APP_NAME = 'Pagewise';
export const APP_TAGLINE = 'Document Ops';
export const BASE_PATH = '/documents';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/inbox`, label: 'Inbox' },
  { to: `${BASE_PATH}/classify`, label: 'Classify' },
  { to: `${BASE_PATH}/extract`, label: 'Extract' },
  { to: `${BASE_PATH}/validate`, label: 'Validate' },
  { to: `${BASE_PATH}/exceptions`, label: 'Exceptions' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'pipeline',
    label: 'Pipeline',
    columns: [
      {
        heading: 'Capture',
        items: [
          { to: `${BASE_PATH}/inbox`, title: 'Inbox', body: 'Batch ingest and OCR jobs.' },
          { to: `${BASE_PATH}/classify`, title: 'Classify', body: 'Types, scores, and routing.' },
          { to: `${BASE_PATH}/extract`, title: 'Extract', body: 'Fields, tables, and confidence.' },
        ],
      },
      {
        heading: 'Review',
        items: [
          { to: `${BASE_PATH}/validate`, title: 'Validate', body: 'Rules, totals, and SLA.' },
          { to: `${BASE_PATH}/exceptions`, title: 'Exceptions', body: 'Queue, owners, and resolve.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Desk, retention, and alerts.' },
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
          { to: `${BASE_PATH}/inbox`, title: 'Batch ingest', body: 'Drop a folder, keep page order.' },
          { to: `${BASE_PATH}/extract`, title: 'Confidence scoring', body: 'Field-level scores on every pack.' },
          { to: `${BASE_PATH}/classify`, title: 'Duplicate detection', body: 'Hash match before a second pass.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/validate`, title: 'Field rules', body: 'Totals, dates, and required keys.' },
          { to: `${BASE_PATH}/exceptions`, title: 'Reviewer assignment', body: 'Route by type and SLA.' },
          { to: `${BASE_PATH}/overview`, title: 'Export packs', body: 'JSON or CSV from any stage.' },
        ],
      },
    ],
  },
  {
    id: 'workspace',
    label: 'Workspace',
    columns: [
      {
        heading: 'Today',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Pipeline health for the desk.' },
          { to: `${BASE_PATH}/inbox`, title: 'Open inbox', body: 'Jobs waiting for OCR.' },
        ],
      },
      {
        heading: 'Admin',
        items: [
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Workspace and access.' },
          { to: `${BASE_PATH}/exceptions`, title: 'On-call', body: 'Sofia Poluru covers exceptions.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Desk',
  to: `${BASE_PATH}/overview`,
};
