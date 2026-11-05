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
import queries from '../data/queries.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { QUERY_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(queries.map((row) => row.owner))];

export default function QueriesPage() {
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
    const rank = { Healthy: 5, Sampling: 4, Degraded: 2, Failed: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(queries, query, ['id', 'name', 'collection', 'owner', 'status']);
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
    <div className="rq-page">
      <PageHeader
        title="Query log"
        description="Session traces and hit counts. Jonah Poluru monitors latency with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Query log' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Sample export queued', variant: 'success' })}>
            Export sample
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

      <div className="rq-filters">
        <Search
          placeholder="Search query, collection, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="rq-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Healthy', value: 'Healthy' },
              { label: 'Degraded', value: 'Degraded' },
              { label: 'Failed', value: 'Failed' },
              { label: 'Sampling', value: 'Sampling' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="rq-filter-field">
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
        <div className="rq-panel">
          <EmptyState
            heading="No queries match"
            description="Clear filters or ask Kavya Poluru to widen the time window."
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
        <div className="rq-table-wrap">
          <table className="rq-table">
            <thead>
              <tr>
                <th>Query</th>
                <th>Collection</th>
                <th>Status</th>
                <th>Latency</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="rq-mono">{row.id}</span>
                    <strong className="rq-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="rq-cell-title">{row.collection}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={QUERY_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.latencyMs ? `${row.latencyMs} ms` : '—'}</td>
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
        heading={selected?.name ?? 'Query'}
        size="md"
      >
        {selected ? (
          <div className="rq-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Collection', description: selected.collection },
                { term: 'Hits', description: String(selected.hits) },
                { term: 'Latency', description: selected.latencyMs ? `${selected.latencyMs} ms` : '—' },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Relevance score ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  collection: selected.collection,
                  hits: selected.hits,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="rq-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Sent to review queue', variant: 'success' })}>
                Queue review
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Marked sampled', variant: 'info' })}>
                Mark sampled
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
