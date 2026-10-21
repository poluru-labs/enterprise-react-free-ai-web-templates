import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  DescriptionList,
  Drawer,
  Pagination,
  ProgressBar,
  Search,
  SegmentedControl,
  Select,
  Status,
  Tag,
  Toolbar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import journeys from '../data/journeys.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;

const STATUS_MAP = {
  Live: 'success',
  Watch: 'warning',
  Paused: 'neutral',
};

export default function JourneysPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let rows = searchRecords(journeys, query, ['name', 'owner', 'trigger']);
    if (status !== 'all') rows = rows.filter((row) => row.status === status);
    if (view === 'attention') rows = rows.filter((row) => row.status === 'Watch' || row.status === 'Paused');
    return rows;
  }, [query, status, view]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="per-page">
      <PageHeader
        title="Journeys"
        description="Triggers, steps, and completion. Rahul Poluru reviews publish requests daily."
        crumbs={[BREADCRUMB_ROOT, { label: 'Journeys' }]}
        actions={
          <Button
            size="sm"
            icon="play"
            onClick={() => showToast({ title: 'Simulator opened', variant: 'info' })}
          >
            Simulate path
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
              { label: 'Needs attention', value: 'attention' },
            ]}
          />
        }
      />

      <div className="per-filters">
        <Search
          placeholder="Search journey, trigger, or owner"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <Select
          label="Status"
          options={[
            { label: 'All statuses', value: 'all' },
            { label: 'Live', value: 'Live' },
            { label: 'Watch', value: 'Watch' },
            { label: 'Paused', value: 'Paused' },
          ]}
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="per-table-wrap">
        <table className="per-table">
          <thead>
            <tr>
              <th>Journey</th>
              <th>Trigger</th>
              <th>Steps</th>
              <th>Completion</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="per-mono">{row.id}</span>
                  <strong className="per-cell-title">{row.name}</strong>
                </td>
                <td>
                  <Tag label={row.trigger} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Badge label={`${row.steps} steps`} variant="brand" soft size="sm" />
                </td>
                <td>
                  <div className="per-score-cell">
                    <span>{formatPercent(row.completion, 0)}</span>
                    <ProgressBar value={row.completion} max={100} />
                  </div>
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status] ?? 'neutral'} />
                </td>
                <td>{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        heading={selected?.name ?? 'Journey'}
        size="md"
      >
        {selected ? (
          <>
            <DescriptionList
              items={[
                { term: 'Owner', description: selected.owner },
                { term: 'Trigger', description: selected.trigger },
                { term: 'Steps', description: String(selected.steps) },
                { term: 'Completion', description: formatPercent(selected.completion, 0) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
              ]}
            />
            <p className="per-copy per-drawer-note">
              Journey simulator previews the next three steps before {selected.owner} publishes.
            </p>
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
