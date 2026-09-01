import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import reporters from '../data/reporters.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Trusted', value: 'trusted' },
  { label: 'Probation', value: 'probation' },
  { label: 'Revoked', value: 'revoked' },
];

export default function ReportersPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const filtered = reporters.reporters.filter((row) => status === 'all' || row.status === status);
    return searchRecords(filtered, query, ['name', 'type', 'focus', 'contact']);
  }, [status, query]);

  const volume = reporters.reporters
    .filter((row) => row.status !== 'revoked')
    .map((row) => ({
      name: row.name,
      value: row.reportsToday,
      color: row.status === 'probation' ? '#9a6700' : '#7C3AED',
    }));

  return (
    <div className="cmb-page">
      <PageHeader
        title="Trusted flaggers"
        description="Partner volume, precision, and the desks that still need a human follow-up."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reporters' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Trusted" value={reporters.summary.trusted} icon="bi-flag" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Reports today" value={formatNumber(reporters.summary.reportsToday)} icon="bi-inboxes" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Precision" value={formatPercent(reporters.summary.precision)} icon="bi-bullseye" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="High severity" value={reporters.summary.highSeverity} icon="bi-exclamation-triangle" tone="danger" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="Volume by reporter" subtitle="Reports filed today, excluding revoked desks">
            <BarChart items={volume} />
          </ChartSection>
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search name, focus, or contact"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setStatus('all');
          setQuery('');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} reporters`} subtitle="Trusted flaggers, partners, and internal desks">
        <DataTable
          rows={rows}
          rowClassName={(row) => (row.status === 'revoked' ? 'is-severe' : row.status === 'probation' ? 'is-attention' : '')}
          columns={[
            { key: 'name', label: 'Reporter' },
            { key: 'type', label: 'Type' },
            { key: 'focus', label: 'Focus' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'reportsToday',
              label: 'Today',
              render: (value) => formatNumber(value),
            },
            {
              key: 'precision',
              label: 'Precision',
              render: (value) => formatPercent(value),
            },
            { key: 'contact', label: 'Contact' },
            {
              key: 'lastReportAt',
              label: 'Last report',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
