import { useMemo, useState } from 'react';
import { Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import incidents from '../data/incidents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  StatCard,
} from '../components/widgets/index.js';

export default function IncidentsPage() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const watching = incidents.filter((item) => item.status === 'Watch');
  const resolved = incidents.filter((item) => item.status === 'Resolved');

  const rows = useMemo(() => {
    const filtered = incidents.filter((item) => severity === 'all' || item.status === severity);
    return searchRecords(filtered, query, ['title', 'owner', 'detail', 'id']);
  }, [query, severity]);

  return (
    <div className="llm-page">
      <PageHeader
        title="Incidents"
        description="Watch pages and resolved bursts. Lens Extractor is still the hottest page."
        crumbs={[BREADCRUMB_ROOT, { label: 'Incidents' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Open watch" value={watching.length} icon="bi-eye" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Resolved" value={resolved.length} icon="bi-check-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Oldest watch" value="3 hr" hint="Harbor grounding miss" icon="bi-hourglass-split" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Owners" value="6" hint="Poluru on-call" icon="bi-people" tone="info" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {watching.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="llm-incident-card">
              <header>
                <h3>{item.title}</h3>
                <SeverityBadge severity={item.severity} />
              </header>
              <p className="llm-policy-note">{item.detail}</p>
              <footer>
                <span>{item.owner}</span>
                <span>{item.since}</span>
              </footer>
            </article>
          </div>
        ))}
        {resolved.slice(0, 3).map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="llm-incident-card is-resolved">
              <header>
                <h3>{item.title}</h3>
                <SeverityBadge severity={item.severity} />
              </header>
              <p className="llm-policy-note">{item.detail}</p>
              <footer>
                <span>{item.owner}</span>
                <span>{item.since}</span>
              </footer>
            </article>
          </div>
        ))}
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search incidents" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setSeverity('all');
        }}
      >
        <Select
          label="State"
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'Watch', label: 'Watch' },
            { value: 'Resolved', label: 'Resolved' },
          ]}
        />
      </FilterBar>

      <ChartSection title={`${rows.length} incidents`} subtitle="Click a row to copy the page id">
        <DataTable
          rows={rows}
          onRowClick={(row) => showToast({ title: row.id, description: row.title, variant: 'info' })}
          columns={[
            { key: 'id', label: 'ID', className: 'llm-mono' },
            { key: 'title', label: 'Incident' },
            {
              key: 'severity',
              label: 'State',
              render: (value) => <SeverityBadge severity={value} />,
            },
            { key: 'owner', label: 'Owner' },
            { key: 'since', label: 'Age' },
          ]}
        />
      </ChartSection>
    </div>
  );
}
