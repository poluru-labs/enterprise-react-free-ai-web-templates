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
import shipments from '../data/shipments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { SHIP_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(shipments.map((row) => row.owner))];

export default function ShipmentsPage() {
  const [params] = useSearchParams();
  const queryFromUrl = params.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [mode, setMode] = useState('all');
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
    setScore(selected ? Math.min(5, Math.ceil(selected.fill / 20)) : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(shipments, query, ['id', 'name', 'mode', 'owner', 'lane']);
    if (mode !== 'all') rows = rows.filter((row) => row.mode === mode);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'transit') rows = rows.filter((row) => row.status === 'In transit');
    return rows;
  }, [query, mode, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="sct-page">
      <PageHeader
        title="Shipments"
        description="Lanes, modes, and ETAs. Rahul Poluru owns in-transit exceptions with Maya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Shipments' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Shipment logged', variant: 'success' })}
          >
            New shipment
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
              { label: 'In transit', value: 'transit' },
            ]}
          />
        }
      />

      <div className="sct-filters">
        <Search
          placeholder="Search shipment, lane, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="sct-filter-field">
          <Select
            label="Mode"
            options={[
              { label: 'All modes', value: 'all' },
              { label: 'Ocean', value: 'Ocean' },
              { label: 'Road', value: 'Road' },
              { label: 'Air', value: 'Air' },
              { label: 'Rail', value: 'Rail' },
            ]}
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="sct-filter-field">
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
        <div className="sct-panel">
          <EmptyState
            heading="No shipments match"
            description="Clear the filters or ask Maya Poluru for a new lane."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setMode('all');
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
        <div className="sct-table-wrap">
          <table className="sct-table">
            <thead>
              <tr>
                <th>Shipment</th>
                <th>Lane</th>
                <th>Mode</th>
                <th>Fill %</th>
                <th>ETA (d)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="sct-mono">{row.id}</span>
                    <strong className="sct-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <Badge label={row.lane} variant="brand" soft size="sm" />
                  </td>
                  <td>
                    <Tag label={row.mode} variant="neutral" />
                  </td>
                  <td>{formatPercent(row.fill, 0)}</td>
                  <td>
                    <div className="sct-score-cell">
                      <span>{String(row.etaDays)}</span>
                      <ProgressBar value={row.fill} max={100} />
                    </div>
                  </td>
                  <td>
                    <Status label={row.status} variant={SHIP_STATUS[row.status] ?? 'neutral'} />
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
        heading={selected?.name ?? 'Shipment'}
        size="md"
      >
        {selected ? (
          <div className="sct-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Lane', description: selected.lane },
                { term: 'Model', description: selected.mode },
                { term: 'Fill', description: formatPercent(selected.fill) },
                { term: 'ETA', description: String(selected.etaDays) },
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
                  name: selected.name,
                  lane: selected.lane,
                  model: selected.mode,
                  fill: selected.fill,
                  etaDays: selected.etaDays,
                },
                null,
                2,
              )}
            />
            <div className="sct-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Lane updated', variant: 'success' })}>
                Update lane
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Exception flagged', variant: 'info' })}
              >
                Flag exception
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
