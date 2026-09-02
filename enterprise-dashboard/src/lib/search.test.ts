import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search';

const hosts = [
  { id: 'ord1-compute-042', facility: 'Chicago ORD-1', role: 'Compute', status: 'Healthy' },
  { id: 'dfw1-gpu-007', facility: 'Dallas DFW-1', role: 'GPU', status: 'Hot' },
  { id: 'sea2-net-001', facility: 'Seattle SEA-2', role: 'Network', status: 'Healthy' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Chicago ORD-1  ')).toBe('chicago ord-1');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Cooling loop B pressure', 'cooling')).toBe(true);
    expect(matchesQuery('Cooling loop B pressure', 'fiber')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(hosts, '  ')).toEqual(hosts);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(hosts, 'dallas', ['facility', 'role']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('dfw1-gpu-007');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Fleet health and KPIs' },
            { label: 'Facilities', hint: 'Campuses and capacity' },
          ],
        },
      ],
      'campuses',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Facilities']);
  });
});
