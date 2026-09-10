import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const flights = [
  { id: 'cmp-autumn', name: 'Autumn enrollment', owner: 'Kavya Poluru', status: 'Live' },
  { id: 'cmp-webinar', name: 'Trust webinar', owner: 'Maya Poluru', status: 'Live' },
  { id: 'cmp-search', name: 'Brand search', owner: 'Ishaan Poluru', status: 'Watch' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Autumn enrollment  ')).toBe('autumn enrollment');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Autumn enrollment', 'autumn')).toBe(true);
    expect(matchesQuery('Autumn enrollment', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(flights, '  ')).toEqual(flights);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(flights, 'search', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('cmp-search');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Spend, ROAS, and live flights' },
            { label: 'Automation', hint: 'Journeys and triggers' },
          ],
        },
      ],
      'journeys',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Automation']);
  });
});
