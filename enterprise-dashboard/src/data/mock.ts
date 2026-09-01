export type Facility = {
  id: string;
  name: string;
  region: string;
  status: 'operational' | 'degraded' | 'maintenance';
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
  time: string;
  description: string;
  acknowledged: boolean;
};

export type MaintenanceWindow = {
  id: string;
  title: string;
  facility: string;
  window: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  impact: string;
  owner: string;
};

export type CapacityForecast = {
  facility: string;
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

export const facilities: Facility[] = [
  {
    id: 'dc-ord1',
    name: 'Chicago ORD-1',
    region: 'US-Central',
    status: 'operational',
    racks: 420,
    utilization: 78,
    powerKw: 4820,
    pue: 1.28,
    coolingTons: 2100,
    tempC: 22.4,
    humidity: 48,
  },
  {
    id: 'dc-iad2',
    name: 'Ashburn IAD-2',
    region: 'US-East',
    status: 'operational',
    racks: 610,
    utilization: 84,
    powerKw: 7120,
    pue: 1.22,
    coolingTons: 3200,
    tempC: 21.8,
    humidity: 45,
  },
  {
    id: 'dc-dfw1',
    name: 'Dallas DFW-1',
    region: 'US-South',
    status: 'degraded',
    racks: 280,
    utilization: 91,
    powerKw: 3980,
    pue: 1.41,
    coolingTons: 1650,
    tempC: 26.1,
    humidity: 52,
  },
  {
    id: 'dc-sjc3',
    name: 'San Jose SJC-3',
    region: 'US-West',
    status: 'maintenance',
    racks: 195,
    utilization: 62,
    powerKw: 2140,
    pue: 1.19,
    coolingTons: 980,
    tempC: 20.9,
    humidity: 44,
  },
];

export const servers: ServerRow[] = [
  {
    id: '1',
    hostname: 'ord1-compute-042',
    facility: 'Chicago ORD-1',
    role: 'Compute',
    cpu: 64,
    memory: 71,
    status: 'Healthy',
  },
  {
    id: '2',
    hostname: 'iad2-storage-018',
    facility: 'Ashburn IAD-2',
    role: 'Storage',
    cpu: 38,
    memory: 82,
    status: 'Healthy',
  },
  {
    id: '3',
    hostname: 'dfw1-gpu-007',
    facility: 'Dallas DFW-1',
    role: 'GPU',
    cpu: 94,
    memory: 88,
    status: 'Hot',
  },
  {
    id: '4',
    hostname: 'sjc3-net-003',
    facility: 'San Jose SJC-3',
    role: 'Network',
    cpu: 22,
    memory: 41,
    status: 'Maintenance',
  },
  {
    id: '5',
    hostname: 'ord1-edge-011',
    facility: 'Chicago ORD-1',
    role: 'Edge',
    cpu: 55,
    memory: 60,
    status: 'Healthy',
  },
  {
    id: '6',
    hostname: 'iad2-compute-101',
    facility: 'Ashburn IAD-2',
    role: 'Compute',
    cpu: 72,
    memory: 68,
    status: 'Healthy',
  },
  {
    id: '7',
    hostname: 'dfw1-storage-022',
    facility: 'Dallas DFW-1',
    role: 'Storage',
    cpu: 41,
    memory: 77,
    status: 'Degraded',
  },
  {
    id: '8',
    hostname: 'sjc3-gpu-002',
    facility: 'San Jose SJC-3',
    role: 'GPU',
    cpu: 18,
    memory: 25,
    status: 'Maintenance',
  },
];

export const alerts: AlertItem[] = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'Cooling loop B pressure below threshold',
    facility: 'Dallas DFW-1',
    time: '4 min ago',
    description:
      'Secondary chilled-water loop pressure dropped to 18 PSI (threshold 28 PSI). CRAC units in zone B are compensating.',
    acknowledged: false,
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Rack A12 PDU load at 92%',
    facility: 'Ashburn IAD-2',
    time: '18 min ago',
    description: 'Branch circuit A12-2 approaching breaker rating. Recommend load rebalance within 24h.',
    acknowledged: false,
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Scheduled UPS battery test completed',
    facility: 'Chicago ORD-1',
    time: '1 hr ago',
    description: 'Quarterly discharge test passed. Runtime at 100% load: 14.2 minutes.',
    acknowledged: true,
  },
  {
    id: 'a4',
    severity: 'warning',
    title: 'Fiber path redundancy reduced to single link',
    facility: 'San Jose SJC-3',
    time: '2 hr ago',
    description: 'Westbound dark fiber path offline for planned splice. Eastbound remains active.',
    acknowledged: false,
  },
  {
    id: 'a5',
    severity: 'info',
    title: 'Generator exercise completed',
    facility: 'Ashburn IAD-2',
    time: '5 hr ago',
    description: 'Monthly genset run logged normal oil pressure and coolant temps on all four units.',
    acknowledged: true,
  },
  {
    id: 'a6',
    severity: 'critical',
    title: 'Hot aisle containment breach detected',
    facility: 'Dallas DFW-1',
    time: '6 hr ago',
    description: 'Door sensors on row R7 report open > 15 minutes during peak load window.',
    acknowledged: false,
  },
];

