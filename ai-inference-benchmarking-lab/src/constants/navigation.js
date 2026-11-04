export const APP_NAME = 'BenchDesk';
export const APP_TAGLINE = 'Lab Ops';
export const BASE_PATH = '/bench';

export const SIDEBAR_ITEMS = [
  { to: `${BASE_PATH}/overview`, label: 'Overview' },
  { to: `${BASE_PATH}/runs`, label: 'Runs' },
  { to: `${BASE_PATH}/metrics`, label: 'Metrics' },
  { to: `${BASE_PATH}/hardware`, label: 'Hardware' },
  { to: `${BASE_PATH}/suites`, label: 'Suites' },
  { to: `${BASE_PATH}/settings`, label: 'Settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'BenchDesk',
  to: `${BASE_PATH}/overview`,
};

export const MEGA_MENU = [
  {
    id: 'work',
    label: 'Work',
    columns: [
      {
        heading: 'Benchmarks',
        items: [
          { to: `${BASE_PATH}/runs`, title: 'Run history', body: 'Jobs and outcomes.' },
          { to: `${BASE_PATH}/metrics`, title: 'Latency & throughput', body: 'Aggregated stats.' },
        ],
      },
      {
        heading: 'Lab',
        items: [
          { to: `${BASE_PATH}/hardware`, title: 'Hardware profiles', body: 'GPU and host specs.' },
          { to: `${BASE_PATH}/suites`, title: 'Benchmark suites', body: 'Workload packages.' },
        ],
      },
    ],
  },
];
