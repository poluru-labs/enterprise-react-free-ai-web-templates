import { describe, expect, it } from 'vitest';
import { haystack, matchesQuery, normalizeQuery, searchCatalog, searchRecords } from './search.js';

const cameras = [
  { code: 'DAL-GATE-03', name: 'Overflow lane', site: 'Dallas gate', status: 'offline' },
  { code: 'CHI-DOCK-04', name: 'Dock 4 interior', site: 'Chicago dock', status: 'live' },
];

describe('search helpers', () => {
  it('normalizes queries', () => {
    expect(normalizeQuery('  Helmet  ')).toBe('helmet');
    expect(normalizeQuery(null)).toBe('');
  });

  it('builds a haystack from selected fields', () => {
    expect(haystack(cameras[0], ['code', 'site'])).toContain('dal-gate-03');
    expect(haystack(cameras[0], ['code', 'site'])).toContain('dallas gate');
  });

  it('matches and filters records', () => {
    expect(matchesQuery(cameras[0], 'dallas', ['site'])).toBe(true);
    expect(matchesQuery(cameras[0], 'austin', ['site'])).toBe(false);
    expect(matchesQuery(cameras[0], '', ['site'])).toBe(true);
    expect(searchRecords(cameras, 'dock', ['name', 'site'])).toHaveLength(1);
    expect(searchRecords(cameras, 'gate', ['code', 'site'])[0].code).toBe('DAL-GATE-03');
  });

  it('searches a catalog of mixed kinds', () => {
    const catalog = [
      { kind: 'Camera', title: 'DAL-GATE-03', detail: 'Dallas gate', status: 'offline' },
      { kind: 'Model', title: 'anpr-gate', detail: 'Plate recognition', status: 'canary' },
    ];
    expect(searchCatalog(catalog, 'anpr')).toHaveLength(1);
    expect(searchCatalog(catalog, '')).toHaveLength(0);
    expect(searchCatalog(catalog, 'offline')[0].title).toBe('DAL-GATE-03');
  });
});
