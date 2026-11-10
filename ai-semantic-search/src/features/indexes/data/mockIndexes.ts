import type { SearchIndex } from '@/core/types/search'

export const MOCK_INDEXES: SearchIndex[] = [
  {
    id: 'IDX-101',
    name: 'support-v2',
    records: 420000,
    dimensions: 768,
    freshnessDays: 3,
    owner: 'Maya Poluru',
    updatedAt: '2026-10-23T10:00:00.000Z',
  },
  {
    id: 'IDX-098',
    name: 'docs-api',
    records: 128000,
    dimensions: 1536,
    freshnessDays: 14,
    owner: 'Leela Poluru',
    updatedAt: '2026-10-22T16:00:00.000Z',
  },
  {
    id: 'IDX-090',
    name: 'compliance',
    records: 8200,
    dimensions: 768,
    freshnessDays: 45,
    owner: 'Priya Poluru',
    updatedAt: '2026-10-21T09:00:00.000Z',
  },
]
