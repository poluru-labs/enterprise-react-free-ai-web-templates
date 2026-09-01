export const APP_NAME = 'Sightline';
export const APP_TAGLINE = 'Computer Vision Ops';
export const BASE_PATH = '/computer-vision';
export const THEME_COLOR = '#0F766E';

export const CURRENT_USER = {
  name: 'Maya Poluru',
  role: 'Vision ops lead',
};

export const NAV_GROUPS = [
  {
    label: 'Live ops',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-broadcast',
        description: 'Site health snapshot',
      },
      {
        to: `${BASE_PATH}/cameras`,
        label: 'Cameras',
        icon: 'bi-camera-video',
        description: 'Streams and sites',
      },
      {
        to: `${BASE_PATH}/detections`,
        label: 'Detections',
        icon: 'bi-bounding-box',
        description: 'Events and confidence',
      },
      {
        to: `${BASE_PATH}/incidents`,
        label: 'Incidents',
        icon: 'bi-exclamation-octagon',
        description: 'Safety and outages',
      },
    ],
  },
  {
    label: 'Model lab',
    items: [
      {
        to: `${BASE_PATH}/models`,
        label: 'Models',
        icon: 'bi-cpu',
        description: 'Versions and latency',
      },
      {
        to: `${BASE_PATH}/datasets`,
        label: 'Datasets',
        icon: 'bi-collection',
        description: 'Frames and splits',
      },
      {
        to: `${BASE_PATH}/annotations`,
        label: 'Annotations',
        icon: 'bi-vector-pen',
        description: 'Review queue',
      },
      {
        to: `${BASE_PATH}/quality`,
        label: 'Quality',
        icon: 'bi-clipboard-data',
        description: 'Precision and drift',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Cameras, models, events',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-sliders',
        description: 'On-call and alerts',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Computer Vision',
  to: `${BASE_PATH}/overview`,
};

export const TIME_RANGE_OPTIONS = [
  { label: 'Last hour', value: '1h' },
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
];
