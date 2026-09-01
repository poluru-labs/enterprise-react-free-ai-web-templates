import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const runs = [
  { id: 'run_harbor', name: 'harbor-encoder-v3', owner: 'Kavya Poluru', status: 'Running' },
  { id: 'run_nimbus', name: 'nimbus-ranker-12', owner: 'Arjun Poluru', status: 'Queued' },
  { id: 'run_lumen', name: 'lumen-ehr-ft', owner: 'Jordan Poluru', status: 'Failed' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Harbor Encoder  ')).toBe('harbor encoder');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('harbor-encoder-v3', 'harbor')).toBe(true);
    expect(matchesQuery('harbor-encoder-v3', 'nimbus')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(runs, '  ')).toEqual(runs);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(runs, 'jordan', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('run_lumen');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Runs', hint: 'Training jobs in flight' },
            { label: 'Clusters', hint: 'Regional GPU capacity' },
          ],
        },
      ],
      'gpu',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Clusters']);
  });
});
