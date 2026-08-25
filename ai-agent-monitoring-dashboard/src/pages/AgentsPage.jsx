import { useMemo, useState } from 'react';
import { DescriptionList, Drawer, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import agentsData from '../data/agents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatDateTime, formatLatency, formatNumber, formatPercent } from '../lib/format.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Watch', value: 'watch' },
  { label: 'Degraded', value: 'degraded' },
  { label: 'Critical', value: 'critical' },
];

export default function AgentsPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const { agents, fleet } = agentsData;

  const rows = useMemo(() => {
    return agents.filter((agent) => {
      const matchesStatus = status === 'all' || agent.status === status;
      const haystack = `${agent.name} ${agent.role} ${agent.model} ${agent.owner}`.toLowerCase();
      return matchesStatus && (!query || haystack.includes(query.toLowerCase()));
    });
  }, [agents, status, query]);

  return (
    <div className="amd-page">
      <PageHeader
        title="Agent fleet"
        description="Named agents, models, owners, and live throughput across production and staging."
        crumbs={[BREADCRUMB_ROOT, { label: 'Agents' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Named agents" value={fleet.total} hint="Production + staging" icon="bi-cpu" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Healthy" value={fleet.healthy} hint="Within SLO" icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Degraded" value={fleet.degraded} hint={`${fleet.watch} on watch`} icon="bi-exclamation-triangle" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Critical" value={fleet.critical} hint="Helix Data memory" icon="bi-exclamation-octagon" tone="danger" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search name, role, model, or owner"
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
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </FilterBar>

      <ChartSection title={`${rows.length} agents`} subtitle="Click a row for model, owner, and cost">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.status === 'critical' ? 'is-severe' : row.status === 'degraded' ? 'is-attention' : '')}
          columns={[
            { key: 'name', label: 'Agent' },
            { key: 'role', label: 'Role' },
            { key: 'model', label: 'Model', className: 'amd-mono' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} pulse={value === 'critical'} />,
            },
            {
              key: 'tasksToday',
              label: 'Tasks today',
              render: (value) => formatNumber(value),
            },
            {
              key: 'successRate',
              label: 'Success',
              render: (value) => formatPercent(value),
            },
            {
              key: 'costToday',
              label: 'Spend today',
              render: (value) => formatCurrency(value, 1),
            },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.name || 'Agent'}
        size="lg"
      >
        {selected ? (
          <div>
            <p className="amd-drawer-lead">{selected.description}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <StatusBadge status={selected.status} />
              <span className="amd-subtle">{selected.environment}</span>
            </div>
            <DescriptionList
              items={[
                { term: 'Owner', description: selected.owner },
                { term: 'Model', description: `${selected.model} · v${selected.version}` },
                { term: 'Region', description: selected.region },
                { term: 'Tasks today', description: formatNumber(selected.tasksToday) },
                { term: 'Success rate', description: formatPercent(selected.successRate) },
                { term: 'Avg latency', description: formatLatency(selected.avgLatencyMs) },
                { term: 'Tokens today', description: formatNumber(selected.tokensToday) },
                { term: 'Spend today', description: formatCurrency(selected.costToday, 1) },
                { term: 'Last heartbeat', description: formatDateTime(selected.lastHeartbeat) },
              ]}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
