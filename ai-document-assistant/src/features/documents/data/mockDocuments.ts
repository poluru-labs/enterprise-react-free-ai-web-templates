import type { WorkspaceDocument } from '@/core/types/documents'

export const MOCK_DOCUMENTS: WorkspaceDocument[] = [
  {
    id: 'DOC-2201',
    title: 'Q3 board narrative',
    type: 'Report',
    owner: 'Leela Poluru',
    status: 'Published',
    updatedAt: '2026-10-23T14:00:00.000Z',
  },
  {
    id: 'DOC-2198',
    title: 'Vendor security addendum',
    type: 'Policy',
    owner: 'Priya Poluru',
    status: 'In review',
    updatedAt: '2026-10-23T12:30:00.000Z',
  },
  {
    id: 'DOC-2185',
    title: 'Product launch FAQ',
    type: 'Support',
    owner: 'Maya Poluru',
    status: 'Draft',
    updatedAt: '2026-10-22T09:15:00.000Z',
  },
  {
    id: 'DOC-2170',
    title: '2024 audit archive',
    type: 'Compliance',
    owner: 'Nina Poluru',
    status: 'Archived',
    updatedAt: '2026-10-20T11:00:00.000Z',
  },
  {
    id: 'DOC-2162',
    title: 'API reference v4',
    type: 'Technical',
    owner: 'Jonah Poluru',
    status: 'Published',
    updatedAt: '2026-10-23T08:45:00.000Z',
  },
]
