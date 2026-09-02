import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import customers from '../data/customers.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatusBadge,
  StatCard,
} from '../components/widgets/index.js';

export default function CustomersPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [health, setHealth] = useState('all');

  const rows = useMemo(() => {
    const filtered = customers.items.filter((item) => health === 'all' || item.health === health);
    return searchRecords(filtered, query, ['name', 'owner', 'plan', 'region']);
  }, [query, health]);

  return (
    <div className="desk-page">
      <PageHeader
        title="Customers"
        description="Accounts on the Sunday desk. Health is a support read, not finance."
        crumbs={[BREADCRUMB_ROOT, { label: 'Customers' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Accounts" value={customers.items.length} icon="bi-buildings" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Open tickets" value={customers.items.reduce((sum, item) => sum + item.openTickets, 0)} icon="bi-inbox" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="At risk" value={customers.items.filter((item) => item.health === 'Risk').length} icon="bi-heart-pulse" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Seats" value={customers.items.reduce((sum, item) => sum + item.seats, 0).toLocaleString('en-US')} icon="bi-people" tone="info" />
        </div>
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search accounts" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setHealth('all');
        }}
      >
        <Select
          label="Health"
          value={health}
          onChange={(event) => setHealth(event.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'Healthy', label: 'Healthy' },
            { value: 'Watch', label: 'Watch' },
            { value: 'Risk', label: 'Risk' },
          ]}
        />
      </FilterBar>

      <ChartSection title="Accounts" subtitle="Click through to the inbox filtered by name">
        <DataTable
          rows={rows}
          onRowClick={(row) => navigate(`${BASE_PATH}/inbox`)}
          columns={[
            {
              key: 'name',
              label: 'Account',
              render: (_, row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="desk-subtle">{row.region} · since {row.since}</div>
                </div>
              ),
            },
            { key: 'plan', label: 'Plan' },
            { key: 'seats', label: 'Seats' },
            { key: 'openTickets', label: 'Open' },
            { key: 'csat', label: 'CSAT' },
            { key: 'owner', label: 'Owner' },
            {
              key: 'health',
              label: 'Health',
              render: (value) => <StatusBadge status={value === 'Healthy' ? 'ok' : value === 'Risk' ? 'error' : 'watch'} />,
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
