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
    const rank = { Succeeded: 5, Running: 4, Queued: 3, Failed: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(runs, query, ['id', 'name', 'study', 'owner', 'status']);
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
    <div className="repro-page">
      <PageHeader
        title="Experiment runs"
        description="Trials, checkpoints, and duration. Jonah Poluru monitors with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Runs' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Run template opened', variant: 'success' })}>
            New run
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

      <div className="repro-filters">
        <Search
          placeholder="Search run, study, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="repro-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Succeeded', value: 'Succeeded' },
              { label: 'Running', value: 'Running' },
              { label: 'Failed', value: 'Failed' },
              { label: 'Queued', value: 'Queued' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="repro-filter-field">
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
        <div className="repro-panel">
          <EmptyState
            heading="No runs match"
            description="Clear filters or ask Kavya Poluru to import from the scheduler."
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
        <div className="repro-table-wrap">
          <table className="repro-table">
            <thead>
              <tr>
                <th>Run</th>
                <th>Study</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="repro-mono">{row.id}</span>
                    <strong className="repro-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="repro-cell-title">{row.study}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={RUN_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.durationMin ? `${row.durationMin} min` : '—'}</td>
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
          <div className="repro-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Study', description: selected.study },
                { term: 'Checkpoints', description: String(selected.checkpoints) },
                { term: 'Duration', description: selected.durationMin ? `${selected.durationMin} min` : '—' },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Confidence ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  study: selected.study,
                  checkpoints: selected.checkpoints,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="repro-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Queued for reproduction', variant: 'success' })}>
                Request repro
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Artifacts linked', variant: 'info' })}>
                Link artifacts
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
