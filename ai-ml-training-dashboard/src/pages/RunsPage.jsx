import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Button, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import runsData from '../data/runs.json';
import settings from '../data/settings.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Running', value: 'Running' },
  { label: 'Queued', value: 'Queued' },
  { label: 'Succeeded', value: 'Succeeded' },
  { label: 'Failed', value: 'Failed' },
];

const OWNER_OPTIONS = [{ label: 'All owners', value: 'all' }, ...settings.owners.map((item) => ({ label: item.label, value: item.label }))];

export default function RunsPage() {
  const navigate = useNavigate();
  const { onLaunch } = useOutletContext();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  const rows = useMemo(() => {
    const filtered = runsData.items.filter((run) => {
      const statusOk = status === 'all' || run.status === status;
      const ownerOk = owner === 'all' || run.owner === owner;
      return statusOk && ownerOk;
    });
    return searchRecords(filtered, query, ['name', 'experiment', 'owner', 'cluster', 'id']);
  }, [query, status, owner]);

  return (
    <div className="kiln-page">
      <PageHeader
        title="Runs"
        description={`${rows.length} jobs · Kavya Poluru’s queue first`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Runs' }]}
        actions={
          <Button size="sm" icon="plus" onClick={onLaunch}>
            Launch run
          </Button>
        }
      />

      <FilterBar
        search={
          <Search
            placeholder="Search runs, experiments, owners"
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
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
        <Select label="Owner" options={OWNER_OPTIONS} value={owner} onChange={(event) => setOwner(event.target.value)} />
      </FilterBar>

      <ChartSection title="Training jobs" subtitle="Click a row to open the run workspace">
        <DataTable
          rows={rows}
          onRowClick={(row) => navigate(`${BASE_PATH}/runs/${row.id}`)}
          emptyTitle="No matching runs"
          emptyDescription="Clear filters or launch a new job."
          rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Queued' ? 'is-attention' : '')}
          columns={[
            { key: 'name', label: 'Run', className: 'kiln-mono' },
            { key: 'experiment', label: 'Experiment' },
            { key: 'owner', label: 'Owner' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'gpu', label: 'GPU' },
            { key: 'epoch', label: 'Epoch' },
            { key: 'eta', label: 'ETA' },
            { key: 'acc', label: 'Val acc' },
          ]}
        />
      </ChartSection>
    </div>
  );
}
