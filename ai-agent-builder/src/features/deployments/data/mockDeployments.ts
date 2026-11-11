import type { Deployment } from '@/core'

export const MOCK_DEPLOYMENTS: Deployment[] = [
  {
    id: 'dep-19',
    version: 'v1.9.0-rc.1',
    env: 'staging',
    status: 'pending-review',
    changeSummary: 'Adds escalation check for enterprise tier; prompt support-reply@8.',
    author: 'Anika Poluru',
    reviewer: null,
    deployedAt: '2026-11-10T12:30:00Z',
  },
  {
    id: 'dep-18',
    version: 'v1.8.0',
    env: 'production',
    status: 'live',
    changeSummary: 'Redacts customer emails before tool calls; tightens refund policy.',
    author: 'Meera Poluru',
    reviewer: 'Ravi Poluru',
    deployedAt: '2026-11-06T09:15:00Z',
  },
  {
    id: 'dep-17',
    version: 'v1.7.2',
    env: 'production',
    status: 'rolled-back',
    changeSummary: 'Swapped knowledge base retriever; rolled back after citation drift.',
    author: 'Kiran Poluru',
    reviewer: 'Anika Poluru',
    deployedAt: '2026-10-29T16:40:00Z',
  },
  {
    id: 'dep-16',
    version: 'v1.7.1',
    env: 'production',
    status: 'approved',
    changeSummary: 'Lowered classifier temperature; added outage scenario to test suite.',
    author: 'Ravi Poluru',
    reviewer: 'Meera Poluru',
    deployedAt: '2026-10-21T11:05:00Z',
  },
]
