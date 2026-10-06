import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  CodeSnippet,
  DescriptionList,
  Drawer,
  FileUpload,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import usage from '../data/usage.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Spike', value: 'spike' },
  { label: 'Watch', value: 'watch' },
  { label: 'Normal', value: 'normal' },
  { label: 'Done', value: 'done' },
];

const STATUS_MAP = {
  spike: 'danger',
  watch: 'warning',
  normal: 'info',
  done: 'success',
};

export default function UsagePage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      usage.meters.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="eod-page">
      <PageHeader
        title="Energy usage"
        description="kWh by site and meter. Anomalies owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Usage' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Meter added', variant: 'success' })}
          >
            Add meter
          </Button>
        }
      />

      <div className="eod-filters">
        <Search
          placeholder="Search meter, site, or owner"
          value={query}
          clearable
          onChange={(_, value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </div>

      <div className="eod-table-wrap">
        <table className="eod-table">
          <thead>
            <tr>
              <th>Meter</th>
              <th>Owner</th>
              <th>Site</th>
              <th>Status</th>
              <th>kWh today</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="eod-mono">{row.id}</span>
                  <strong className="eod-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.site} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} pulse={row.status === 'spike'} />
                </td>
                <td>{row.kwh.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="eod-panel">
        <h2>Import interval data</h2>
        <FileUpload
          label="CSV or Green Button XML"
          accept=".csv,.xml"
          hint="Priya Poluru validates imports on Mondays."
          onChange={() => showToast({ title: 'File queued', variant: 'info' })}
        />
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Meter'}
        size="md"
        footer={
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <>
            <DescriptionList
              items={[
                { term: 'Name', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Site', description: selected.site },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Interval snapshot"
              language="json"
              code={`{\n  "id": "${selected.id}",\n  "kwh": ${selected.kwh},\n  "status": "${selected.status}"\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
