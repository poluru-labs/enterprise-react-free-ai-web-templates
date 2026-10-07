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
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import variants from '../data/variants.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Review', value: 'review' },
  { label: 'Draft', value: 'draft' },
];

const STATUS_VARIANT = {
  published: 'success',
  review: 'warning',
  draft: 'neutral',
};

export default function VariantsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      variants.variants.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="lex-page">
      <PageHeader
        title="Model variants"
        description="Versions, configs, and traffic caps. Registry owned by Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Variants' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Draft variant created', variant: 'success' })}
          >
            Add variant
          </Button>
        }
      />

      <div className="lex-filters">
        <Search
          placeholder="Search name, model, or owner"
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

      <div className="lex-table-wrap">
        <table className="lex-table">
          <thead>
            <tr>
              <th>Variant</th>
              <th>Owner</th>
              <th>Model</th>
              <th>Status</th>
              <th>Traffic cap</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="lex-mono">{row.id}</span>
                  <strong className="lex-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.model} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Badge label={row.status} variant={STATUS_VARIANT[row.status]} soft pill size="sm" />
                </td>
                <td>{row.traffic}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="lex-panel">
        <h2>Import config</h2>
        <FileUpload
          label="YAML or JSON variant spec"
          accept=".json,.yaml,.yml"
          hint="Marcus Poluru reviews imports on Wednesdays."
          onChange={() => showToast({ title: 'Spec queued', variant: 'info' })}
        />
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.name || 'Variant'}
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
                { term: 'Owner', description: selected.owner },
                { term: 'Model', description: selected.model },
                { term: 'Status', description: selected.status },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Config"
              language="json"
              code={`{\n  "id": "${selected.id}",\n  "trafficCap": ${selected.traffic}\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
