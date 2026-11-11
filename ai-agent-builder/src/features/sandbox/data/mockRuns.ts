import type { RunStep, SandboxRun } from '@/core'

export const SCENARIOS = [
  'Password reset request',
  'Enterprise outage report',
  'Refund demand with card number',
  'Billing plan question',
] as const

export function buildSteps(scenario: string, failed: boolean): RunStep[] {
  return [
    { id: 's1', node: 'Ticket received', status: 'passed', durationMs: 11, note: 'Payload validated.' },
    { id: 's2', node: 'Classify intent', status: 'passed', durationMs: 612, note: `Intent resolved for "${scenario}".` },
    { id: 's3', node: 'PII redaction', status: 'passed', durationMs: 31, note: 'Sensitive fields masked.' },
    { id: 's4', node: 'Search knowledge base', status: 'passed', durationMs: 298, note: '5 passages returned.' },
    {
      id: 's5',
      node: 'Draft reply',
      status: failed ? 'failed' : 'passed',
      durationMs: 1204,
      note: failed
        ? 'Policy billing.refund denied the requested tool call.'
        : 'Reply drafted with 3 citations.',
    },
  ]
}

export const MOCK_RUNS: SandboxRun[] = [
  {
    id: 'run-1042',
    scenario: 'Password reset request',
    agentVersion: 'v1.8.0',
    status: 'passed',
    tokens: 3120,
    durationMs: 2156,
    startedAt: '2026-11-10T15:42:00Z',
    triggeredBy: 'Anika Poluru',
    steps: buildSteps('Password reset request', false),
  },
  {
    id: 'run-1041',
    scenario: 'Refund demand with card number',
    agentVersion: 'v1.8.0',
    status: 'failed',
    tokens: 2874,
    durationMs: 2210,
    startedAt: '2026-11-10T15:18:00Z',
    triggeredBy: 'Meera Poluru',
    steps: buildSteps('Refund demand with card number', true),
  },
  {
    id: 'run-1040',
    scenario: 'Enterprise outage report',
    agentVersion: 'v1.7.2',
    status: 'passed',
    tokens: 3488,
    durationMs: 2390,
    startedAt: '2026-11-10T13:05:00Z',
    triggeredBy: 'Ravi Poluru',
    steps: buildSteps('Enterprise outage report', false),
  },
  {
    id: 'run-1039',
    scenario: 'Billing plan question',
    agentVersion: 'v1.7.2',
    status: 'passed',
    tokens: 2610,
    durationMs: 1988,
    startedAt: '2026-11-09T18:47:00Z',
    triggeredBy: 'Kiran Poluru',
    steps: buildSteps('Billing plan question', false),
  },
]
