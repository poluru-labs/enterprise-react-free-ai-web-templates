import type { Facility, RackRow } from './types';

export const facilities: Facility[] = [
  {
    id: 'dc-ord1',
    name: 'Chicago ORD-1',
    code: 'ORD-1',
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
    code: 'IAD-2',
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
    code: 'DFW-1',
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
    code: 'SJC-3',
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
  {
    id: 'dc-atl1',
    name: 'Atlanta ATL-1',
    code: 'ATL-1',
    region: 'US-East',
    status: 'operational',
    racks: 340,
    utilization: 71,
    powerKw: 3650,
    pue: 1.26,
    coolingTons: 1800,
    tempC: 22.1,
    humidity: 47,
  },
  {
    id: 'dc-sea2',
    name: 'Seattle SEA-2',
    code: 'SEA-2',
    region: 'US-West',
    status: 'operational',
    racks: 255,
    utilization: 68,
    powerKw: 2890,
    pue: 1.17,
    coolingTons: 1320,
    tempC: 19.8,
    humidity: 42,
  },
];

export function getFacility(id: string): Facility | undefined {
  return facilities.find((facility) => facility.id === id);
}

export function racksForFacility(facility: Facility): RackRow[] {
  const count = Math.min(8, Math.max(4, Math.round(facility.racks / 70)));
  return Array.from({ length: count }, (_, index) => {
    const hot = facility.status === 'degraded' && index === 2;
    const maint = facility.status === 'maintenance' && index === 0;
    return {
      id: `${facility.id}-r${index + 1}`,
      row: `R${String(index + 1).padStart(2, '0')}`,
      kw: Math.round((facility.powerKw / facility.racks) * 12),
      utilization: Math.min(98, Math.max(38, facility.utilization + (index % 5) * 3 - 4)),
      status: hot ? 'Hot' : maint ? 'Maintenance' : 'Healthy',
    };
  });
}

export function pueSeries(facility: Facility): number[] {
  const base = facility.pue;
  return [
    Number((base + 0.04).toFixed(2)),
    Number((base + 0.02).toFixed(2)),
    Number((base + 0.03).toFixed(2)),
    Number(base.toFixed(2)),
    Number((base - 0.01).toFixed(2)),
    Number((base + 0.01).toFixed(2)),
    Number(base.toFixed(2)),
  ];
}

export const coolingSparkline = [68, 70, 72, 69, 74, 71, 73, 70, 72];

export const fleetPue =
  facilities.reduce((sum, facility) => sum + facility.pue, 0) / facilities.length;
