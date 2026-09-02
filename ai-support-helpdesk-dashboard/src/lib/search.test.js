import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const tickets = [
  { id: 'TKT-1847', subject: 'Charged after trial', customer: 'Northwind Labs', assignee: 'Unassigned' },
  { id: 'TKT-1846', subject: 'SSO SAML loop', customer: 'Contoso Health', assignee: 'Meera Poluru' },
  { id: 'TKT-1840', subject: 'Seat invite bounced', customer: 'Atlas Dental', assignee: 'Unassigned' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Northwind Labs  ')).toBe('northwind labs');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Charged after trial', 'trial')).toBe(true);
    expect(matchesQuery('Charged after trial', 'sso')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(tickets, '  ')).toEqual(tickets);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(tickets, 'sso', ['subject', 'customer']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('TKT-1846');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Inbox', hint: 'Live working queue' },
            { label: 'Macros', hint: 'Canned replies' },
          ],
        },
      ],
      'canned',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Macros']);
  });
});
