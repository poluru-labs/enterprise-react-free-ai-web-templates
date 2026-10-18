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
import clauses from '../data/clauses.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Override', value: 'override' },
  { label: 'Review', value: 'review' },
];

const STATUS_MAP = {
  published: 'success',
  draft: 'info',
  override: 'warning',
  review: 'brand',
};

export default function ClausesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      clauses.batches.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="lci-page">
      <PageHeader
        title="Clauses"
        description="Extracted blocks vs playbook. Library owned by Sofia Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Clauses' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Extraction queued', variant: 'success' })}
          >
            Extract clauses
          </Button>
        }
      />

      <div className="lci-filters">
        <Search
          placeholder="Search contract, type, or owner"
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

      <div className="lci-table-wrap">
        <table className="lci-table">
          <thead>
            <tr>
              <th>Clause</th>
              <th>Owner</th>
              <th>Type</th>
              <th>Status</th>
              <th>Blocks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="lci-mono">{row.id}</span>
                  <strong className="lci-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.horizon} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} />
                </td>
                <td>{row.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="lci-panel">
        <h2>Upload contract</h2>
        <FileUpload
          label="Executed PDF"
          accept=".pdf"
          onChange={() => showToast({ title: 'Ingest started', variant: 'info' })}
        />
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Clause'}
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
                { term: 'Reference', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Type', description: selected.horizon },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Extracted snippet"
              language="text"
              code={`[${selected.horizon}]\nParty A shall indemnify Party B...\n(see ${selected.id})`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
