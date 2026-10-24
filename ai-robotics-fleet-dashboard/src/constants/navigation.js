export const APP_NAME = 'FleetPulse';
export const APP_TAGLINE = 'Fleet Ops';
export const BASE_PATH = '/fleet';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Home' },
  { to: `${BASE_PATH}/robots`, label: 'Robots' },
  { to: `${BASE_PATH}/missions`, label: 'Missions' },
  { to: `${BASE_PATH}/battery`, label: 'Battery' },
  { to: `${BASE_PATH}/telemetry`, label: 'Telemetry' },
  { to: `${BASE_PATH}/maintenance`, label: 'Maintenance' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const MEGA_MENU = [
  {
    id: 'manage',
    label: 'Manage',
    columns: [
      {
        heading: 'Fleet',
        items: [
          { to: `${BASE_PATH}/robots`, title: 'Robot roster', body: 'Units, zones, and status.' },
          { to: `${BASE_PATH}/missions`, title: 'Missions', body: 'Routes, tasks, and ETA.' },
          { to: `${BASE_PATH}/overview`, title: 'Home', body: 'Fleet snapshot.' },
        ],
      },
      {
        heading: 'Health',
        items: [
          { to: `${BASE_PATH}/battery`, title: 'Battery desk', body: 'Charge bands and swaps.' },
          { to: `${BASE_PATH}/telemetry`, title: 'Telemetry', body: 'Streams and alerts.' },
          { to: `${BASE_PATH}/maintenance`, title: 'Maintenance', body: 'Work orders and parts.' },
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
          { to: `${BASE_PATH}/telemetry`, title: 'Live trace map', body: 'Follow a unit on the floor.' },
          { to: `${BASE_PATH}/battery`, title: 'Swap scheduler', body: 'Queue dock slots by SOC.' },
          { to: `${BASE_PATH}/missions`, title: 'Mission replay', body: 'Step through completed runs.' },
        ],
      },
      {
        heading: 'Enhancements',
        items: [
          { to: `${BASE_PATH}/robots`, title: 'Zone compare', body: 'Utilization side by side.' },
          { to: `${BASE_PATH}/overview`, title: 'Fleet heatmap', body: 'Density by aisle on home.' },
          { to: `${BASE_PATH}/settings`, title: 'Quiet hours', body: 'Pause alerts for Nina Poluru.' },
        ],
      },
    ],
  },
  {
    id: 'org',
    label: 'Org',
    columns: [
      {
        heading: 'Desks',
        items: [
          { to: `${BASE_PATH}/robots`, title: 'Field ops', body: 'Maya Poluru · floor units.' },
          { to: `${BASE_PATH}/missions`, title: 'Mission control', body: 'Rahul Poluru · dispatch.' },
        ],
      },
      {
        heading: 'On-call',
        items: [
          { to: `${BASE_PATH}/maintenance`, title: 'Maintenance', body: 'Jonah Poluru · parts desk.' },
          { to: `${BASE_PATH}/battery`, title: 'Power desk', body: 'Elena Poluru · swap review.' },
        ],
      },
    ],
  },
];

export const BREADCRUMB_ROOT = {
  label: 'FleetPulse',
  to: `${BASE_PATH}/overview`,
};
