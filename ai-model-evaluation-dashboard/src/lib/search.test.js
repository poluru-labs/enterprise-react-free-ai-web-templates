import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const runs = [
  { id: 'ev_1842', name: 'aurora-safety-28', suite: 'Customer reply safety', owner: 'Meera Poluru' },
  { id: 'ev_1840', name: 'lens-invoice-31', suite: 'Invoice field accuracy', owner: 'Madhav Poluru' },
  { id: 'ev_1838', name: 'harbor-ndcg-22', suite: 'Harbor retrieval nDCG', owner: 'Arjun Poluru' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Lens Invoice  ')).toBe('lens invoice');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Customer reply safety', 'reply')).toBe(true);
    expect(matchesQuery('Customer reply safety', 'nimbus')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(runs, '  ')).toEqual(runs);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(runs, 'meera', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('ev_1842');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Score snapshot' },
            { label: 'Runs', hint: 'Eval jobs and scorecards' },
          ],
        },
      ],
      'scorecard',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Runs']);
  });
});
