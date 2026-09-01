export const APP_NAME = 'Poluru LLM Ops';
export const APP_TAGLINE = 'Model control plane';
export const BASE_PATH = '/llm-ops';
export const SIGNED_IN_USER = {
  name: 'Subrahmanyam Poluru',
  role: 'Platform owner',
  email: 'subrahmanyam.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Observe',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Latency, spend, and incidents',
      },
      {
        to: `${BASE_PATH}/traces`,
        label: 'Traces',
        icon: 'bi-activity',
        description: 'Live request inspector',
      },
      {
        to: `${BASE_PATH}/incidents`,
        label: 'Incidents',
        icon: 'bi-exclamation-triangle',
        description: 'Watch and resolved pages',
      },
      {
        to: `${BASE_PATH}/costs`,
        label: 'Costs',
        icon: 'bi-wallet2',
        description: 'Token burn and budget',
      },
    ],
  },
  {
    label: 'Ship',
    items: [
      {
        to: `${BASE_PATH}/models`,
        label: 'Models',
        icon: 'bi-cpu',
        description: 'Registry and serving',
      },
      {
        to: `${BASE_PATH}/prompts`,
        label: 'Prompts',
        icon: 'bi-chat-square-text',
        description: 'Templates and versions',
      },
      {
        to: `${BASE_PATH}/evaluations`,
        label: 'Evaluations',
        icon: 'bi-clipboard-check',
        description: 'Safety and groundedness',
      },
      {
        to: `${BASE_PATH}/playground`,
        label: 'Playground',
        icon: 'bi-terminal',
        description: 'Draft against Aurora',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/guardrails`,
        label: 'Guardrails',
        icon: 'bi-shield-check',
        description: 'PII, jailbreak, grounding',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Keys, alerts, and team',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'LLM Ops',
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
    id: 'deploy-model',
    label: 'Deploy model',
    hint: 'Queue a new serving endpoint',
    to: `${BASE_PATH}/models?deploy=1`,
    group: 'Actions',
  },
  {
    id: 'generate',
    label: 'Generate completion',
    hint: 'Run the playground against Aurora',
    to: `${BASE_PATH}/playground?run=1`,
    group: 'Actions',
  },
  {
    id: 'aurora',
    label: 'Aurora Chat',
    hint: 'Open the production chat stack',
    to: `${BASE_PATH}/models/aurora`,
    group: 'Models',
  },
];

export const DEPLOY_STEPS = [
  { label: 'Endpoint', description: 'Name the serving URL' },
  { label: 'Model', description: 'Pick the stack' },
  { label: 'Review', description: 'Owner signs off' },
];
