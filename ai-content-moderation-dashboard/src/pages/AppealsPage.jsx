import { useMemo, useState } from 'react';
import { Search, Select, showToast, Button } from '@poluru-labs/enterprise-design-system-react';
import appeals from '../data/appeals.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatDuration, formatNumber, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { statusLabel } from '../lib/status.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SlaBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Upheld', value: 'upheld' },
  { label: 'Overturned', value: 'overturned' },
];

export default function AppealsPage() {
  const [status, setStatus] = useState('open');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const filtered = appeals.appeals.filter((row) => status === 'all' || row.status === status);
    return searchRecords(filtered, query, ['id', 'requester', 'subject', 'owner', 'category']);
  }, [status, query]);

  return (
    <div className="cmb-page">
      <PageHeader
        title="Appeals"
        description="Requester challenges against an original decision, with remaining SLA."
        crumbs={[BREADCRUMB_ROOT, { label: 'Appeals' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Open appeals" value={formatNumber(appeals.summary.open)} icon="bi-arrow-counterclockwise" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Due soon" value={formatNumber(appeals.summary.dueSoon)} hint="Under 30 minutes" icon="bi-alarm" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Median SLA" value={formatDuration(appeals.summary.medianSlaMinutes)} icon="bi-hourglass" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Overturn rate" value={formatPercent(appeals.summary.overturnRate)} icon="bi-arrow-repeat" tone="brand" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search requester, subject, or owner"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setStatus('open');
          setQuery('');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} appeals`} subtitle="Open items sort by remaining SLA">
        <DataTable
          rows={rows}
          rowClassName={(row) => (row.sla === 'breach' ? 'is-severe' : row.sla === 'risk' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'Appeal', className: 'cmb-mono' },
            { key: 'requester', label: 'Requester' },
            { key: 'subject', label: 'Subject' },
            {
              key: 'originalDecision',
              label: 'Original',
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'owner', label: 'Owner' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'slaMinutes',
              label: 'SLA left',
              render: (value, row) => (row.status === 'open' ? formatDuration(value) : '—'),
            },
            {
              key: 'sla',
              label: 'Clock',
              render: (value) => <SlaBadge sla={value} />,
            },
            {
              key: 'openedAt',
              label: 'Opened',
              render: (value) => formatDateTime(value),
            },
            {
              key: 'id',
              label: 'Action',
              render: (_value, row) =>
                row.status === 'open' ? (
                  <Button
                    size="sm"
                    variant="tertiary"
                    onClick={(event) => {
                      event.stopPropagation();
                      showToast({ title: `Queued ${row.id}`, description: row.subject, variant: 'info' });
                    }}
                  >
                    Claim
                  </Button>
                ) : (
                  statusLabel(row.status)
                ),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
