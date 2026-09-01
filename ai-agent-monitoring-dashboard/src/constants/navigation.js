export const APP_NAME = 'AgentPulse';
export const APP_TAGLINE = 'Agent Monitor';
export const BASE_PATH = '/agent-monitoring';

export const CURRENT_USER = {
  name: 'Avery Poluru',
  role: 'Ops lead',
};

export const TIME_RANGE_OPTIONS = [
  { label: 'Last 1 hour', value: '1h' },
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
];

export const NAV_GROUPS = [
  {
    label: 'Operations',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Executive snapshot',
      },
      {
        to: `${BASE_PATH}/agents`,
        label: 'Agents',
        icon: 'bi-cpu',
        description: 'Fleet roster',
      },
      {
        to: `${BASE_PATH}/tasks`,
        label: 'Tasks',
        icon: 'bi-list-task',
        description: 'Started and completed work',
      },
      {
        to: `${BASE_PATH}/traces`,
        label: 'Traces',
        icon: 'bi-diagram-3',
        description: 'Step-by-step spans',
      },
      {
        to: `${BASE_PATH}/tool-calls`,
        label: 'Tool Calls',
        icon: 'bi-wrench-adjustable',
        description: 'Latency and success',
      },
      {
        to: `${BASE_PATH}/loops`,
        label: 'Loop Detection',
        icon: 'bi-arrow-repeat',
        description: 'Repeated execution',
      },
      {
        to: `${BASE_PATH}/failures`,
        label: 'Failures',
        icon: 'bi-exclamation-triangle',
        description: 'Error taxonomy',
      },
      {
        to: `${BASE_PATH}/handoffs`,
        label: 'Handoffs',
        icon: 'bi-people',
        description: 'Human takeover',
      },
      {
        to: `${BASE_PATH}/incidents`,
        label: 'Incidents',
        icon: 'bi-lightning-charge',
        description: 'Live reliability events',
      },
    ],
  },
  {
    label: 'Quality',
    items: [
      {
        to: `${BASE_PATH}/memory-health`,
        label: 'Memory Health',
        icon: 'bi-heart-pulse',
        description: 'Context and retrieval',
      },
      {
        to: `${BASE_PATH}/evaluations`,
        label: 'Evaluations',
        icon: 'bi-clipboard-check',
        description: 'Groundedness and pass rate',
      },
      {
        to: `${BASE_PATH}/guardrails`,
        label: 'Guardrails',
        icon: 'bi-shield-check',
        description: 'Policy blocks and redaction',
      },
      {
        to: `${BASE_PATH}/cost`,
        label: 'Cost & tokens',
        icon: 'bi-currency-dollar',
        description: 'Spend by agent and model',
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
        description: 'Budget, routing, on-call',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Agent Monitoring',
  to: `${BASE_PATH}/overview`,
};
