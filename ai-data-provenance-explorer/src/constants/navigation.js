export const APP_NAME = 'ProvDesk';
export const APP_TAGLINE = 'Data Custody';
export const BASE_PATH = '/prov';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/datasets`, label: 'Datasets' },
  { to: `${BASE_PATH}/lineage`, label: 'Lineage' },
  { to: `${BASE_PATH}/custody`, label: 'Custody' },
  { to: `${BASE_PATH}/audit`, label: 'Audit trail' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'ProvDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Provenance',
        items: [
          { to: `${BASE_PATH}/datasets`, title: 'Dataset versions', body: 'Snapshots and hashes.' },
          { to: `${BASE_PATH}/lineage`, title: 'Lineage table', body: 'Upstream and downstream.' },
        ],
      },
      {
        heading: 'Governance',
        items: [
          { to: `${BASE_PATH}/custody`, title: 'Custody events', body: 'Handoffs and seals.' },
          { to: `${BASE_PATH}/audit`, title: 'Audit trail', body: 'Immutable log entries.' },
        ],
      },
    ],
  },
];
