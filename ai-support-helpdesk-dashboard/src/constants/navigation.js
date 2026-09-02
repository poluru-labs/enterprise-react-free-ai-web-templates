export const APP_NAME = 'Relay';
export const APP_TAGLINE = 'AI support desk';
export const BASE_PATH = '/helpdesk';
export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Support lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Queue',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Load, SLA, and deflection',
      },
      {
        to: `${BASE_PATH}/inbox`,
        label: 'Inbox',
        icon: 'bi-inbox',
        description: 'Live working queue',
      },
      {
        to: `${BASE_PATH}/tickets`,
        label: 'Tickets',
        icon: 'bi-ticket-perforated',
        description: 'Full ticket catalog',
      },
      {
        to: `${BASE_PATH}/customers`,
        label: 'Customers',
        icon: 'bi-buildings',
        description: 'Accounts and seats',
      },
    ],
  },
  {
    label: 'Assist',
    items: [
      {
        to: `${BASE_PATH}/macros`,
        label: 'Macros',
        icon: 'bi-lightning',
        description: 'Canned replies',
      },
      {
        to: `${BASE_PATH}/knowledge`,
        label: 'Knowledge',
        icon: 'bi-journal-text',
        description: 'Copilot source articles',
      },
      {
        to: `${BASE_PATH}/sla`,
        label: 'SLA',
        icon: 'bi-hourglass-split',
        description: 'Policies and breaches',
      },
      {
        to: `${BASE_PATH}/agents`,
        label: 'Agents',
        icon: 'bi-headset',
        description: 'Load and occupancy',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/analytics`,
        label: 'Analytics',
        icon: 'bi-graph-up',
        description: 'CSAT, volume, deflection',
      },
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Tickets, customers, macros',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Routing, hours, and team',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Relay',
  to: `${BASE_PATH}/overview`,
};

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: item.description,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'assign-next',
    label: 'Assign next',
    hint: 'Claim the oldest unassigned ticket',
    to: `${BASE_PATH}/inbox?assign=1`,
    group: 'Actions',
  },
  {
    id: 'open-p1',
    label: 'Open hottest P1',
    hint: 'Weekend billing charge at Northwind',
    to: `${BASE_PATH}/tickets/TKT-1847`,
    group: 'Actions',
  },
];
