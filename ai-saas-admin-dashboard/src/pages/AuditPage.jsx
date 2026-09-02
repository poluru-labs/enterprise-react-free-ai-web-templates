import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import audit from '../data/audit.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatCard } from '../components/widgets/index.js';

const TONE_OPTIONS = [
  { label: 'All events', value: 'all' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Info', value: 'info' },
];

export default function AuditPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [tone, setTone] = useState('all');

  const rows = useMemo(() => {
    const filtered = audit.filter((item) => tone === 'all' || item.tone === tone);
    return searchRecords(filtered, query, ['actor', 'action', 'target', 'id']);
  }, [query, tone]);

  return (
    <div className="nx-page">
      <PageHeader
        title="Audit log"
        description="Security events from 24–28 Aug 2026. Restores, suspends, and flag changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Audit' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Events" value={audit.length} icon="bi-shield-lock" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Suspends"
            value={audit.filter((item) => item.action.includes('Suspended')).length}
            icon="bi-slash-circle"
            tone="danger"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Restores"
            value={audit.filter((item) => item.action.includes('Restored')).length}
            icon="bi-arrow-counterclockwise"
            tone="success"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Actors" value="7" hint="Poluru family" icon="bi-people" tone="info" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Search actors or targets"
            onChange={(_, value) => setQuery(value)}
          />
        }
        onReset={() => {
          setQuery('');
          setTone('all');
        }}
      >
        <Select label="Tone" options={TONE_OPTIONS} value={tone} onChange={(event) => setTone(event.target.value)} />
      </FilterBar>

      <div className="nx-panel">
        <div className="nx-panel-body">
          <DataTable
            rows={rows}
            onRowClick={(row) => navigate(row.href)}
            columns={[
              { key: 'time', label: 'When', render: (value) => formatDateTime(value) },
              { key: 'actor', label: 'Actor' },
              { key: 'action', label: 'Action' },
              { key: 'target', label: 'Target' },
              { key: 'ip', label: 'IP', render: (value) => <span className="nx-mono">{value}</span> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
