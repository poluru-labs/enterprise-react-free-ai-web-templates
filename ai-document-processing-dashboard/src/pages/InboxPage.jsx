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
import inbox from '../data/inbox.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Queued', value: 'queued' },
  { label: 'OCR', value: 'ocr' },
  { label: 'Retry', value: 'retry' },
  { label: 'Done', value: 'done' },
];

const STATUS_MAP = {
  queued: 'info',
  ocr: 'info',
  retry: 'warning',
  done: 'success',
};

export default function InboxPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      inbox.jobs.filter((job) => {
        const hay = `${job.name} ${job.owner} ${job.id}`.toLowerCase();
        return (status === 'all' || job.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="dpd-page">
      <PageHeader
        title="Inbox"
        description="Batch ingest and OCR jobs. First look owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Inbox' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Empty batch created', variant: 'success' })}
          >
            New batch
          </Button>
        }
      />

      <div className="dpd-filters">
        <Search
          placeholder="Search file, owner, or id"
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

      <div className="dpd-table-wrap">
        <table className="dpd-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Owner</th>
              <th>Type</th>
              <th>Status</th>
              <th>Pages</th>
              <th>OCR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="dpd-mono">{row.id}</span>
                  <strong className="dpd-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.type} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} />
                </td>
                <td>{row.pages}</td>
                <td>{row.confidence ? `${Math.round(row.confidence * 100)}%` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="dpd-panel">
        <h2>Batch ingest</h2>
        <FileUpload
          label="PDF, TIFF, or JPEG"
          accept=".pdf,.tif,.tiff,.jpg,.jpeg,.png"
          hint="Priya Poluru reviews the first 20 files in a new batch."
          onChange={() => showToast({ title: 'Files queued', variant: 'info' })}
        />
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Document'}
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
                { term: 'Type', description: selected.type },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="OCR excerpt"
              language="json"
              code={`{\n  "id": "${selected.id}",\n  "pages": ${selected.pages},\n  "confidence": ${selected.confidence}\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
