export const APP_NAME = 'PlanPulse';
export const APP_TAGLINE = 'Forecast Ops';
export const BASE_PATH = '/forecast';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/predictions`, label: 'Predictions' },
  { to: `${BASE_PATH}/scenarios`, label: 'Scenarios' },
  { to: `${BASE_PATH}/confidence`, label: 'Confidence' },
  { to: `${BASE_PATH}/accuracy`, label: 'Accuracy' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'plan',
    label: 'Plan',
    columns: [
      {
        heading: 'Forecast',
        items: [
          { to: `${BASE_PATH}/predictions`, title: 'Predictions', body: 'Horizons, SKUs, and regions.' },
          { to: `${BASE_PATH}/scenarios`, title: 'Scenarios', body: 'Base, upside, and stress.' },
          { to: `${BASE_PATH}/confidence`, title: 'Confidence', body: 'Intervals and bands.' },
        ],
      },
      {
        heading: 'Quality',
        items: [
          { to: `${BASE_PATH}/accuracy`, title: 'Accuracy', body: 'MAPE, bias, and backtests.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Calendars and access.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Planning snapshot.' },
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
          { to: `${BASE_PATH}/scenarios`, title: 'Scenario compare', body: 'Side-by-side demand curves.' },
          { to: `${BASE_PATH}/confidence`, title: 'P80 bands', body: 'Default interval on every SKU.' },
          { to: `${BASE_PATH}/accuracy`, title: 'Rolling backtest', body: '12-week holdout score.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/predictions`, title: 'Override log', body: 'Planner edits with owner.' },
          { to: `${BASE_PATH}/scenarios`, title: 'Publish lock', body: 'Freeze before S&OP.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Alerts for Sofia Poluru.' },
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
          { to: `${BASE_PATH}/overview`, title: 'North region', body: 'Avery Poluru · retail.' },
          { to: `${BASE_PATH}/predictions`, title: 'Supply chain', body: 'Marcus Poluru · DC.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/accuracy`, title: 'Model review', body: 'Elena Poluru · weekly.' },
          { to: `${BASE_PATH}/scenarios`, title: 'S&OP desk', body: 'Priya Poluru · monthly.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Org',
  to: `${BASE_PATH}/overview`,
};
