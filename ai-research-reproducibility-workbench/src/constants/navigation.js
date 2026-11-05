export const APP_NAME = 'ReproDesk';
export const APP_TAGLINE = 'Repro workbench';
export const BASE_PATH = '/repro';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/runs`, label: 'Runs' },
  { to: `${BASE_PATH}/artifacts`, label: 'Artifacts' },
  { to: `${BASE_PATH}/environments`, label: 'Environments' },
  { to: `${BASE_PATH}/reproductions`, label: 'Reproductions' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'ReproDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Experiments',
        items: [
          { to: `${BASE_PATH}/runs`, title: 'Run log', body: 'Trials and checkpoints.' },
          { to: `${BASE_PATH}/artifacts`, title: 'Artifacts', body: 'Models and tables.' },
        ],
      },
      {
        heading: 'Repro',
        items: [
          { to: `${BASE_PATH}/environments`, title: 'Environment pins', body: 'Locked stacks.' },
          { to: `${BASE_PATH}/reproductions`, title: 'Reproductions', body: 'Verify status.' },
        ],
      },
    ],
  },
];
