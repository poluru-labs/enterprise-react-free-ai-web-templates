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
import corpus from '../data/corpus.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { CORPUS_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(corpus.map((row) => row.owner))];

export default function CorpusPage() {
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
    const rank = { Mapped: 5, Review: 4, Draft: 3, Unlinked: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(corpus, query, ['id', 'name', 'venue', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Unlinked');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="lit-page">
      <PageHeader
        title="Corpus mapping"
        description="Papers indexed by venue and mapping completeness. Maya Poluru stewards with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Corpus' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Import batch queued', variant: 'success' })}>
            Import papers
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
              { label: 'Unlinked', value: 'risk' },
            ]}
          />
        }
      />

      <div className="lit-filters">
        <Search
          placeholder="Search paper, venue, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="lit-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Mapped', value: 'Mapped' },
              { label: 'Review', value: 'Review' },
              { label: 'Unlinked', value: 'Unlinked' },
              { label: 'Draft', value: 'Draft' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="lit-filter-field">
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
        <div className="lit-panel">
          <EmptyState
            heading="No papers match"
            description="Clear filters or ask Kavya Poluru to widen the import set."
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
        <div className="lit-table-wrap">
          <table className="lit-table">
            <thead>
              <tr>
                <th>Paper</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Mapped</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="lit-mono">{row.id}</span>
                    <strong className="lit-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="lit-cell-title">{row.venue}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={CORPUS_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.mappedPct}%</td>
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
        heading={selected?.name ?? 'Paper'}
        size="md"
      >
        {selected ? (
          <div className="lit-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Venue', description: selected.venue },
                { term: 'Year', description: String(selected.year) },
                { term: 'Mapped', description: `${selected.mappedPct}%` },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Mapping quality ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  venue: selected.venue,
                  year: selected.year,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="lit-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Sent to curation', variant: 'success' })}>
                Queue curation
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Cluster suggested', variant: 'info' })}>
                Suggest cluster
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
