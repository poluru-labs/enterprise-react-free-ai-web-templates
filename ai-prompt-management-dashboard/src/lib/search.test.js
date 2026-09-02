import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const prompts = [
  { id: 'support-copilot', name: 'Support copilot', owner: 'Lakshmi Poluru', status: 'Live' },
  { id: 'legal-summarizer', name: 'Legal summarizer', owner: 'Venkata Poluru', status: 'Review' },
  { id: 'rag-citation', name: 'RAG citation', owner: 'Meera Poluru', status: 'Failed' },
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
    expect(searchRecords(prompts, '  ')).toEqual(prompts);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(prompts, 'legal', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('legal-summarizer');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Prompt health and playground volume' },
            { label: 'Library', hint: 'Catalog of live prompts' },
          ],
        },
      ],
      'catalog',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Library']);
  });
});
