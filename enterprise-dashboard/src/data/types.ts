export type FacilityStatus = 'operational' | 'degraded' | 'maintenance';

export type Facility = {
  id: string;
  name: string;
  code: string;
  region: string;
  status: FacilityStatus;
  racks: number;
  utilization: number;
  powerKw: number;
  pue: number;
  coolingTons: number;
  tempC: number;
  humidity: number;
};

export type ServerRow = {
  id: string;
  hostname: string;
  facility: string;
  facilityId: string;
  role: string;
  cpu: number;
  memory: number;
  status: string;
};

export type AlertItem = {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  facility: string;
  facilityId: string;
  time: string;
  description: string;
  acknowledged: boolean;
};

export type MaintenanceWindow = {
  id: string;
  title: string;
  facility: string;
  facilityId: string;
  window: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  impact: string;
  owner: string;
};

export type CapacityForecast = {
  facility: string;
  facilityId: string;
  current: number;
  days30: number;
  days90: number;
  risk: 'low' | 'medium' | 'high';
};

export type Ticket = {
  id: string;
  subject: string;
  priority: 'P1' | 'P2' | 'P3';
  facility: string;
  facilityId: string;
  assignee: string;
  status: 'Open' | 'In progress' | 'Resolved';
};

export type SearchHit = {
  id: string;
  type: 'Facility' | 'Host' | 'Alert' | 'Ticket';
  title: string;
  subtitle: string;
  path: string;
};

export type RackRow = {
  id: string;
  row: string;
  kw: number;
  utilization: number;
  status: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  time: string;
  unread: boolean;
  path: string;
};

export type CommandItem = {
  id: string;
  label: string;
  hint: string;
  to: string;
  group: string;
};
