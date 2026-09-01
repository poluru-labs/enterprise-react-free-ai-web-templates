export const APP_NAME = 'Kiln Training';
export const APP_TAGLINE = 'GPU foundry';
export const BASE_PATH = '/ml-training';
export const SIGNED_IN_USER = {
  name: 'Kavya Poluru',
  role: 'Training lead',
  email: 'kavya.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Foundry',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Live jobs and GPU heat',
      },
      {
        to: `${BASE_PATH}/runs`,
        label: 'Runs',
        icon: 'bi-play-circle',
        description: 'Training jobs in flight',
      },
      {
        to: `${BASE_PATH}/experiments`,
        label: 'Experiments',
        icon: 'bi-beaker',
        description: 'Tracks and best scores',
      },
      {
        to: `${BASE_PATH}/checkpoints`,
        label: 'Checkpoints',
        icon: 'bi-save',
        description: 'Epoch weights to promote',
      },
    ],
  },
  {
    label: 'Assets',
    items: [
      {
        to: `${BASE_PATH}/datasets`,
        label: 'Datasets',
        icon: 'bi-database',
        description: 'Lineage and quality',
      },
      {
        to: `${BASE_PATH}/models`,
        label: 'Models',
        icon: 'bi-box-seam',
        description: 'Registry and stages',
      },
      {
        to: `${BASE_PATH}/clusters`,
        label: 'Clusters',
        icon: 'bi-hdd-stack',
        description: 'Regional GPU capacity',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Profile, alerts, CLI',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Kiln Training',
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
    id: 'run-harbor',
    label: 'harbor-encoder-v3',
    hint: 'Open Kavya Poluru’s live Harbor run',
    to: `${BASE_PATH}/runs/run_harbor`,
    group: 'Runs',
  },
  {
    id: 'run-oak',
    label: 'oak-vision-s2',
    hint: 'Sahana Poluru’s vision job',
    to: `${BASE_PATH}/runs/run_oak`,
    group: 'Runs',
  },
  {
    id: 'run-lumen',
    label: 'lumen-ehr-ft',
    hint: 'Jordan Poluru’s failed clinical run',
    to: `${BASE_PATH}/runs/run_lumen`,
    group: 'Runs',
  },
  {
    id: 'launch-run',
    label: 'Launch run',
    hint: 'Queue a new training job',
    to: `${BASE_PATH}/runs`,
    group: 'Actions',
  },
  {
    id: 'upload-dataset',
    label: 'Upload dataset',
    hint: 'Send parquet to Hana Poluru',
    to: `${BASE_PATH}/datasets`,
    group: 'Actions',
  },
];
