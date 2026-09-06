export const APP_NAME = 'Charter';
export const APP_TAGLINE = 'Governance';
export const BASE_PATH = '/governance';
export const SIGNED_IN_USER = {
  name: 'Kavya Poluru',
  role: 'Chief compliance officer',
  email: 'kavya.poluru@polurulabs.example',
};

export const NAV_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'bi-grid' },
  { to: `${BASE_PATH}/inventory`, label: 'Inventory', icon: 'bi-collection' },
  { to: `${BASE_PATH}/risk`, label: 'Risk', icon: 'bi-shield-exclamation' },
  { to: `${BASE_PATH}/policies`, label: 'Policies', icon: 'bi-journal-text' },
  { to: `${BASE_PATH}/approvals`, label: 'Approvals', icon: 'bi-check2-square' },
  { to: `${BASE_PATH}/audits`, label: 'Audits', icon: 'bi-clipboard-check' },
  { to: `${BASE_PATH}/exceptions`, label: 'Exceptions', icon: 'bi-exclamation-diamond' },
  { to: `${BASE_PATH}/controls`, label: 'Controls', icon: 'bi-sliders' },
  { to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'bi-gear' },
];

export const BREADCRUMB_ROOT = {
  label: 'Charter',
  to: `${BASE_PATH}/overview`,
};

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: `Open ${item.label.toLowerCase()}`,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'submit-approval',
    label: 'Submit for approval',
    hint: 'Start a model change request',
    to: `${BASE_PATH}/approvals?submit=1`,
    group: 'Actions',
  },
  {
    id: 'new-exception',
    label: 'Request exception',
    hint: 'File a time-boxed policy waiver',
    to: `${BASE_PATH}/exceptions?new=1`,
    group: 'Actions',
  },
  {
    id: 'aurora',
    label: 'Aurora Chat',
    hint: 'Open the production chat system',
    to: `${BASE_PATH}/inventory/aurora`,
    group: 'Inventory',
  },
  {
    id: 'quill',
    label: 'Quill Copilot',
    hint: 'High-risk coding assistant',
    to: `${BASE_PATH}/inventory/quill`,
    group: 'Inventory',
  },
];

export const APPROVAL_STEPS = [
  { label: 'Request', description: 'Name the change' },
  { label: 'Evidence', description: 'Attach review pack' },
  { label: 'Sign-off', description: 'Owner confirms' },
];
