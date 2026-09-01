import { useMemo, useState } from 'react';
import { Button, Drawer, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import incidents from '../data/incidents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  PriorityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Mitigating', value: 'mitigating' },
  { label: 'Watching', value: 'watching' },
  { label: 'Mitigated', value: 'mitigated' },
  { label: 'Resolved', value: 'resolved' },
];

export default function IncidentsPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const { summary, items, playbooks } = incidents;

  const rows = useMemo(() => {
    const filtered = searchRecords(items, query, ['id', 'title', 'agent', 'owner', 'summary']);
    return filtered.filter((item) => status === 'all' || item.status === status);
  }, [items, query, status]);

  return (
    <div className="amd-page">
      <PageHeader
        title="Incidents"
        description="Open reliability events, playbooks, and owners for the live agent fleet."
        crumbs={[BREADCRUMB_ROOT, { label: 'Incidents' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Incident draft opened', variant: 'info' })}
          >
            Declare incident
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Open" value={summary.open} hint={`${summary.mitigating} being mitigated`} icon="bi-exclamation-octagon" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Resolved today" value={summary.resolvedToday} hint="Including jailbreak block" icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="MTTR" value={`${summary.mttrMinutes}m`} hint="Target under 20 minutes" icon="bi-stopwatch" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Error budget left" value={`${summary.errorBudget}%`} hint="crm_update is the burner" icon="bi-battery-half" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {playbooks.map((playbook) => (
          <div className="col-12 col-md-6 col-xl-3" key={playbook.id}>
            <article className="amd-metric-card">
              <small>{playbook.owner}</small>
              <h3>{playbook.title}</h3>
              <p className="amd-metric-value">{playbook.steps} steps</p>
              <small>{playbook.hint}</small>
              <p className="amd-subtle mb-0 mt-2">Last used {formatDateTime(playbook.lastUsed)}</p>
            </article>
          </div>
        ))}
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search incident, agent, or owner"
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

      <ChartSection title={`${rows.length} incidents`} subtitle="Click a row for the playbook and owner">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.severity === 'critical' ? 'is-severe' : row.severity === 'high' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'ID', className: 'amd-mono' },
            { key: 'title', label: 'Incident' },
            { key: 'agent', label: 'Agent' },
            {
              key: 'severity',
              label: 'Severity',
              render: (value) => <PriorityBadge priority={value === 'medium' ? 'high' : value} />,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} pulse={value === 'active'} />,
            },
            { key: 'owner', label: 'Owner' },
            {
              key: 'updatedAt',
              label: 'Updated',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Incident'}
        size="lg"
      >
        {selected ? (
          <div>
            <p className="amd-drawer-lead">{selected.title}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <StatusBadge status={selected.status} />
              <PriorityBadge priority={selected.severity === 'medium' ? 'high' : selected.severity} />
            </div>
            <p className="amd-drawer-copy">{selected.summary}</p>
            <p className="amd-drawer-copy">
              <strong>Playbook.</strong> {selected.playbook}
            </p>
            <p className="amd-subtle mb-0">
              {selected.agent} · {selected.owner} · opened {formatDateTime(selected.openedAt)}
            </p>
            <div className="mt-3">
              <Button
                size="sm"
                onClick={() => {
                  showToast({ title: 'Playbook armed', description: selected.id, variant: 'success' });
                  setSelected(null);
                }}
              >
                Run playbook
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
