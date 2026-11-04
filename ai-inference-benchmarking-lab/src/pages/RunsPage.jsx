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
import runs from '../data/runs.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { RUN_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(runs.map((row) => row.owner))];

export default function RunsPage() {
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
    const rank = { Complete: 5, Running: 4, Queued: 3, Failed: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(runs, query, ['id', 'name', 'suite', 'host', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Failed');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bench-page">
      <PageHeader
        title="Runs"
        description="Job history, hosts, and outcomes. Jonah Poluru owns the run desk with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Runs' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Run queued', variant: 'success' })}>
            Queue run
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
              { label: 'Failed', value: 'risk' },
            ]}
          />
        }
      />

      <div className="bench-filters">
        <Search
          placeholder="Search run id, suite, or host"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="bench-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Complete', value: 'Complete' },
              { label: 'Running', value: 'Running' },
              { label: 'Queued', value: 'Queued' },
              { label: 'Failed', value: 'Failed' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="bench-filter-field">
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
        <div className="bench-panel">
          <EmptyState
            heading="No runs match"
            description="Clear filters or ask Priya Poluru to schedule a suite."
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
        <div className="bench-table-wrap">
          <table className="bench-table">
            <thead>
              <tr>
                <th>Run</th>
                <th>Suite</th>
                <th>Status</th>
                <th>Duration (min)</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="bench-mono">{row.id}</span>
                    <strong className="bench-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="bench-cell-title">{row.suite}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={RUN_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.durationMin}</td>
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
        heading={selected?.name ?? 'Run'}
        size="md"
      >
        {selected ? (
          <div className="bench-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Suite', description: selected.suite },
                { term: 'Host', description: selected.host },
                { term: 'Duration (min)', description: String(selected.durationMin) },
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
                  suite: selected.suite,
                  host: selected.host,
                  durationMin: selected.durationMin,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="bench-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Assignee updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Re-run queued', variant: 'info' })}>
                Re-run
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