export const maintenanceWindows: MaintenanceWindow[] = [
  {
    id: 'm1',
    title: 'CRAC coil cleaning — Zone B',
    facility: 'Dallas DFW-1',
    window: 'Today · 22:00–02:00 CT',
    status: 'in-progress',
    impact: 'Partial cooling redundancy',
    owner: 'Facilities Ops',
  },
  {
    id: 'm2',
    title: 'UPS firmware rollup',
    facility: 'Chicago ORD-1',
    window: 'Sat · 01:00–03:00 CT',
    status: 'scheduled',
    impact: 'Brief transfer to genset',
    owner: 'Power Systems',
  },
  {
    id: 'm3',
    title: 'Spine switch OS upgrade',
    facility: 'Ashburn IAD-2',
    window: 'Sun · 00:30–02:30 ET',
    status: 'scheduled',
    impact: 'Hitless with MLAG',
    owner: 'Network Eng',
  },
  {
    id: 'm4',
    title: 'Generator load bank test',
    facility: 'San Jose SJC-3',
    window: 'Completed · Mon',
    status: 'completed',
    impact: 'None to IT load',
    owner: 'Facilities Ops',
  },
];

export const capacityForecasts: CapacityForecast[] = [
  { facility: 'Chicago ORD-1', current: 78, days30: 81, days90: 86, risk: 'medium' },
  { facility: 'Ashburn IAD-2', current: 84, days30: 87, days90: 93, risk: 'high' },
  { facility: 'Dallas DFW-1', current: 91, days30: 93, days90: 97, risk: 'high' },
  { facility: 'San Jose SJC-3', current: 62, days30: 64, days90: 69, risk: 'low' },
];

export const tickets: Ticket[] = [
  {
    id: 'INC-20481',
    subject: 'Investigate cooling pressure drop',
    priority: 'P1',
    facility: 'Dallas DFW-1',
    assignee: 'Jordan Lee',
    status: 'In progress',
  },
  {
    id: 'INC-20466',
    subject: 'Rebalance rack A12 PDU load',
    priority: 'P2',
    facility: 'Ashburn IAD-2',
    assignee: 'Sam Ortiz',
    status: 'Open',
  },
  {
    id: 'CHG-11802',
    subject: 'Approve UPS firmware change',
    priority: 'P3',
    facility: 'Chicago ORD-1',
    assignee: 'Alex Rivera',
    status: 'Open',
  },
  {
    id: 'INC-20412',
    subject: 'Restore westbound fiber path',
    priority: 'P2',
    facility: 'San Jose SJC-3',
    assignee: 'Priya Shah',
    status: 'In progress',
  },
];

export const activityTimeline = [
  {
    title: 'Cooling alert escalated',
    description: 'DFW-1 loop B pressure — P1 ticket opened',
    timestamp: '4 min ago',
    status: 'current' as const,
  },
  {
    title: 'Capacity forecast refreshed',
    description: 'IAD-2 projected to 93% in 90 days',
    timestamp: '42 min ago',
    status: 'complete' as const,
  },
  {
    title: 'Maintenance window started',
    description: 'CRAC coil cleaning at DFW-1 Zone B',
    timestamp: '1 hr ago',
    status: 'complete' as const,
  },
  {
    title: 'Generator exercise OK',
    description: 'IAD-2 monthly genset run passed',
    timestamp: '5 hr ago',
    status: 'complete' as const,
  },
];

export const notifications = [
  {
    id: 'n1',
    title: '2 critical alerts need attention',
    time: 'Just now',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Maintenance window started at DFW-1',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Weekly capacity report ready',
    time: 'Yesterday',
    unread: false,
  },
];

export const overviewStats = [
  {
    label: 'Active facilities',
    value: '12',
    trend: 'up' as const,
    trendValue: '+1',
    hint: 'Across 4 regions',
  },
  {
    label: 'Rack utilization',
    value: '79%',
    trend: 'up' as const,
    trendValue: '+2.4%',
    hint: 'Fleet average',
  },
  {
    label: 'Power draw',
    value: '18.1 MW',
    trend: 'flat' as const,
    trendValue: '0%',
    hint: 'Last 24 hours',
  },
  {
    label: 'Open alerts',
    value: '7',
    trend: 'down' as const,
    trendValue: '-3',
    hint: '2 critical',
  },
];

export const powerByFacility = facilities.map((f) => ({
  facility: f.name,
  itLoadKw: Math.round(f.powerKw / f.pue),
  facilityKw: f.powerKw,
  pue: f.pue,
  coolingUtil: Math.min(98, Math.round(f.utilization * 0.92 + (f.status === 'degraded' ? 8 : 0))),
}));

export function buildSearchIndex(): SearchHit[] {
  return [
    ...facilities.map((f) => ({
      id: f.id,
      type: 'Facility' as const,
      title: f.name,
      subtitle: `${f.region} · ${f.status}`,
      path: '/facilities',
    })),
    ...servers.map((s) => ({
      id: s.id,
      type: 'Host' as const,
      title: s.hostname,
      subtitle: `${s.facility} · ${s.role}`,
      path: '/infrastructure',
    })),
    ...alerts.map((a) => ({
      id: a.id,
      type: 'Alert' as const,
      title: a.title,
      subtitle: `${a.severity} · ${a.facility}`,
      path: '/alerts',
    })),
    ...tickets.map((t) => ({
      id: t.id,
      type: 'Ticket' as const,
      title: `${t.id}: ${t.subject}`,
      subtitle: `${t.priority} · ${t.status}`,
      path: '/tickets',
    })),
  ];
}
