import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Autocomplete,
  Badge,
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
import findings from '../data/findings.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { FINDING_STATUS, SEVERITY } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(findings.map((row) => row.owner))];

export default function FindingsPage() {
  const [params] = useSearchParams();
  const queryFromUrl = params.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [severityFilter, setSeverityFilter] = useState('all');
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
    const rank = { Critical: 5, Serious: 4, Moderate: 3, Minor: 2 };
    setScore(selected ? rank[selected.severity] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(findings, query, ['id', 'rule', 'page', 'owner', 'severity']);
    if (severityFilter !== 'all') rows = rows.filter((row) => row.severity === severityFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'open') rows = rows.filter((row) => row.status === 'Open');
    return rows;
  }, [query, severityFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="acc-page">
      <PageHeader
        title="Findings"
        description="WCAG violations by page, severity, and assignee. Maya Poluru owns storefront fixes with Nina Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Findings' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Finding logged', variant: 'success' })}
          >
            Log finding
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
              { label: 'Open', value: 'open' },
            ]}
          />
        }
      />

      <div className="acc-filters">
        <Search
          placeholder="Search finding, page, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="acc-filter-field">
          <Select
            label="Severity"
            options={[
              { label: 'All severities', value: 'all' },
              { label: 'Critical', value: 'Critical' },
              { label: 'Serious', value: 'Serious' },
              { label: 'Moderate', value: 'Moderate' },
              { label: 'Minor', value: 'Minor' },
            ]}
            value={severityFilter}
            onChange={(event) => {
              setSeverityFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="acc-filter-field">
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
        <div className="acc-panel">
          <EmptyState
            heading="No findings match"
            description="Clear the filters or ask Maya Poluru for a new job."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setSeverityFilter('all');
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
        <div className="acc-table-wrap">
          <table className="acc-table">
            <thead>
              <tr>
                <th>Finding</th>
                <th>Page</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="acc-mono">{row.id}</span>
                    <strong className="acc-cell-title">{row.rule}</strong>
                  </td>
                  <td>
                    <span className="acc-cell-title">{row.page}</span>
                  </td>
                  <td>
                    <Status label={row.severity} variant={SEVERITY[row.severity] ?? 'neutral'} />
                  </td>
                  <td>
                    <Status label={row.status} variant={FINDING_STATUS[row.status] ?? 'neutral'} />
                  </td>
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
        heading={selected?.rule ?? 'Finding'}
        size="md"
      >
        {selected ? (
          <div className="acc-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Page', description: selected.page },
                { term: 'Severity', description: selected.severity },
                { term: 'Rule', description: selected.rule },
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
                  rule: selected.rule,
                  page: selected.page,
                  severity: selected.severity,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="acc-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Finding updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Marked fixed', variant: 'info' })}
              >
                Mark fixed
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
