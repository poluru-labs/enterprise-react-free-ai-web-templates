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
  ProgressBar,
  Rating,
  Search,
  SegmentedControl,
  Select,
  Status,
  Tag,
  Toolbar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import recommendations from '../data/recommendations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { REC_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(recommendations.map((row) => row.owner))];

export default function RecommendationsPage() {
  const [params] = useSearchParams();
  const queryFromUrl = params.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [surface, setSurface] = useState('all');
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
    setScore(selected?.quality ?? 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(recommendations, query, ['id', 'slot', 'model', 'owner', 'surface']);
    if (surface !== 'all') rows = rows.filter((row) => row.surface === surface);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'live') rows = rows.filter((row) => row.status === 'Live');
    return rows;
  }, [query, surface, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rec-page">
      <PageHeader
        title="Recommendations"
        description="Ranked slots by surface and model. Maya Poluru owns in-app placement."
        crumbs={[BREADCRUMB_ROOT, { label: 'Recommendations' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Slot draft added', variant: 'success' })}
          >
            New slot
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
              { label: 'Live', value: 'live' },
            ]}
          />
        }
      />

      <div className="rec-filters">
        <Search
          placeholder="Search slot, model, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="rec-filter-field">
          <Select
            label="Surface"
            options={[
              { label: 'All surfaces', value: 'all' },
              { label: 'Home', value: 'Home' },
              { label: 'Product', value: 'Product' },
              { label: 'Cart', value: 'Cart' },
              { label: 'Email', value: 'Email' },
              { label: 'Search', value: 'Search' },
              { label: 'Category', value: 'Category' },
              { label: 'Order', value: 'Order' },
              { label: 'Push', value: 'Push' },
            ]}
            value={surface}
            onChange={(event) => {
              setSurface(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="rec-filter-field">
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
        <div className="rec-panel">
          <EmptyState
            heading="No slots match"
            description="Clear the filters or ask Maya Poluru for a new placement."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setSurface('all');
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
        <div className="rec-table-wrap">
          <table className="rec-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Surface</th>
                <th>Model</th>
                <th>CTR</th>
                <th>Conversion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="rec-mono">{row.id}</span>
                    <strong className="rec-cell-title">{row.slot}</strong>
                  </td>
                  <td>
                    <Badge label={row.surface} variant="brand" soft size="sm" />
                  </td>
                  <td>
                    <Tag label={row.model} variant="neutral" />
                  </td>
                  <td>{formatPercent(row.ctr)}</td>
                  <td>
                    <div className="rec-score-cell">
                      <span>{formatPercent(row.conversion)}</span>
                      <ProgressBar value={row.conversion} max={8} />
                    </div>
                  </td>
                  <td>
                    <Status label={row.status} variant={REC_STATUS[row.status] ?? 'neutral'} />
                  </td>
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
        heading={selected?.slot ?? 'Slot'}
        size="md"
      >
        {selected ? (
          <div className="rec-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Surface', description: selected.surface },
                { term: 'Model', description: selected.model },
                { term: 'CTR', description: formatPercent(selected.ctr) },
                { term: 'Conversion', description: formatPercent(selected.conversion) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Quality set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  slot: selected.slot,
                  surface: selected.surface,
                  model: selected.model,
                  ctr: selected.ctr,
                  conversion: selected.conversion,
                },
                null,
                2,
              )}
            />
            <div className="rec-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Ranking saved', variant: 'success' })}>
                Save ranking
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Holdout enabled', variant: 'info' })}
              >
                Enable holdout
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
