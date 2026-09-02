export const APP_NAME = 'Nexus';
export const APP_TAGLINE = 'SaaS control plane';
export const BASE_PATH = '/saas-admin';
export const SIGNED_IN_USER = {
  name: 'Lakshmi Poluru',
  role: 'Platform admin',
  email: 'lakshmi.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Platform',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'MRR, seats, and health',
      },
      {
        to: `${BASE_PATH}/tenants`,
        label: 'Tenants',
        icon: 'bi-building',
        description: 'Workspaces and plans',
      },
      {
        to: `${BASE_PATH}/users`,
        label: 'Users',
        icon: 'bi-people',
        description: 'Seats and invites',
      },
      {
        to: `${BASE_PATH}/plans`,
        label: 'Plans',
        icon: 'bi-layers',
        description: 'Starter through Enterprise',
      },
    ],
  },
  {
    label: 'Commercial',
    items: [
      {
        to: `${BASE_PATH}/usage`,
        label: 'Usage',
        icon: 'bi-graph-up',
        description: 'Tokens and API volume',
      },
      {
        to: `${BASE_PATH}/billing`,
        label: 'Billing',
        icon: 'bi-receipt',
        description: 'Invoices and dunning',
      },
    ],
  },
  {
    label: 'Governance',
    items: [
      {
        to: `${BASE_PATH}/flags`,
        label: 'Flags',
        icon: 'bi-toggle-on',
        description: 'Feature rollouts',
      },
      {
        to: `${BASE_PATH}/audit`,
        label: 'Audit',
        icon: 'bi-shield-lock',
        description: 'Security event log',
      },
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Tenants, users, invoices',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Workspace and alerts',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Nexus',
  to: `${BASE_PATH}/overview`,
};

export const PRODUCT_SWITCHER = [
  { value: 'platform', label: 'Platform', to: `${BASE_PATH}/overview` },
  { value: 'billing', label: 'Billing', to: `${BASE_PATH}/billing` },
  { value: 'security', label: 'Security', to: `${BASE_PATH}/audit` },
];

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: item.description,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'invite-user',
    label: 'Invite user',
    hint: 'Send a seat invite from Nexus',
    to: `${BASE_PATH}/users?invite=1`,
    group: 'Actions',
  },
  {
    id: 'suspend-tenant',
    label: 'Review suspended tenants',
    hint: 'Restore or keep a workspace offline',
    to: `${BASE_PATH}/tenants?status=Suspended`,
    group: 'Actions',
  },
  {
    id: 'harbor-legal',
    label: 'Harbor Legal',
    hint: 'Open the Scale workspace',
    to: `${BASE_PATH}/tenants/harbor-legal`,
    group: 'Tenants',
  },
];

export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'billing', label: 'Billing' },
  { value: 'member', label: 'Member' },
  { value: 'viewer', label: 'Viewer' },
];
