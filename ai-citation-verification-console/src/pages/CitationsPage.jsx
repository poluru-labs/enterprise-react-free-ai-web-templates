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
import citations from '../data/citations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { CITATION_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(citations.map((row) => row.owner))];

export default function CitationsPage() {
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
    const rank = { Verified: 5, Pending: 3, Disputed: 1, Retired: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(citations, query, ['id', 'name', 'journal', 'doi', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'disputed') rows = rows.filter((row) => row.status === 'Disputed');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="cite-page">
      <PageHeader
        title="Bibliography"
        description="DOI checks, journal metadata, and verification status. Priya Poluru coordinates analyst queues with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Bibliography' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Citation imported', variant: 'success' })}
          >
            Import row
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
              { label: 'Disputed', value: 'disputed' },
            ]}
          />
        }
      />

      <div className="cite-filters">
        <Search
          placeholder="Search title, DOI, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="cite-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Verified', value: 'Verified' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Disputed', value: 'Disputed' },
              { label: 'Retired', value: 'Retired' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="cite-filter-field">
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
        <div className="cite-panel">
          <EmptyState
            heading="No citations match"
            description="Clear the filters or ask Maya Poluru for a new import batch."
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
        <div className="cite-table-wrap">
          <table className="cite-table">
            <thead>
              <tr>
                <th>Citation</th>
                <th>Journal</th>
                <th>Status</th>
                <th>Confidence %</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="cite-mono">{row.id}</span>
                    <strong className="cite-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="cite-cell-title">{row.journal}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={CITATION_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.confidence}</td>
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
        heading={selected?.name ?? 'Citation'}
        size="md"
      >
        {selected ? (
          <div className="cite-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Journal', description: selected.journal },
                { term: 'DOI', description: selected.doi },
                { term: 'Confidence %', description: String(selected.confidence) },
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
                  doi: selected.doi,
                  journal: selected.journal,
                  confidence: selected.confidence,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="cite-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Citation updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Marked verified', variant: 'info' })}
              >
                Mark verified
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
