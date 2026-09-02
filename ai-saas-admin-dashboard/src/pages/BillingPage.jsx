import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import billing from '../data/billing.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatDate, formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All invoices', value: 'all' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Overdue', value: 'Overdue' },
];

export default function BillingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => {
    const filtered = billing.invoices.filter((item) => status === 'all' || item.status === status);
    return searchRecords(filtered, query, ['id', 'tenant', 'owner', 'status']);
  }, [query, status]);

  return (
    <div className="nx-page">
      <PageHeader
        title="Billing"
        description="Invoices, dunning, and the MRR climb through 30 Aug 2026."
        crumbs={[BREADCRUMB_ROOT, { label: 'Billing' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="MRR" value={formatCurrency(billing.mrr)} icon="bi-currency-dollar" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="ARR" value={formatCurrency(billing.arr)} icon="bi-graph-up" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="In dunning" value={formatCurrency(billing.dunning)} icon="bi-hourglass-split" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Failed invoices" value={billing.failedCount} icon="bi-exclamation-triangle" tone="danger" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="MRR trend" subtitle="Recognized recurring revenue">
            <AreaChart labels={billing.mrrTrend.labels} series={billing.mrrTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Dunning queue" subtitle="Retries scheduled for 29 Aug">
            <ul className="nx-note-list">
              {billing.dunningQueue.map((item) => (
                <li key={item.id}>
                  <i className="bi bi-receipt" />
                  <div>
                    <strong>{item.tenant}</strong>
                    <p className="mb-0">
                      {formatCurrency(item.amount)} · day {item.day} · {item.owner}
                    </p>
                    <span className="nx-subtle">Next {formatDateTime(item.next)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>
        </div>
      </div>

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Search invoices or tenants"
            onChange={(_, value) => setQuery(value)}
          />
        }
        onReset={() => {
          setQuery('');
          setStatus('all');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </FilterBar>

      <div className="nx-panel">
        <div className="nx-panel-body">
          <DataTable
            rows={rows}
            onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.tenantId}`)}
            rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Overdue' ? 'is-attention' : '')}
            columns={[
              { key: 'id', label: 'Invoice', render: (value) => <span className="nx-mono">{value}</span> },
              { key: 'tenant', label: 'Tenant' },
              { key: 'amount', label: 'Amount', render: (value) => formatCurrency(value) },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
              { key: 'issued', label: 'Issued', render: (value) => formatDate(value) },
              { key: 'due', label: 'Due', render: (value) => formatDate(value) },
              { key: 'owner', label: 'Owner' },
              { key: 'attempts', label: 'Attempts' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
