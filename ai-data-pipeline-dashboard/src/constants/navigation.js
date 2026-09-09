export const APP_NAME = 'Conduit';
export const APP_TAGLINE = 'Data pipelines';
export const BASE_PATH = '/data-pipeline';
export const SIGNED_IN_USER = {
  name: 'Subbu Poluru',
  role: 'Head of data platform',
};

export const PIPELINE_STAGES = [
  { id: 'ingest', label: 'Ingest', icon: 'bi-box-arrow-in-down' },
  { id: 'transform', label: 'Transform', icon: 'bi-shuffle' },
  { id: 'quality', label: 'Quality', icon: 'bi-shield-check' },
  { id: 'lineage', label: 'Lineage', icon: 'bi-diagram-3' },
];

export const REPLAY_STEPS = [
  { label: 'Job' },
  { label: 'Window' },
  { label: 'Confirm' },
];

export const NAV_ITEMS = [
  {
    to: `${BASE_PATH}/overview`,
    label: 'Overview',
    icon: 'bi-grid-1x2',
    description: 'Ingestion health and volume',
  },
  {
    to: `${BASE_PATH}/ingestion`,
    label: 'Ingestion',
    icon: 'bi-box-arrow-in-down',
    description: 'Sources and landing jobs',
  },
  {
    to: `${BASE_PATH}/transformations`,
    label: 'Transformations',
    icon: 'bi-shuffle',
    description: 'Spark, SQL, and feature jobs',
  },
  {
    to: `${BASE_PATH}/quality`,
    label: 'Quality',
    icon: 'bi-shield-check',
    description: 'Checks, freshness, and nulls',
  },
  {
    to: `${BASE_PATH}/lineage`,
    label: 'Lineage',
    icon: 'bi-diagram-3',
    description: 'Upstream and downstream graph',
  },
  {
    to: `${BASE_PATH}/pipelines`,
    label: 'Pipelines',
    icon: 'bi-collection',
    description: 'Named lanes and owners',
  },
  {
    to: `${BASE_PATH}/settings`,
    label: 'Settings',
    icon: 'bi-sliders',
    description: 'Workspace, alerts, and team',
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Conduit',
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
    id: 'replay-job',
    label: 'Replay a job',
    hint: 'Re-run a window against a named pipeline',
    to: `${BASE_PATH}/pipelines?replay=1`,
    group: 'Actions',
  },
];
