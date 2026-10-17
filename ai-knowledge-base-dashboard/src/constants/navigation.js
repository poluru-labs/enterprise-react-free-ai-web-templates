export const APP_NAME = 'KnowPulse';
export const APP_TAGLINE = 'Knowledge Ops';
export const BASE_PATH = '/kb';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/articles`, label: 'Articles' },
  { to: `${BASE_PATH}/sources`, label: 'Sources' },
  { to: `${BASE_PATH}/citations`, label: 'Citations' },
  { to: `${BASE_PATH}/freshness`, label: 'Freshness' },
  { to: `${BASE_PATH}/gaps`, label: 'Gaps' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'content',
    label: 'Content',
    columns: [
      {
        heading: 'Library',
        items: [
          { to: `${BASE_PATH}/articles`, title: 'Articles', body: 'Published and draft pages.' },
          { to: `${BASE_PATH}/sources`, title: 'Sources', body: 'Docs, wikis, and feeds.' },
          { to: `${BASE_PATH}/citations`, title: 'Citations', body: 'Links back to origin.' },
        ],
      },
      {
        heading: 'Quality',
        items: [
          { to: `${BASE_PATH}/freshness`, title: 'Freshness', body: 'Stale content and owners.' },
          { to: `${BASE_PATH}/gaps`, title: 'Gaps', body: 'Missing topics and intents.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Retention and access.' },
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
          { to: `${BASE_PATH}/citations`, title: 'Inline cite', body: 'Footnotes on every answer.' },
          { to: `${BASE_PATH}/freshness`, title: 'Stale radar', body: '90-day review queue.' },
          { to: `${BASE_PATH}/gaps`, title: 'Gap triage', body: 'Route unanswered queries.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/sources`, title: 'Source sync', body: 'Nightly crawl for Priya Poluru.' },
          { to: `${BASE_PATH}/articles`, title: 'Merge drafts', body: 'Two-author conflict view.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'No publish pings after 6pm.' },
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
          { to: `${BASE_PATH}/overview`, title: 'Product KB', body: 'Leila Poluru · 2.4k articles.' },
          { to: `${BASE_PATH}/sources`, title: 'Support KB', body: 'Marcus Poluru · macros.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/freshness`, title: 'Freshness', body: 'Jonah Poluru · weekly.' },
          { to: `${BASE_PATH}/gaps`, title: 'Gap desk', body: 'Elena Poluru · daily.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Org',
  to: `${BASE_PATH}/overview`,
};
