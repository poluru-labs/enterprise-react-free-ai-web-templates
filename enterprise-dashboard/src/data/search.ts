import { alerts } from './alerts';
import { facilities } from './facilities';
import { servers } from './hosts';
import { tickets } from './tickets';
import type { SearchHit } from './types';

export function buildSearchIndex(): SearchHit[] {
  return [
    ...facilities.map((facility) => ({
      id: facility.id,
      type: 'Facility' as const,
      title: facility.name,
      subtitle: `${facility.region} · ${facility.status}`,
      path: `/facilities/${facility.id}`,
    })),
    ...servers.map((server) => ({
      id: server.id,
      type: 'Host' as const,
      title: server.hostname,
      subtitle: `${server.facility} · ${server.role}`,
      path: '/infrastructure',
    })),
    ...alerts.map((alert) => ({
      id: alert.id,
      type: 'Alert' as const,
      title: alert.title,
      subtitle: `${alert.severity} · ${alert.facility}`,
      path: '/alerts',
    })),
    ...tickets.map((ticket) => ({
      id: ticket.id,
      type: 'Ticket' as const,
      title: `${ticket.id}: ${ticket.subject}`,
      subtitle: `${ticket.priority} · ${ticket.status}`,
      path: '/tickets',
    })),
  ];
}
