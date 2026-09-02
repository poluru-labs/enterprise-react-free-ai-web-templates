import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import users from '../data/users.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

const ROLE_FILTERS = [
  { label: 'All roles', value: 'all' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Billing', value: 'Billing' },
  { label: 'Member', value: 'Member' },
  { label: 'Viewer', value: 'Viewer' },
];

export default function UsersPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');

  const rows = useMemo(() => {
    const filtered = users.filter((user) => role === 'all' || user.role === role);
    return searchRecords(filtered, query, ['name', 'email', 'tenant', 'role']);
  }, [query, role]);

  return (
    <div className="nx-page">
      <PageHeader
        title="Users"
        description="Seats across every Nexus workspace. Invite from here or the header."
        crumbs={[BREADCRUMB_ROOT, { label: 'Users' }]}
        actions={
          <Button size="sm" icon="user" onClick={() => window.dispatchEvent(new Event('nx:invite'))}>
            Invite user
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="People" value={users.length} icon="bi-people" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Active"
            value={users.filter((item) => item.status === 'Active').length}
            icon="bi-check-circle"
            tone="success"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Invited"
            value={users.filter((item) => item.status === 'Invited').length}
            icon="bi-envelope"
            tone="warning"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Suspended"
            value={users.filter((item) => item.status === 'Suspended').length}
            icon="bi-slash-circle"
            tone="danger"
          />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Search people or tenants"
            onChange={(_, value) => setQuery(value)}
          />
        }
        onReset={() => {
          setQuery('');
          setRole('all');
        }}
      >
        <Select label="Role" options={ROLE_FILTERS} value={role} onChange={(event) => setRole(event.target.value)} />
      </FilterBar>

      <div className="nx-panel">
        <div className="nx-panel-body">
          <DataTable
            rows={rows}
            onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.tenantId}`)}
            columns={[
              {
                key: 'name',
                label: 'Person',
                render: (_, row) => (
                  <div>
                    <strong>{row.name}</strong>
                    <div className="nx-subtle">{row.email}</div>
                  </div>
                ),
              },
              { key: 'role', label: 'Role' },
              { key: 'tenant', label: 'Tenant' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => <StatusBadge status={value} />,
              },
              {
                key: 'lastActive',
                label: 'Last active',
                render: (value) => formatDateTime(value),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
