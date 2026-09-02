import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const tenants = [
  { id: 'harbor-legal', name: 'Harbor Legal', owner: 'Kavya Poluru', status: 'Active' },
  { id: 'northwind-support', name: 'Northwind Support', owner: 'Madhav Poluru', status: 'Active' },
  { id: 'beacon-finance', name: 'Beacon Finance', owner: 'Priya Poluru', status: 'Suspended' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Harbor Legal  ')).toBe('harbor legal');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Harbor Legal invoice', 'harbor')).toBe(true);
    expect(matchesQuery('Harbor Legal invoice', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(tenants, '  ')).toEqual(tenants);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(tenants, 'northwind', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('northwind-support');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'MRR, seats, and health' },
            { label: 'Billing', hint: 'Invoices and dunning' },
          ],
        },
      ],
      'dunning',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Billing']);
  });
});
