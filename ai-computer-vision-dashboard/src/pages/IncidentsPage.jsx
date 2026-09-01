import { useMemo, useState } from 'react';
import { DescriptionList, Drawer, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import incidents from '../data/incidents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Investigating', value: 'investigating' },
  { label: 'Resolved', value: 'resolved' },
];

export default function IncidentsPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    return searchRecords(incidents.incidents, query, ['id', 'title', 'site', 'camera', 'model', 'owner']).filter(
      (incident) => status === 'all' || incident.status === status,
    );
  }, [status, query]);

  return (
    <div className="cvd-page">
      <PageHeader
        title="Incidents"
        description="Missing helmet on Dock 4, Dallas-03 offline, and the ANPR false-positive spike."
        crumbs={[BREADCRUMB_ROOT, { label: 'Incidents' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Open" value={incidents.summary.open} hint="Needs an owner action" icon="bi-exclamation-octagon" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Investigating" value={incidents.summary.investigating} hint="In flight" icon="bi-search" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Resolved today" value={incidents.summary.resolvedToday} hint="Closed this shift" icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="MTTR" value={`${incidents.summary.mttrMinutes}m`} hint="Median this week" icon="bi-stopwatch" tone="info" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search title, camera, site, or owner"
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

      <ChartSection title={`${rows.length} incidents`} subtitle="Click a row for the operator note">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.severity === 'critical' || row.status === 'open' ? 'is-severe' : row.severity === 'high' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'ID', className: 'cvd-mono' },
            { key: 'title', label: 'Incident' },
            { key: 'site', label: 'Site' },
            { key: 'camera', label: 'Camera', className: 'cvd-mono' },
            { key: 'severity', label: 'Severity', render: (value) => <SeverityBadge severity={value} /> },
            { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            { key: 'owner', label: 'Owner' },
            { key: 'openedAt', label: 'Opened', render: (value) => formatDateTime(value) },
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
            <p className="cvd-drawer-lead">{selected.detail}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <StatusBadge status={selected.status} />
              <SeverityBadge severity={selected.severity} />
            </div>
            <DescriptionList
              items={[
                { term: 'Title', description: selected.title },
                { term: 'Site', description: selected.site },
                { term: 'Camera', description: selected.camera },
                { term: 'Model', description: selected.model },
                { term: 'Owner', description: selected.owner },
                { term: 'Opened', description: formatDateTime(selected.openedAt) },
              ]}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
