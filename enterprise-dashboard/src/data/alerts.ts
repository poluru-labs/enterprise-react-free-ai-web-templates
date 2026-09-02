import { useSyncExternalStore } from 'react';
import type { AlertItem } from './types';

const seedAlerts: AlertItem[] = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'Cooling loop B pressure below threshold',
    facility: 'Dallas DFW-1',
    facilityId: 'dc-dfw1',
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
    facilityId: 'dc-iad2',
    time: '18 min ago',
    description: 'Branch circuit A12-2 approaching breaker rating. Recommend load rebalance within 24h.',
    acknowledged: false,
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Scheduled UPS battery test completed',
    facility: 'Chicago ORD-1',
    facilityId: 'dc-ord1',
    time: '1 hr ago',
    description: 'Quarterly discharge test passed. Runtime at 100% load: 14.2 minutes.',
    acknowledged: true,
  },
  {
    id: 'a4',
    severity: 'warning',
    title: 'Fiber path redundancy reduced to single link',
    facility: 'San Jose SJC-3',
    facilityId: 'dc-sjc3',
    time: '2 hr ago',
    description: 'Westbound dark fiber path offline for planned splice. Eastbound remains active.',
    acknowledged: false,
  },
  {
    id: 'a5',
    severity: 'info',
    title: 'Generator exercise completed',
    facility: 'Ashburn IAD-2',
    facilityId: 'dc-iad2',
    time: '5 hr ago',
    description: 'Monthly genset run logged normal oil pressure and coolant temps on all four units.',
    acknowledged: true,
  },
  {
    id: 'a6',
    severity: 'critical',
    title: 'Hot aisle containment breach detected',
    facility: 'Dallas DFW-1',
    facilityId: 'dc-dfw1',
    time: '6 hr ago',
    description: 'Door sensors on row R7 report open > 15 minutes during peak load window.',
    acknowledged: false,
  },
  {
    id: 'a7',
    severity: 'warning',
    title: 'Chiller plant approaching N+0',
    facility: 'Atlanta ATL-1',
    facilityId: 'dc-atl1',
    time: '8 hr ago',
    description: 'Chiller 3 offline for coil service. Remaining plant covers IT load with reduced redundancy.',
    acknowledged: false,
  },
  {
    id: 'a8',
    severity: 'info',
    title: 'Hydro power mix at 94%',
    facility: 'Seattle SEA-2',
    facilityId: 'dc-sea2',
    time: '9 hr ago',
    description: 'Utility feed reporting high hydro share. PUE holding at 1.17.',
    acknowledged: true,
  },
  {
    id: 'a9',
    severity: 'warning',
    title: 'Row R3 intake temperature rising',
    facility: 'Chicago ORD-1',
    facilityId: 'dc-ord1',
    time: '11 hr ago',
    description: 'Average intake climbed 1.8°C over 40 minutes. CRAC-04 fan speed increased automatically.',
    acknowledged: false,
  },
];

let alertState = seedAlerts.map((item) => ({ ...item }));
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getAlerts(): AlertItem[] {
  return alertState;
}

export function subscribeAlerts(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function ackAlert(id: string): AlertItem | undefined {
  const current = alertState.find((item) => item.id === id);
  if (!current || current.acknowledged) return current;
  alertState = alertState.map((item) => (item.id === id ? { ...item, acknowledged: true } : item));
  emit();
  return alertState.find((item) => item.id === id);
}

export function ackFirstCritical(): AlertItem | null {
  const first = alertState.find((item) => item.severity === 'critical' && !item.acknowledged);
  if (!first) return null;
  ackAlert(first.id);
  return { ...first, acknowledged: true };
}

export function ackAllAlerts() {
  alertState = alertState.map((item) => ({ ...item, acknowledged: true }));
  emit();
}

export function useAlerts() {
  return useSyncExternalStore(subscribeAlerts, getAlerts, getAlerts);
}

export const alerts = seedAlerts;
