import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from '@poluru-labs/enterprise-design-system-react';
import tenants from '../data/tenants.json';
import users from '../data/users.json';
import billing from '../data/billing.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';

  const tenantHits = useMemo(() => searchRecords(tenants, query, ['name', 'owner', 'slug', 'plan']), [query]);
  const userHits = useMemo(() => searchRecords(users, query, ['name', 'email', 'tenant', 'role']), [query]);
  const invoiceHits = useMemo(
    () => searchRecords(billing.invoices, query, ['id', 'tenant', 'owner', 'status']),
    [query],
  );

  return (
    <div className="nx-page">
      <PageHeader
        title="Search"
        description="Tenants, users, and invoices across the Nexus control plane."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <div className="nx-filter-bar mb-3">
        <div className="nx-filter-search">
          <Search
            value={query}
            placeholder="Search tenants, users, invoices"
            onChange={(_, value) => setParams(value ? { q: value } : {})}
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-4">
          <ChartSection title="Tenants" subtitle={`${tenantHits.length} matches`}>
            <DataTable
              rows={tenantHits}
              emptyTitle="No tenants"
              onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.id}`)}
              columns={[
                { key: 'name', label: 'Tenant' },
                { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-4">
          <ChartSection title="Users" subtitle={`${userHits.length} matches`}>
            <DataTable
              rows={userHits}
              emptyTitle="No users"
              onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.tenantId}`)}
              columns={[
                { key: 'name', label: 'Person' },
                { key: 'tenant', label: 'Tenant' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-4">
          <ChartSection title="Invoices" subtitle={`${invoiceHits.length} matches`}>
            <DataTable
              rows={invoiceHits}
              emptyTitle="No invoices"
              onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.tenantId}`)}
              columns={[
                { key: 'id', label: 'Invoice' },
                { key: 'amount', label: 'Amount', render: (value) => formatCurrency(value) },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
