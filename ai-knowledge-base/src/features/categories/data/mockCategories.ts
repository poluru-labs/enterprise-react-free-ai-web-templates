import type { KnowledgeCategory } from '@/core/types/knowledge'

export const MOCK_CATEGORIES: KnowledgeCategory[] = [
  {
    id: 'CAT-101',
    name: 'Account',
    slug: 'account',
    articles: 42,
    owner: 'Leela Poluru',
    freshnessDays: 12,
    updatedAt: '2026-10-23T10:00:00.000Z',
  },
  {
    id: 'CAT-098',
    name: 'Billing',
    slug: 'billing',
    articles: 28,
    owner: 'Priya Poluru',
    freshnessDays: 45,
    updatedAt: '2026-10-22T16:00:00.000Z',
  },
  {
    id: 'CAT-090',
    name: 'Developers',
    slug: 'developers',
    articles: 64,
    owner: 'Jonah Poluru',
    freshnessDays: 8,
    updatedAt: '2026-10-21T09:00:00.000Z',
  },
  {
    id: 'CAT-085',
    name: 'Privacy',
    slug: 'privacy',
    articles: 18,
    owner: 'Nina Poluru',
    freshnessDays: 30,
    updatedAt: '2026-10-20T14:00:00.000Z',
  },
]
