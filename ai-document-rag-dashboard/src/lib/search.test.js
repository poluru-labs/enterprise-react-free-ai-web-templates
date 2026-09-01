import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const docs = [
  { id: 'DOC-1284', title: 'Q3 Research Brief.pdf', source: 'PDF', owner: 'Maya Poluru' },
  { id: 'DOC-1102', title: 'Support Playbook', source: 'Notion', owner: 'Aarav Poluru' },
  { id: 'DOC-0944', title: 'Employee Handbook 2026', source: 'PDF', owner: 'Isha Poluru' },
];

const collections = [
  { id: 'col-support', name: 'Support', owner: 'Aarav Poluru', chunks: 8420 },
  { id: 'col-legal', name: 'Legal', owner: 'Maya Poluru', chunks: 3188 },
  { id: 'col-research', name: 'Research', owner: 'Isha Poluru', chunks: 12540 },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Support Playbook  ')).toBe('support playbook');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Q3 Research Brief.pdf', 'research')).toBe(true);
    expect(matchesQuery('Q3 Research Brief.pdf', 'pricing')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(docs, '  ')).toEqual(docs);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(docs, 'handbook', ['title', 'source']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('DOC-0944');
  });

  it('filters collections by name or owner', () => {
    const hits = searchRecords(collections, 'legal', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('col-legal');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Knowledge base', hint: 'Indexed documents' },
            { label: 'Collections', hint: 'Topic clusters for retrieval' },
          ],
        },
      ],
      'cluster',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Collections']);
  });
});
