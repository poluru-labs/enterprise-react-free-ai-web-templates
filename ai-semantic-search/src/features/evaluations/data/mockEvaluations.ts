import type { SearchEvaluation } from '@/core/types/search'

export const MOCK_EVALUATIONS: SearchEvaluation[] = [
  {
    id: 'EVL-884',
    title: 'Rate refund policy results',
    queryId: 'Q-2201',
    rating: 0,
    assignee: 'Priya Poluru',
    priority: 'High',
    status: 'Open',
    updatedAt: '2026-10-23T18:10:00.000Z',
  },
  {
    id: 'EVL-879',
    title: 'Zero-hit SOC2 query',
    queryId: 'Q-2185',
    rating: 1,
    assignee: 'Ravi Poluru',
    priority: 'High',
    status: 'Reviewed',
    updatedAt: '2026-10-23T15:00:00.000Z',
  },
  {
    id: 'EVL-870',
    title: 'Slow API limit search',
    queryId: 'Q-2198',
    rating: 3,
    assignee: 'Maya Poluru',
    priority: 'Medium',
    status: 'Done',
    updatedAt: '2026-10-23T11:30:00.000Z',
  },
]
