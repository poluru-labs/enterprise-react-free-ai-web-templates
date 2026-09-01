import { useMemo, useState } from 'react';
import { Button, DateRangePicker, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import runsData from '../data/runs.json';
import settings from '../data/settings.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, inDateRange } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'Passed', label: 'Passed' },
  { value: 'Needs review', label: 'Needs review' },
  { value: 'Running', label: 'Running' },
  { value: 'Queued', label: 'Queued' },
  { value: 'Failed', label: 'Failed' },
];

export default function RunsPage() {
  const navigate = useNavigate();
  const { onRun } = useOutletContext();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');
  const [start, setStart] = useState('2026-08-01');
  const [end, setEnd] = useState('2026-08-29');

  const filtered = useMemo(() => {
    const byStatus = runsData.runs.filter((run) => status === 'all' || run.status === status);
    const byOwner = byStatus.filter((run) => owner === 'all' || run.owner.toLowerCase().includes(owner));
    const byDate = byOwner.filter((run) => inDateRange(run.startedAt, start, end));
    return searchRecords(byDate, query, ['name', 'suite', 'owner', 'model']);
  }, [query, status, owner, start, end]);

  return (
    <div className="prism-page">
      <PageHeader
        title="Runs"
        description={`${formatNumber(filtered.length)} evals · Meera Poluru’s queue first.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Runs' }]}
        actions={
          <Button size="sm" icon="plus" onClick={onRun}>
            Run evaluation
          </Button>
        }
      />

      <FilterBar
        search={
          <Search
            placeholder="Search runs"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setQuery('');
          setStatus('all');
          setOwner('all');
          setStart('2026-08-01');
          setEnd('2026-08-29');
        }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={STATUS_OPTIONS}
        />
        <Select
          label="Owner"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          options={[{ value: 'all', label: 'All owners' }, ...settings.ownerOptions]}
        />
        <DateRangePicker
          label="Window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </FilterBar>

      <ChartSection title="Eval jobs" subtitle={`${start} – ${end}`}>
        <DataTable
          rows={filtered}
          emptyTitle="No matching runs"
          emptyDescription="Clear filters or queue a new eval."
          onRowClick={(row) => navigate(`${BASE_PATH}/runs/${row.id}`)}
          rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Needs review' ? 'is-attention' : '')}
          columns={[
            { key: 'name', label: 'Run', className: 'prism-mono' },
            { key: 'suite', label: 'Suite' },
            { key: 'owner', label: 'Owner' },
            { key: 'model', label: 'Model' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} pulse={value === 'Running'} />,
            },
            { key: 'score', label: 'Score' },
            { key: 'samples', label: 'Samples', render: (value) => formatNumber(value) },
            { key: 'when', label: 'When' },
          ]}
        />
      </ChartSection>
    </div>
  );
}
