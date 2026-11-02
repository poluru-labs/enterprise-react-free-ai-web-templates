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
import datasets from '../data/datasets.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DATASET_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(datasets.map((row) => row.owner))];

export default function DatasetsPage() {
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
    const rank = { Current: 5, Staged: 3, Quarantined: 1, Archived: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(datasets, query, ['id', 'name', 'version', 'hash', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Quarantined');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="prov-page">
      <PageHeader
        title="Datasets"
        description="Version snapshots, content hashes, and row counts. Priya Poluru coordinates custody with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Datasets' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Snapshot registered', variant: 'success' })}>
            Register version
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
              { label: 'Quarantined', value: 'risk' },
            ]}
          />
        }
      />

      <div className="prov-filters">
        <Search
          placeholder="Search dataset, version, or hash"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="prov-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Current', value: 'Current' },
              { label: 'Staged', value: 'Staged' },
              { label: 'Quarantined', value: 'Quarantined' },
              { label: 'Archived', value: 'Archived' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="prov-filter-field">
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
        <div className="prov-panel">
          <EmptyState
            heading="No datasets match"
            description="Clear the filters or ask Maya Poluru for a new ingest batch."
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
        <div className="prov-table-wrap">
          <table className="prov-table">
            <thead>
              <tr>
                <th>Dataset</th>
                <th>Version</th>
                <th>Status</th>
                <th>Rows</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="prov-mono">{row.id}</span>
                    <strong className="prov-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="prov-cell-title">{row.version}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={DATASET_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.rows.toLocaleString()}</td>
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
        heading={selected?.name ?? 'Dataset'}
        size="md"
      >
        {selected ? (
          <div className="prov-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Version', description: selected.version },
                { term: 'Hash', description: selected.hash },
                { term: 'Rows', description: selected.rows.toLocaleString() },
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
                  version: selected.version,
                  hash: selected.hash,
                  rows: selected.rows,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="prov-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Custodian updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Attestation logged', variant: 'info' })}>
                Log attestation
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
