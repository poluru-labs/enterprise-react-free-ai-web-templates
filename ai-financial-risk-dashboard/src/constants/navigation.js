export const APP_NAME = 'RiskPulse';
export const APP_TAGLINE = 'Financial Risk';
export const BASE_PATH = '/risk';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/fraud`, label: 'Fraud' },
  { to: `${BASE_PATH}/credit`, label: 'Credit' },
  { to: `${BASE_PATH}/portfolio`, label: 'Portfolio' },
  { to: `${BASE_PATH}/explain`, label: 'Explain' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'risk',
    label: 'Risk',
    columns: [
      {
        heading: 'Monitor',
        items: [
          { to: `${BASE_PATH}/fraud`, title: 'Fraud', body: 'Alerts, rules, and case queue.' },
          { to: `${BASE_PATH}/credit`, title: 'Credit', body: 'Scores, overrides, and drift.' },
          { to: `${BASE_PATH}/portfolio`, title: 'Portfolio', body: 'Exposure, VaR, and limits.' },
        ],
      },
      {
        heading: 'Trust',
        items: [
          { to: `${BASE_PATH}/explain`, title: 'Explainability', body: 'Reason codes and SHAP packs.' },
          { to: `${BASE_PATH}/settings`, title: 'Settings', body: 'Limits, alerts, and access.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Firm-wide risk snapshot.' },
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
          { to: `${BASE_PATH}/fraud`, title: 'Graph signals', body: 'Linked accounts in one view.' },
          { to: `${BASE_PATH}/credit`, title: 'Champion/challenger', body: 'Shadow score comparison.' },
          { to: `${BASE_PATH}/explain`, title: 'Reason codes', body: 'Reg-ready adverse action text.' },
        ],
      },
      {
        heading: 'Desk',
        items: [
          { to: `${BASE_PATH}/portfolio`, title: 'Limit breaches', body: 'Real-time utilization alerts.' },
          { to: `${BASE_PATH}/fraud`, title: 'Case routing', body: 'Assign by loss and SLA.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Pager rules for Sofia Poluru.' },
        ],
      },
    ],
  },
  {
    id: 'firm',
    label: 'Firm',
    columns: [
      {
        heading: 'Books',
        items: [
          { to: `${BASE_PATH}/overview`, title: 'Retail', body: 'Avery Poluru · cards.' },
          { to: `${BASE_PATH}/portfolio`, title: 'Commercial', body: 'Marcus Poluru · SMB.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/fraud`, title: 'Fraud desk', body: 'Priya Poluru · 24/7.' },
          { to: `${BASE_PATH}/credit`, title: 'Model risk', body: 'Elena Poluru · weekdays.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Firm',
  to: `${BASE_PATH}/overview`,
};
