import type { DocTemplate } from '@/core/types/documents'

export const MOCK_TEMPLATES: DocTemplate[] = [
  {
    id: 'TPL-101',
    name: 'Board narrative',
    category: 'Executive',
    version: '2.4',
    uses: 42,
    owner: 'Leela Poluru',
    updatedAt: '2026-10-23T10:00:00.000Z',
  },
  {
    id: 'TPL-098',
    name: 'Security questionnaire',
    category: 'Compliance',
    version: '1.8',
    uses: 128,
    owner: 'Priya Poluru',
    updatedAt: '2026-10-22T16:00:00.000Z',
  },
  {
    id: 'TPL-090',
    name: 'Release notes',
    category: 'Product',
    version: '3.0',
    uses: 310,
    owner: 'Maya Poluru',
    updatedAt: '2026-10-21T09:00:00.000Z',
  },
  {
    id: 'TPL-085',
    name: 'Support macro pack',
    category: 'Support',
    version: '1.2',
    uses: 88,
    owner: 'Jonah Poluru',
    updatedAt: '2026-10-20T14:00:00.000Z',
  },
]
