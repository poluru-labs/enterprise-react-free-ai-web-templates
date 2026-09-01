import { describe, expect, it } from 'vitest';
import { haystack, matchesQuery, normalizeQuery, searchCatalog, searchRecords } from './search.js';
import { searchWorkspace } from './workspaceSearch.js';

const agents = [
  { name: 'Sentinel Ops', role: 'Operations', model: 'gpt-4.1', owner: 'Jonah Poluru' },
  { name: 'Nova Support', role: 'Support', model: 'gpt-4.1-mini', owner: 'Avery Poluru' },
];

describe('search helpers', () => {
  it('normalizes queries', () => {
    expect(normalizeQuery('  Helix  ')).toBe('helix');
    expect(normalizeQuery(null)).toBe('');
  });

  it('builds a haystack from selected fields', () => {
    expect(haystack(agents[0], ['name', 'role'])).toContain('sentinel ops');
    expect(haystack(agents[0], ['name', 'role'])).toContain('operations');
  });

  it('matches and filters records', () => {
    expect(matchesQuery(agents[0], 'sentinel', ['name'])).toBe(true);
    expect(matchesQuery(agents[0], 'nova', ['name'])).toBe(false);
    expect(matchesQuery(agents[0], '', ['name'])).toBe(true);
    expect(searchRecords(agents, 'support', ['name', 'role'])).toHaveLength(1);
    expect(searchRecords(agents, 'gpt', ['model'])[0].name).toBe('Sentinel Ops');
  });

  it('searches a catalog of mixed kinds', () => {
    const catalog = [
      { kind: 'Agent', title: 'Helix Data', detail: 'Analytics', status: 'critical' },
      { kind: 'Incident', title: 'Loop on Sentinel', detail: 'INC-2204', status: 'active' },
    ];
    expect(searchCatalog(catalog, 'helix')).toHaveLength(1);
    expect(searchCatalog(catalog, '')).toHaveLength(2);
    expect(searchCatalog(catalog, 'inc-2204')[0].title).toBe('Loop on Sentinel');
  });

  it('searches the workspace fixtures', () => {
    const helix = searchWorkspace('Helix');
    expect(helix.length).toBeGreaterThan(0);
    expect(helix.some((hit) => hit.kind === 'Agent' && hit.title.includes('Helix'))).toBe(true);

    const incident = searchWorkspace('INC-2204');
    expect(incident.some((hit) => hit.kind === 'Incident')).toBe(true);

    expect(searchWorkspace('')).toEqual([]);
    expect(searchWorkspace('zz-no-such-token')).toEqual([]);
  });
});
