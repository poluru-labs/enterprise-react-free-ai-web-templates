import type { KnowledgeArticle } from '@/core/types/knowledge'

export const MOCK_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'KB-2201',
    title: 'Reset your password',
    category: 'Account',
    views: 12400,
    owner: 'Leela Poluru',
    status: 'Published',
    updatedAt: '2026-10-23T14:00:00.000Z',
  },
  {
    id: 'KB-2198',
    title: 'Billing cycle explained',
    category: 'Billing',
    views: 8200,
    owner: 'Priya Poluru',
    status: 'Scheduled',
    updatedAt: '2026-10-23T12:30:00.000Z',
  },
  {
    id: 'KB-2185',
    title: 'API authentication overview',
    category: 'Developers',
    views: 3100,
    owner: 'Maya Poluru',
    status: 'Draft',
    updatedAt: '2026-10-22T09:15:00.000Z',
  },
  {
    id: 'KB-2170',
    title: 'Legacy VPN guide',
    category: 'IT',
    views: 120,
    owner: 'Nina Poluru',
    status: 'Archived',
    updatedAt: '2026-10-20T11:00:00.000Z',
  },
  {
    id: 'KB-2162',
    title: 'Export your data',
    category: 'Privacy',
    views: 5600,
    owner: 'Jonah Poluru',
    status: 'Published',
    updatedAt: '2026-10-23T08:45:00.000Z',
  },
]
