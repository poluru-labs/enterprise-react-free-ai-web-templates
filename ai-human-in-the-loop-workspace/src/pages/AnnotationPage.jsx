import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  CodeSnippet,
  DescriptionList,
  Drawer,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import annotation from '../data/annotation.json';
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

export default function AnnotationPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      annotation.batches.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="hil-page">
      <PageHeader
        title="Annotation"
        description="Batches, rubrics, and label types. Lanes owned by Marcus Poluru and Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Annotation' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Batch imported', variant: 'success' })}
          >
            Import batch
          </Button>
        }
      />

      <div className="hil-filters">
        <Search
          placeholder="Search batch, lane, or owner"
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

      <div className="hil-table-wrap">
        <table className="hil-table">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Owner</th>
              <th>Label type</th>
              <th>Status</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="hil-mono">{row.id}</span>
                  <strong className="hil-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.horizon} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} />
                </td>
                <td>{row.units.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Batch'}
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
                { term: 'Batch', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Label type', description: selected.horizon },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Batch manifest"
              language="json"
              code={`{\n  "id": "${selected.id}",\n  "items": ${selected.units},\n  "status": "${selected.status}"\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
