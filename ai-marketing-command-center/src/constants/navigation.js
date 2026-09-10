export const APP_NAME = 'Marquee';
export const APP_TAGLINE = 'Marketing';
export const BASE_PATH = '/marketing';
export const SIGNED_IN_USER = {
  name: 'Subbu Poluru',
  role: 'Head of growth',
};

export const FUNNEL_STAGES = [
  { id: 'audience', label: 'Audience', icon: 'bi-people' },
  { id: 'campaign', label: 'Campaign', icon: 'bi-megaphone' },
  { id: 'content', label: 'Content', icon: 'bi-file-earmark-richtext' },
  { id: 'automate', label: 'Automate', icon: 'bi-lightning' },
];

export const LAUNCH_STEPS = [
  { label: 'Offer' },
  { label: 'Audience' },
  { label: 'Confirm' },
];

export const NAV_ITEMS = [
  {
    to: `${BASE_PATH}/overview`,
    label: 'Overview',
    icon: 'bi-grid-1x2',
    description: 'Spend, ROAS, and live flights',
  },
  {
    to: `${BASE_PATH}/campaigns`,
    label: 'Campaigns',
    icon: 'bi-megaphone',
    description: 'Flights, channels, and owners',
  },
  {
    to: `${BASE_PATH}/audiences`,
    label: 'Audiences',
    icon: 'bi-people',
    description: 'Segments and reach',
  },
  {
    to: `${BASE_PATH}/content`,
    label: 'Content',
    icon: 'bi-file-earmark-richtext',
    description: 'Creative performance',
  },
  {
    to: `${BASE_PATH}/automation`,
    label: 'Automation',
    icon: 'bi-lightning',
    description: 'Journeys and triggers',
  },
  {
    to: `${BASE_PATH}/settings`,
    label: 'Settings',
    icon: 'bi-sliders',
    description: 'Workspace, brand, and alerts',
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Marquee',
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
    id: 'launch-campaign',
    label: 'Launch a campaign',
    hint: 'Draft a flight against a named audience',
    to: `${BASE_PATH}/campaigns?launch=1`,
    group: 'Actions',
  },
];
