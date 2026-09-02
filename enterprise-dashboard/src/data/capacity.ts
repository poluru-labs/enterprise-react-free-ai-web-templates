import type { CapacityForecast } from './types';

export const capacityForecasts: CapacityForecast[] = [
  { facility: 'Chicago ORD-1', facilityId: 'dc-ord1', current: 78, days30: 81, days90: 86, risk: 'medium' },
  { facility: 'Ashburn IAD-2', facilityId: 'dc-iad2', current: 84, days30: 87, days90: 93, risk: 'high' },
  { facility: 'Dallas DFW-1', facilityId: 'dc-dfw1', current: 91, days30: 93, days90: 97, risk: 'high' },
  { facility: 'San Jose SJC-3', facilityId: 'dc-sjc3', current: 62, days30: 64, days90: 69, risk: 'low' },
  { facility: 'Atlanta ATL-1', facilityId: 'dc-atl1', current: 71, days30: 73, days90: 78, risk: 'low' },
  { facility: 'Seattle SEA-2', facilityId: 'dc-sea2', current: 68, days30: 72, days90: 80, risk: 'medium' },
];
