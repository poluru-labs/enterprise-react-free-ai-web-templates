import { alerts } from './alerts';
import { facilities } from './facilities';
import { tickets } from './tickets';

export const overviewStats = [
  {
    label: 'Active facilities',
    value: '12',
    trend: 'up' as const,
    trendValue: '+1',
    hint: 'Across 4 regions',
    tone: 'brand' as const,
    sparkline: [10, 10, 11, 11, 11, 12, 12],
  },
  {
    label: 'Rack utilization',
    value: '76%',
    trend: 'up' as const,
    trendValue: '+1.8%',
    hint: 'Fleet average',
    tone: 'info' as const,
    sparkline: [71, 72, 73, 74, 75, 75, 76],
  },
  {
    label: 'Power draw',
    value: '24.6 MW',
    trend: 'flat' as const,
    trendValue: '0%',
    hint: 'Last 24 hours',
    tone: 'warning' as const,
    sparkline: [24.1, 24.4, 24.8, 24.6, 24.5, 24.7, 24.6],
  },
  {
    label: 'Open alerts',
    value: String(alerts.filter((item) => !item.acknowledged).length),
    trend: 'down' as const,
    trendValue: '-2',
    hint: `${alerts.filter((item) => item.severity === 'critical' && !item.acknowledged).length} critical`,
    tone: 'danger' as const,
    sparkline: [9, 8, 8, 7, 7, 6, 6],
  },
  {
    label: 'Fleet PUE',
    value: (
      facilities.reduce((sum, facility) => sum + facility.pue, 0) / facilities.length
    ).toFixed(2),
    trend: 'down' as const,
    trendValue: '-0.03',
    hint: 'Better than last month',
    tone: 'success' as const,
    sparkline: [1.32, 1.3, 1.29, 1.28, 1.27, 1.26, 1.26],
  },
  {
    label: 'Open tickets',
    value: String(tickets.filter((ticket) => ticket.status !== 'Resolved').length),
    trend: 'up' as const,
    trendValue: '+2',
    hint: 'Incidents and changes',
    tone: 'info' as const,
    sparkline: [5, 5, 6, 6, 7, 8, 8],
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

export const regionalHealth = [
  {
    region: 'US-Central',
    sites: facilities.filter((facility) => facility.region === 'US-Central').length,
    status: 'operational' as const,
    utilization: 78,
    note: 'ORD-1 intake watch on row R3',
  },
  {
    region: 'US-East',
    sites: facilities.filter((facility) => facility.region === 'US-East').length,
    status: 'operational' as const,
    utilization: 78,
    note: 'IAD-2 PDU rebalance queued',
  },
  {
    region: 'US-South',
    sites: facilities.filter((facility) => facility.region === 'US-South').length,
    status: 'degraded' as const,
    utilization: 91,
    note: 'DFW-1 cooling loop B critical',
  },
  {
    region: 'US-West',
    sites: facilities.filter((facility) => facility.region === 'US-West').length,
    status: 'maintenance' as const,
    utilization: 65,
    note: 'SJC-3 fiber splice in progress',
  },
];
