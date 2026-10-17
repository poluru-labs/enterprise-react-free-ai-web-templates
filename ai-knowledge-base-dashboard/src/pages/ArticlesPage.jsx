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
import articles from '../data/articles.json';
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

export default function ArticlesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      articles.batches.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="knb-page">
      <PageHeader
        title="Articles"
        description="Published pages, drafts, and reviews. Desk owned by Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Articles' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Draft created', variant: 'success' })}
          >
            New article
          </Button>
        }
      />

      <div className="knb-filters">
        <Search
          placeholder="Search title, slug, or owner"
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
              <th>Article</th>
              <th>Owner</th>
              <th>Type</th>
              <th>Status</th>
              <th>Sections</th>
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

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Article'}
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
                { term: 'Title', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Type', description: selected.horizon },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Front matter"
              language="yaml"
              code={`id: ${selected.id}\nstatus: ${selected.status}\nowner: ${selected.owner}\nsections: ${selected.units}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
