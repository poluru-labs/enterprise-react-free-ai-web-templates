import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import tenants from '../data/tenants.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatNumber } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Trial', value: 'Trial' },
  { label: 'Past due', value: 'Past due' },
  { label: 'Suspended', value: 'Suspended' },
];

const PLAN_OPTIONS = [
  { label: 'All plans', value: 'all' },
  { label: 'Starter', value: 'Starter' },
  { label: 'Team', value: 'Team' },
  { label: 'Scale', value: 'Scale' },
  { label: 'Enterprise', value: 'Enterprise' },
];

export default function TenantsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialStatus = new URLSearchParams(location.search).get('status') || 'all';
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(initialStatus);
  const [plan, setPlan] = useState('all');
  const [rowsState, setRowsState] = useState(tenants);

  const rows = useMemo(() => {
    const filtered = rowsState.filter((tenant) => {
      const statusOk = status === 'all' || tenant.status === status;
      const planOk = plan === 'all' || tenant.plan === plan;
      return statusOk && planOk;
    });
    return searchRecords(filtered, query, ['name', 'owner', 'plan', 'slug', 'region']);
  }, [query, status, plan, rowsState]);

  const toggleTenant = (event, tenant) => {
    event.stopPropagation();
    const nextStatus = tenant.status === 'Suspended' ? 'Active' : 'Suspended';
    setRowsState((current) =>
      current.map((item) => (item.id === tenant.id ? { ...item, status: nextStatus } : item)),
    );
    showToast({
      title: nextStatus === 'Suspended' ? 'Tenant suspended' : 'Tenant restored',
      description:
        nextStatus === 'Suspended'
          ? `${tenant.name} can no longer sign in to Nexus.`
          : `${tenant.name} is back on ${tenant.plan}.`,
      variant: nextStatus === 'Suspended' ? 'warning' : 'success',
    });
  };

  return (
    <div className="nx-page">
      <PageHeader
        title="Tenants"
        description="Nine workspaces on the Nexus control plane. Click a row for plan, seats, and invoices."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tenants' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Workspaces" value={tenants.length} icon="bi-building" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Active"
            value={tenants.filter((item) => item.status === 'Active').length}
            icon="bi-check-circle"
            tone="success"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="On trial"
            value={tenants.filter((item) => item.status === 'Trial').length}
            icon="bi-hourglass-split"
            tone="warning"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Suspended"
            value={tenants.filter((item) => item.status === 'Suspended').length}
            icon="bi-slash-circle"
            tone="danger"
          />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Search tenants or owners"
            onChange={(_, value) => setQuery(value)}
          />
        }
        onReset={() => {
          setQuery('');
          setStatus('all');
          setPlan('all');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
        <Select label="Plan" options={PLAN_OPTIONS} value={plan} onChange={(event) => setPlan(event.target.value)} />
      </FilterBar>

      <div className="nx-panel">
        <div className="nx-panel-body">
          <DataTable
            rows={rows}
            onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.id}`)}
            rowClassName={(row) => (row.status === 'Suspended' ? 'is-severe' : row.status === 'Past due' ? 'is-attention' : '')}
            columns={[
              {
                key: 'name',
                label: 'Tenant',
                render: (_, row) => (
                  <div>
                    <strong>{row.name}</strong>
                    <div className="nx-subtle">{row.slug} · {row.region}</div>
                  </div>
                ),
              },
              { key: 'plan', label: 'Plan' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => <StatusBadge status={value} />,
              },
              { key: 'owner', label: 'Owner' },
              {
                key: 'seatsUsed',
                label: 'Seats',
                render: (_, row) => `${formatNumber(row.seatsUsed)} / ${formatNumber(row.seatsLimit)}`,
              },
              {
                key: 'mrr',
                label: 'MRR',
                render: (value) => formatCurrency(value),
              },
              {
                key: 'actions',
                label: 'Action',
                render: (_, row) => (
                  <Button
                    size="sm"
                    variant="tertiary"
                    onClick={(event) => toggleTenant(event, row)}
                  >
                    {row.status === 'Suspended' ? 'Restore' : 'Suspend'}
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
