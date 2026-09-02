import type { NotificationItem } from './types';

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: '2 critical alerts need attention',
    time: 'Just now',
    unread: true,
    path: '/alerts',
  },
  {
    id: 'n2',
    title: 'Maintenance window started at DFW-1',
    time: '1 hr ago',
    unread: true,
    path: '/maintenance',
  },
  {
    id: 'n3',
    title: 'Weekly capacity report ready',
    time: 'Yesterday',
    unread: false,
    path: '/capacity',
  },
  {
    id: 'n4',
    title: 'ATL-1 chiller 3 entering service window',
    time: 'Yesterday',
    unread: false,
    path: '/facilities/dc-atl1',
  },
];
