import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const jobs = [
  { id: 'ing-harbor', name: 'Harbor CRM ingest', owner: 'Maya Poluru', status: 'Healthy' },
  { id: 'ing-quill', name: 'Quill Kafka consumer', owner: 'Maya Poluru', status: 'Delayed' },
  { id: 'ing-lens', name: 'Lens S3 batches', owner: 'Arjun Poluru', status: 'Failed' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Harbor CRM  ')).toBe('harbor crm');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Harbor CRM ingest', 'harbor')).toBe(true);
    expect(matchesQuery('Harbor CRM ingest', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(jobs, '  ')).toEqual(jobs);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(jobs, 'lens', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('ing-lens');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Ingestion health and volume' },
            { label: 'Lineage', hint: 'Upstream and downstream graph' },
          ],
        },
      ],
      'graph',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Lineage']);
  });
});
