import type { SearchQuery } from '@/core/types/search'

export const MOCK_QUERIES: SearchQuery[] = [
  {
    id: 'Q-2201',
    text: 'refund policy international',
    index: 'support-v2',
    latencyMs: 120,
    hits: 8,
    status: 'Success',
    owner: 'Jonah Poluru',
    updatedAt: '2026-10-23T14:00:00.000Z',
  },
  {
    id: 'Q-2198',
    text: 'api rate limit enterprise',
    index: 'docs-api',
    latencyMs: 890,
    hits: 12,
    status: 'Slow',
    owner: 'Leela Poluru',
    updatedAt: '2026-10-23T12:30:00.000Z',
  },
  {
    id: 'Q-2185',
    text: 'SOC2 appendix download',
    index: 'compliance',
    latencyMs: 95,
    hits: 0,
    status: 'Zero',
    owner: 'Priya Poluru',
    updatedAt: '2026-10-22T09:15:00.000Z',
  },
  {
    id: 'Q-2170',
    text: 'vector dim mismatch',
    index: 'debug',
    latencyMs: 0,
    hits: 0,
    status: 'Error',
    owner: 'Maya Poluru',
    updatedAt: '2026-10-20T11:00:00.000Z',
  },
]
