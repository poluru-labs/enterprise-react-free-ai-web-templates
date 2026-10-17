import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  DescriptionList,
  Drawer,
  FileUpload,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import citations from '../data/citations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Verified', value: 'verified' },
  { label: 'Review', value: 'review' },
  { label: 'Broken', value: 'broken' },
];

const STATUS_MAP = {
  verified: 'success',
  review: 'brand',
  broken: 'danger',
};

export default function CitationsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      citations.links.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="knb-page">
      <PageHeader
        title="Citations"
        description="Footnotes, deep links, and verify status. Owned by Sofia Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Citations' }]}
        actions={
          <Button
            size="sm"
            onClick={() => showToast({ title: 'Link check queued', variant: 'success' })}
          >
            Verify all
          </Button>
        }
      />

      <div className="knb-filters">
        <Search
          placeholder="Search cite label or URL"
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

      <div className="knb-table-wrap">
        <table className="knb-table">
          <thead>
            <tr>
              <th>Citation</th>
              <th>Owner</th>
              <th>Source</th>
              <th>Status</th>
              <th>Clicks (30d)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="knb-mono">{row.id}</span>
                  <strong className="knb-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.source} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} />
                </td>
                <td>{row.clicks.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="knb-panel">
        <h2>Import cite map</h2>
        <FileUpload
          label="CSV of URLs"
          accept=".csv"
          onChange={() => showToast({ title: 'Import started', variant: 'info' })}
        />
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Citation'}
        size="md"
        footer={
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <DescriptionList
            items={[
              { term: 'Label', description: selected.name },
              { term: 'Owner', description: selected.owner },
              { term: 'Source type', description: selected.source },
              { term: 'Last verified', description: selected.updated },
            ]}
          />
        ) : null}
      </Drawer>
    </div>
  );
}
