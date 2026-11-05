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
import metrics from '../data/metrics.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { METRIC_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(metrics.map((row) => row.owner))];

export default function MetricsPage() {
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
    const rank = { Published: 5, Review: 4, Draft: 3, Suppressed: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(metrics, query, ['id', 'name', 'cohort', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Suppressed');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="priv-page">
      <PageHeader
        title="Aggregated metrics"
        description="K-anonymized KPIs by cohort. Maya Poluru publishes with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Metrics' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Metric draft opened', variant: 'success' })}>
            New metric
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
              { label: 'Suppressed', value: 'risk' },
            ]}
          />
        }
      />

      <div className="priv-filters">
        <Search
          placeholder="Search metric, cohort, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="priv-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Published', value: 'Published' },
              { label: 'Review', value: 'Review' },
              { label: 'Suppressed', value: 'Suppressed' },
              { label: 'Draft', value: 'Draft' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="priv-filter-field">
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
        <div className="priv-panel">
          <EmptyState
            heading="No metrics match"
            description="Clear filters or ask Kavya Poluru to import from the catalog."
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
        <div className="priv-table-wrap">
          <table className="priv-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Cohort</th>
                <th>Status</th>
                <th>k</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="priv-mono">{row.id}</span>
                    <strong className="priv-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="priv-cell-title">{row.cohort}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={METRIC_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.kThreshold}</td>
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
        heading={selected?.name ?? 'Metric'}
        size="md"
      >
        {selected ? (
          <div className="priv-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Cohort', description: selected.cohort },
                { term: 'Last value', description: selected.lastValue },
                { term: 'k-threshold', description: String(selected.kThreshold) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Confidence set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  cohort: selected.cohort,
                  kThreshold: selected.kThreshold,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="priv-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Steward updated', variant: 'success' })}>
                Save steward
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Metric published', variant: 'info' })}>
                Publish
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
