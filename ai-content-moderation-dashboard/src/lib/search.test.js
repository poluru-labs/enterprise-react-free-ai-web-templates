import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const queue = [
  { id: 'Q-18421', title: 'Hate raid on livestream', source: 'livestream', category: 'hate' },
  { id: 'Q-18409', title: 'Sexual content in ad creative', source: 'ads', category: 'sexual' },
  { id: 'Q-18388', title: 'Crypto scam in marketplace', source: 'ugc', category: 'scam' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Hate Raid  ')).toBe('hate raid');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Hate raid on livestream', 'raid')).toBe(true);
    expect(matchesQuery('Hate raid on livestream', 'spam')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(queue, '  ')).toEqual(queue);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(queue, 'scam', ['title', 'category']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('Q-18388');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Queue', hint: 'Items waiting on humans' },
            { label: 'Policies', hint: 'Enforcement modes' },
          ],
        },
      ],
      'enforce',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Policies']);
  });
});
