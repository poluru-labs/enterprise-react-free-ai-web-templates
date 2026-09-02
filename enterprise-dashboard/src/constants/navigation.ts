import { facilities } from '../data/facilities';
import { tickets } from '../data/tickets';
import type { CommandItem } from '../data/types';
import type { SideNavItem } from '@poluru-labs/enterprise-design-system-react';

export const APP_NAME = 'Poluru DC';
export const APP_TAGLINE = 'Data Center Ops';
export const SITE_COUNT_LABEL = '12 sites · US';

export const SIGNED_IN_USER = {
  name: 'Venkata Poluru',
  role: 'Facilities lead',
  email: 'venkata.poluru@polurulabs.example',
};

export type NavItem = SideNavItem & {
  path: string;
  description: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: '/', icon: 'home', description: 'Fleet health and KPIs' },
  { label: 'Facilities', path: '/facilities', icon: 'folder', description: 'Campuses and capacity' },
  { label: 'Infrastructure', path: '/infrastructure', icon: 'link', description: 'Hosts and racks' },
  { label: 'Power & cooling', path: '/power', icon: 'refresh', description: 'PUE and thermal' },
  { label: 'Capacity', path: '/capacity', icon: 'star', description: 'Fill forecasts' },
  { label: 'Maintenance', path: '/maintenance', icon: 'calendar', description: 'Planned windows' },
  { label: 'Alerts', path: '/alerts', icon: 'bell', description: 'Incidents and pages' },
  { label: 'Tickets', path: '/tickets', icon: 'file', description: 'Incidents and changes' },
  { label: 'Settings', path: '/settings', icon: 'settings', description: 'Workspace defaults' },
];

export const BREADCRUMB_ROOT = {
  label: 'Operations',
  to: '/',
};

export const COMMAND_ITEMS: CommandItem[] = [
  ...NAV_ITEMS.map((item) => ({
    id: item.path,
    label: item.label,
    hint: item.description,
    to: item.path,
    group: 'Go to',
  })),
  ...facilities.map((facility) => ({
    id: facility.id,
    label: facility.name,
    hint: `${facility.region} · ${facility.status}`,
    to: `/facilities/${facility.id}`,
    group: 'Facilities',
  })),
  ...tickets.map((ticket) => ({
    id: ticket.id,
    label: `${ticket.id}: ${ticket.subject}`,
    hint: `${ticket.priority} · ${ticket.status}`,
    to: '/tickets',
    group: 'Tickets',
  })),
];
