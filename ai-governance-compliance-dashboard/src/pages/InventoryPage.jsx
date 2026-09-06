import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pagination,
  Search,
  SegmentedControl,
  Select,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-react';
import inventory from '../data/inventory.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import {
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  StatusBadge,
} from '../components/widgets/index.js';

const PAGE_SIZE = 5;

export default function InventoryPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [risk, setRisk] = useState('all');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows = searchRecords(inventory, query, ['name', 'owner', 'useCase', 'framework']);
    if (risk !== 'all') rows = rows.filter((row) => row.risk.toLowerCase() === risk);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    if (view === 'attention') rows = rows.filter((row) => row.risk === 'High' || row.risk === 'Critical');
    return rows;
  }, [query, risk, status, view]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setRisk('all');
    setStatus('all');
    setView('all');
    setPage(1);
  };

  return (
    <div className="gov-page">
      <PageHeader
        title="Model inventory"
        description="Registered systems, residual risk, and named owners."
        crumbs={[BREADCRUMB_ROOT, { label: 'Inventory' }]}
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
              { label: 'Attention', value: 'attention' },
            ]}
          />
        }
        end={
          <div className="gov-tag-row">
            <Tag label={`${filtered.length} systems`} variant="brand" />
          </div>
        }
      />

      <FilterBar
        onReset={reset}
        search={
          <Search
            size="sm"
            placeholder="Search name, owner, use case"
            value={query}
            onChange={(_, value) => {
              setQuery(value);
              setPage(1);
            }}
          />
        }
      >
        <Select
          label="Risk"
          size="sm"
          value={risk}
          onChange={(event) => {
            setRisk(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All levels' },
            { value: 'critical', label: 'Critical' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
          ]}
        />
        <Select
          label="Status"
          size="sm"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'production', label: 'Production' },
            { value: 'review', label: 'Review' },
          ]}
        />
      </FilterBar>

      <section className="gov-panel">
        <div className="gov-panel-body" style={{ paddingTop: '1rem' }}>
          <DataTable
            rows={paged}
            onRowClick={(row) => navigate(`${BASE_PATH}/inventory/${row.id}`)}
            emptyTitle="No systems match"
            emptyDescription="Clear filters to see the full register."
            rowClassName={(row) => (row.risk === 'Critical' ? 'is-severe' : row.risk === 'High' ? 'is-attention' : '')}
            columns={[
              {
                key: 'name',
                label: 'System',
                render: (_, row) => (
                  <div>
                    <strong>{row.name}</strong>
                    <div className="gov-subtle">{row.version} · {row.useCase}</div>
                  </div>
                ),
              },
              { key: 'owner', label: 'Owner' },
              {
                key: 'risk',
                label: 'Risk',
                render: (value) => <SeverityBadge severity={value} />,
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => <StatusBadge status={value} />,
              },
              { key: 'framework', label: 'Framework' },
              { key: 'nextReview', label: 'Next review' },
            ]}
          />
          <div className="mt-3">
            <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onChange={setPage} />
          </div>
        </div>
      </section>
    </div>
  );
}
