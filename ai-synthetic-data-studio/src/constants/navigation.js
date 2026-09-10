export const APP_NAME = 'Poluru Synth Studio';
export const APP_TAGLINE = 'AI Synthetic Data & Privacy Engine';
export const BASE_PATH = '/synthetic-data';

export const BRAND_COLOR = '#05339C';

export const NAV_GROUPS = [
  {
    label: 'Studio',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2-fill',
        description: 'Studio ops, KPIs & active runs',
      },
      {
        to: `${BASE_PATH}/generator`,
        label: 'Generator Studio',
        icon: 'bi-cpu-fill',
        description: 'Interactive synthetic data studio',
      },
      {
        to: `${BASE_PATH}/datasets`,
        label: 'Datasets Catalog',
        icon: 'bi-database-fill-check',
        description: 'Repository of synthetic datasets',
      },
    ],
  },
  {
    label: 'Validation & Evals',
    items: [
      {
        to: `${BASE_PATH}/privacy-guard`,
        label: 'Privacy Guard',
        icon: 'bi-shield-lock-fill',
        description: 'Differential privacy & leakage checks',
      },
      {
        to: `${BASE_PATH}/quality-eval`,
        label: 'Quality & Fidelity',
        icon: 'bi-bar-chart-steps',
        description: 'Statistical fidelity & ML utility',
      },
      {
        to: `${BASE_PATH}/rules`,
        label: 'Rules & Constraints',
        icon: 'bi-sliders2-vertical',
        description: 'Schema constraints & regex masks',
      },
    ],
  },
  {
    label: 'Automation & Platform',
    items: [
      {
        to: `${BASE_PATH}/pipelines`,
        label: 'Pipelines & Jobs',
        icon: 'bi-arrow-repeat',
        description: 'Scheduled batch & streaming runs',
      },
      {
        to: `${BASE_PATH}/team`,
        label: 'Team & API Access',
        icon: 'bi-people-fill',
        description: 'Poluru workspace & API tokens',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Studio Settings',
        icon: 'bi-gear-fill',
        description: 'Compute, DP defaults & storage',
      },
    ],
  },
];
