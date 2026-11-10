import type { MaintenanceTask } from '@/core/types/knowledge'

export const MOCK_MAINTENANCE: MaintenanceTask[] = [
  {
    id: 'MNT-884',
    title: 'Refresh billing screenshots',
    articleId: 'KB-2198',
    reason: 'UI changed in v4',
    assignee: 'Priya Poluru',
    priority: 'High',
    status: 'Open',
    updatedAt: '2026-10-23T18:10:00.000Z',
  },
  {
    id: 'MNT-879',
    title: 'Update API auth code sample',
    articleId: 'KB-2185',
    reason: 'SDK 3.0 released',
    assignee: 'Ravi Poluru',
    priority: 'Medium',
    status: 'In progress',
    updatedAt: '2026-10-23T15:00:00.000Z',
  },
  {
    id: 'MNT-870',
    title: 'Archive VPN guide',
    articleId: 'KB-2170',
    reason: 'Product sunset',
    assignee: 'Nina Poluru',
    priority: 'Low',
    status: 'Done',
    updatedAt: '2026-10-23T11:30:00.000Z',
  },
  {
    id: 'MNT-865',
    title: 'Verify deflection on password reset',
    articleId: 'KB-2201',
    reason: 'Quarterly audit',
    assignee: 'Jonah Poluru',
    priority: 'Medium',
    status: 'Open',
    updatedAt: '2026-10-22T17:00:00.000Z',
  },
]
