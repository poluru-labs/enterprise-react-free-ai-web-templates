import type { RankingMetric } from '@/core/types/search'

export const MOCK_RANKINGS: RankingMetric[] = [
  {
    id: 'RNK-301',
    name: 'Support deflection v3',
    cohort: 'support-v2',
    ndcg: 0.82,
    mrr: 0.71,
    owner: 'Jonah Poluru',
    updatedAt: '2026-10-23T14:00:00.000Z',
  },
  {
    id: 'RNK-298',
    name: 'API doc retrieval',
    cohort: 'docs-api',
    ndcg: 0.76,
    mrr: 0.68,
    owner: 'Leela Poluru',
    updatedAt: '2026-10-23T12:00:00.000Z',
  },
  {
    id: 'RNK-290',
    name: 'Compliance lookup',
    cohort: 'compliance',
    ndcg: 0.69,
    mrr: 0.62,
    owner: 'Kavya Poluru',
    updatedAt: '2026-10-22T16:00:00.000Z',
  },
]
