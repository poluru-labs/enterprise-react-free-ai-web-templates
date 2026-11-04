import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  CodeSnippet,
  DescriptionList,
  Drawer,
  EmptyState,
  Pagination,
  Rating,
  Search,
  SegmentedControl,
  Select,
  Status,
  Toolbar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import schemas from '../data/schemas.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { SCHEMA_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(schemas.map((row) => row.owner))];

export default function SchemasPage() {
  const [params] = useSearchParams();
  const queryFromUrl = params.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [statusFilter, setStatusFilter] = useState('all');
  const [owner, setOwner] = useState('');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(4);

  useEffect(() => {
    setQuery(queryFromUrl);
    setPage(1);
  }, [queryFromUrl]);

  useEffect(() => {
    const rank = { Passing: 5, Warning: 3, Failing: 1, Skipped: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(schemas, query, ['id', 'name', 'version', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Failing');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="qual-page">
      <PageHeader
        title="Schemas"
        description="Column contracts, type checks, and pass rates. Maya Poluru owns schema definitions with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Schemas' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Schema run queued', variant: 'success' })}>
            Run checks
          </Button>
        }
      />

      <Toolbar
        bordered
        start={
          <SegmentedControl
            size="sm"
            value={view}
            onChange={(value) => {
              setView(value);
              setPage(1);
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Failing', value: 'risk' },
            ]}
          />
        }
      />

      <div className="qual-filters">
        <Search
          placeholder="Search table, version, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="qual-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Passing', value: 'Passing' },
              { label: 'Warning', value: 'Warning' },
              { label: 'Failing', value: 'Failing' },
              { label: 'Skipped', value: 'Skipped' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="qual-filter-field">
          <Autocomplete
            label="Owner"
            placeholder="Filter by owner"
            value={owner}
            suggestions={OWNERS}
            onChange={setOwner}
            onSelect={(value) => {
              setOwner(value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="qual-panel">
          <EmptyState
            heading="No schemas match"
            description="Clear the filters or ask Priya Poluru to schedule a full scan."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setStatusFilter('all');
                  setOwner('');
                  setView('all');
                }}
              >
                Clear filters
              </Button>
            }
          />
        </div>
      ) : (
        <div className="qual-table-wrap">
          <table className="qual-table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Version</th>
                <th>Status</th>
                <th>Pass %</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="qual-mono">{row.id}</span>
                    <strong className="qual-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="qual-cell-title">{row.version}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={SCHEMA_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.passRate}</td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 ? (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onChange={setPage} />
      ) : null}

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        heading={selected?.name ?? 'Schema'}
        size="md"
      >
        {selected ? (
          <div className="qual-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Version', description: selected.version },
                { term: 'Columns', description: String(selected.columns) },
                { term: 'Pass rate %', description: String(selected.passRate) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Review priority set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  name: selected.name,
                  version: selected.version,
                  passRate: selected.passRate,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="qual-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Owner updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Re-run scheduled', variant: 'info' })}>
                Re-run checks
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
