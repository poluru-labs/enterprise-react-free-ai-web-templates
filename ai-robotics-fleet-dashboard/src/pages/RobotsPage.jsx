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
import robots from '../data/robots.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ROB_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(robots.map((row) => row.owner))];

export default function RobotsPage() {
  const [params] = useSearchParams();
  const queryFromUrl = params.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [zone, setZone] = useState('all');
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
    setScore(selected ? Math.min(5, Math.ceil(selected.battery / 20)) : 4);
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(robots, query, ['id', 'name', 'model', 'owner', 'zone']);
    if (zone !== 'all') rows = rows.filter((row) => row.zone === zone);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'active') rows = rows.filter((row) => row.status === 'Active');
    return rows;
  }, [query, zone, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flt-page">
      <PageHeader
        title="Robots"
        description="Registered units by zone and model. Maya Poluru owns field robots."
        crumbs={[BREADCRUMB_ROOT, { label: 'Robots' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Robot registered', variant: 'success' })}
          >
            New robot
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
              { label: 'Active', value: 'active' },
            ]}
          />
        }
      />

      <div className="flt-filters">
        <Search
          placeholder="Search robot, model, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="flt-filter-field">
          <Select
            label="Zone"
            options={[
              { label: 'All zones', value: 'all' },
              { label: 'Home', value: 'Home' },
              { label: 'Product', value: 'Product' },
              { label: 'Cart', value: 'Cart' },
              { label: 'Email', value: 'Email' },
              { label: 'Search', value: 'Search' },
              { label: 'Category', value: 'Category' },
              { label: 'Order', value: 'Order' },
              { label: 'Push', value: 'Push' },
            ]}
            value={zone}
            onChange={(event) => {
              setZone(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flt-filter-field">
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
        <div className="flt-panel">
          <EmptyState
            heading="No robots match"
            description="Clear the filters or ask Maya Poluru for a new unit."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setZone('all');
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
        <div className="flt-table-wrap">
          <table className="flt-table">
            <thead>
              <tr>
                <th>Robot</th>
                <th>Zone</th>
                <th>Model</th>
                <th>Battery</th>
                <th>Missions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="flt-mono">{row.id}</span>
                    <strong className="flt-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <Badge label={row.zone} variant="brand" soft size="sm" />
                  </td>
                  <td>
                    <Tag label={row.model} variant="neutral" />
                  </td>
                  <td>{formatPercent(row.battery, 0)}</td>
                  <td>
                    <div className="flt-score-cell">
                      <span>{String(row.missions)}</span>
                      <ProgressBar value={row.battery} max={100} />
                    </div>
                  </td>
                  <td>
                    <Status label={row.status} variant={ROB_STATUS[row.status] ?? 'neutral'} />
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
        heading={selected?.name ?? 'Robot'}
        size="md"
      >
        {selected ? (
          <div className="flt-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Zone', description: selected.zone },
                { term: 'Model', description: selected.model },
                { term: 'Battery', description: formatPercent(selected.battery) },
                { term: 'Missions', description: String(selected.missions) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Health set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  name: selected.name,
                  zone: selected.zone,
                  model: selected.model,
                  battery: selected.battery,
                  missions: selected.missions,
                },
                null,
                2,
              )}
            />
            <div className="flt-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Roster updated', variant: 'success' })}>
                Update roster
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Charge queued', variant: 'info' })}
              >
                Queue charge
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
