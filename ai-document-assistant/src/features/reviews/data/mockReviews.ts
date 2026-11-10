import type { DocReview } from '@/core/types/documents'

export const MOCK_REVIEWS: DocReview[] = [
  {
    id: 'REV-884',
    title: 'Approve vendor security addendum',
    documentId: 'DOC-2198',
    assignee: 'Priya Poluru',
    priority: 'High',
    status: 'Open',
    updatedAt: '2026-10-23T18:10:00.000Z',
  },
  {
    id: 'REV-879',
    title: 'FAQ tone check',
    documentId: 'DOC-2185',
    assignee: 'Ravi Poluru',
    priority: 'Medium',
    status: 'Changes requested',
    updatedAt: '2026-10-23T15:00:00.000Z',
  },
  {
    id: 'REV-870',
    title: 'API reference sign-off',
    documentId: 'DOC-2162',
    assignee: 'Maya Poluru',
    priority: 'Low',
    status: 'Approved',
    updatedAt: '2026-10-23T11:30:00.000Z',
  },
  {
    id: 'REV-865',
    title: 'Archive retention note',
    documentId: 'DOC-2170',
    assignee: 'Nina Poluru',
    priority: 'Medium',
    status: 'Open',
    updatedAt: '2026-10-22T17:00:00.000Z',
  },
]
