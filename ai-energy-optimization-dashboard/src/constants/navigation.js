export const APP_NAME = 'GridPulse';
export const APP_TAGLINE = 'Energy Ops';
export const BASE_PATH = '/energy';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/usage`, label: 'Usage' },
  { to: `${BASE_PATH}/cooling`, label: 'Cooling' },
  { to: `${BASE_PATH}/carbon`, label: 'Carbon' },
  { to: `${BASE_PATH}/savings`, label: 'Savings' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'optimize',
    label: 'Optimize',
    columns: [
      {
        heading: 'Load',
        items: [
          { to: `${BASE_PATH}/usage`, title: 'Usage', body: 'kWh by site, floor, and rack.' },
          { to: `${BASE_PATH}/cooling`, title: 'Cooling', body: 'CRAC setpoints and delta-T.' },
          { to: `${BASE_PATH}/carbon`, title: 'Carbon', body: 'Scope 2 intensity and offsets.' },
        ],
      },
      {
        heading: 'Finance',
        items: [
          { to: `${BASE_PATH}/savings`, title: 'Savings', body: 'Projects, ROI, and run rate.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Tariffs, alerts, and access.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Portfolio-wide snapshot.' },
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
          { to: `${BASE_PATH}/usage`, title: 'Peak shaving', body: 'Shift load before tariff windows.' },
          { to: `${BASE_PATH}/cooling`, title: 'Free cooling', body: 'Economizer hours by site.' },
          { to: `${BASE_PATH}/carbon`, title: 'Carbon budget', body: 'Monthly cap with alerts.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/savings`, title: 'ROI tracker', body: 'Payback on every project.' },
          { to: `${BASE_PATH}/usage`, title: 'Anomaly feed', body: 'Spikes flagged for review.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Pager rules for Sofia Poluru.' },
        ],
      },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    columns: [
      {
        heading: 'Sites',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'North DC', body: 'Avery Poluru · 12 MW.' },
          { to: `${BASE_PATH}/usage`, title: 'South campus', body: 'Priya Poluru · 4.2 MW.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/cooling`, title: 'Facilities', body: 'Marcus Poluru · 24/7.' },
          { to: `${BASE_PATH}/carbon`, title: 'Sustainability', body: 'Elena Poluru · weekdays.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Portfolio',
  to: `${BASE_PATH}/overview`,
};
