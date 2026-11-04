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
import issues from '../data/issues.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ISSUE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(issues.map((row) => row.owner))];

export default function IssuesPage() {
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
    const rank = { Open: 4, 'In progress': 5, Blocked: 1, Closed: 2 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(issues, query, ['id', 'name', 'repo', 'labels', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Blocked');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="maint-page">
      <PageHeader
        title="Issues"
        description="Bugs, docs, and enhancements across repos. Priya Poluru triages with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Issues' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Issue template opened', variant: 'success' })}>
            New issue
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
              { label: 'Blocked', value: 'risk' },
            ]}
          />
        }
      />

      <div className="maint-filters">
        <Search
          placeholder="Search issue, repo, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="maint-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Open', value: 'Open' },
              { label: 'In progress', value: 'In progress' },
              { label: 'Blocked', value: 'Blocked' },
              { label: 'Closed', value: 'Closed' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="maint-filter-field">
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
        <div className="maint-panel">
          <EmptyState
            heading="No issues match"
            description="Clear filters or ask Maya Poluru to import from GitHub."
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
        <div className="maint-table-wrap">
          <table className="maint-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Repo</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="maint-mono">{row.id}</span>
                    <strong className="maint-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="maint-cell-title">{row.repo}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={ISSUE_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.comments}</td>
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
        heading={selected?.name ?? 'Issue'}
        size="md"
      >
        {selected ? (
          <div className="maint-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Repo', description: selected.repo },
                { term: 'Labels', description: selected.labels },
                { term: 'Comments', description: String(selected.comments) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Priority set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  repo: selected.repo,
                  labels: selected.labels,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="maint-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Assignee updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Issue closed', variant: 'info' })}>
                Close issue
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
