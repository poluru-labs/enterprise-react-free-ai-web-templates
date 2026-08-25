export const APP_NAME = 'AgentPulse';
export const APP_TAGLINE = 'Agent Monitor';
export const BASE_PATH = '/agent-monitoring';

export const NAV_ITEMS = [
  {
    to: `${BASE_PATH}/overview`,
    label: 'Overview',
    icon: 'bi-grid-1x2',
    description: 'Executive snapshot',
  },
  {
    to: `${BASE_PATH}/tasks`,
    label: 'Tasks',
    icon: 'bi-list-task',
    description: 'Started and completed work',
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
    to: `${BASE_PATH}/memory-health`,
    label: 'Memory Health',
    icon: 'bi-cpu',
    description: 'Context and retrieval',
  },
];

export const BREADCRUMB_ROOT = {
  label: 'Agent Monitoring',
  to: `${BASE_PATH}/overview`,
};
