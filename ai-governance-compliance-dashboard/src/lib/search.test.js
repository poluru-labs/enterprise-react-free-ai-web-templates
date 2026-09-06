import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const traces = [
  { id: 'tr_1842', model: 'Aurora Chat', user: 'Meera Poluru', status: 'ok' },
  { id: 'tr_1840', model: 'Lens Extractor', user: 'Madhav Poluru', status: 'warn' },
  { id: 'tr_1839', model: 'Aurora Chat', user: 'Priya Poluru', status: 'error' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Aurora Chat  ')).toBe('aurora chat');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Aurora Chat timeout', 'aurora')).toBe(true);
    expect(matchesQuery('Aurora Chat timeout', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(traces, '  ')).toEqual(traces);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(traces, 'lens', ['model', 'user']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('tr_1840');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Latency, spend, and incidents' },
            { label: 'Models', hint: 'Registry and serving' },
          ],
        },
      ],
      'registry',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Models']);
  });
});
