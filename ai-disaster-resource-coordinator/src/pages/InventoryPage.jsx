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
import inventory from '../data/inventory.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { INVENTORY_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(inventory.map((row) => row.owner))];

export default function InventoryPage() {
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
    const rank = { Available: 5, Reserved: 4, Low: 2, Critical: 1 };
    setScore(selected ? rank[selected.status] ?? 3 : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(inventory, query, ['id', 'name', 'warehouse', 'sku', 'owner', 'status']);
    if (statusFilter !== 'all') rows = rows.filter((row) => row.status === statusFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'risk') rows = rows.filter((row) => row.status === 'Critical' || row.status === 'Low');
    return rows;
  }, [query, statusFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="relief-page">
      <PageHeader
        title="Inventory"
        description="Warehouse stock, SKUs, and reorder floors. Maya Poluru owns inventory control with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Inventory' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Stock count queued', variant: 'success' })}>
            Record intake
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
              { label: 'Low stock', value: 'risk' },
            ]}
          />
        }
      />

      <div className="relief-filters">
        <Search
          placeholder="Search SKU, warehouse, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="relief-filter-field">
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: 'all' },
              { label: 'Available', value: 'Available' },
              { label: 'Low', value: 'Low' },
              { label: 'Critical', value: 'Critical' },
              { label: 'Reserved', value: 'Reserved' },
            ]}
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="relief-filter-field">
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
        <div className="relief-panel">
          <EmptyState
            heading="No inventory match"
            description="Clear filters or ask Priya Poluru to open a new intake."
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
        <div className="relief-table-wrap">
          <table className="relief-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Warehouse</th>
                <th>Status</th>
                <th>On hand</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="relief-mono">{row.id}</span>
                    <strong className="relief-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <span className="relief-cell-title">{row.warehouse}</span>
                  </td>
                  <td>
                    <Status label={row.status} variant={INVENTORY_STATUS[row.status] ?? 'neutral'} />
                  </td>
                  <td>{row.onHand.toLocaleString()}</td>
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
        heading={selected?.name ?? 'Inventory'}
        size="md"
      >
        {selected ? (
          <div className="relief-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'SKU', description: selected.sku },
                { term: 'Warehouse', description: selected.warehouse },
                { term: 'On hand', description: selected.onHand.toLocaleString() },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Replenish priority set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  id: selected.id,
                  sku: selected.sku,
                  warehouse: selected.warehouse,
                  onHand: selected.onHand,
                  status: selected.status,
                },
                null,
                2,
              )}
            />
            <div className="relief-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Custodian updated', variant: 'success' })}>
                Save assignee
              </Button>
              <Button variant="secondary" size="sm" onClick={() => showToast({ title: 'Reorder triggered', variant: 'info' })}>
                Trigger reorder
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
