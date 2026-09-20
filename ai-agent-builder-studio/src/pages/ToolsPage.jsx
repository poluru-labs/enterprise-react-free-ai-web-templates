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
import toolsData from '../data/tools.json';
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

export default function ToolsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      toolsData.tools.filter((tool) => {
        const hay = `${tool.name} ${tool.owner}`.toLowerCase();
        return (status === 'all' || tool.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="abs-page">
      <PageHeader
        title="Tools"
        description="Registry of versioned tools with owners and call volume."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tools' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Draft tool created', variant: 'success' })}
          >
            Add tool
          </Button>
        }
      />

      <div className="abs-filters">
        <Search
          placeholder="Search name or owner"
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

      <div className="abs-table-wrap">
        <table className="abs-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Version</th>
              <th>Calls</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td className="abs-mono">{row.name}</td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.status} variant={STATUS_VARIANT[row.status]} soft pill size="sm" />
                </td>
                <td>{row.version}</td>
                <td>{row.calls.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="abs-panel">
        <h2>Import spec</h2>
        <FileUpload
          label="OpenAPI or JSON schema"
          accept=".json,.yaml,.yml"
          hint="Priya Poluru reviews imports on Tuesdays."
          onChange={() => showToast({ title: 'Spec queued', variant: 'info' })}
        />
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.name || 'Tool'}
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
                { term: 'Status', description: selected.status },
                { term: 'Version', description: selected.version },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Contract"
              language="json"
              code={`{\n  "name": "${selected.name}",\n  "version": "${selected.version}"\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
