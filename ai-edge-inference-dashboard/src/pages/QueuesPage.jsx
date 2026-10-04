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
import queues from '../data/queues.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'Active', value: 'active' },
  { label: 'Hold', value: 'hold' },
  { label: 'Done', value: 'done' },
];

const STATUS_MAP = {
  urgent: 'danger',
  active: 'info',
  hold: 'warning',
  done: 'success',
};

export default function QueuesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      queues.queues.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="hco-page">
      <PageHeader
        title="Clinical queues"
        description="ED, clinic, discharge, and virtual worklists. Triage owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Queues' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Lane created', variant: 'success' })}
          >
            Add lane
          </Button>
        }
      />

      <div className="hco-filters">
        <Search
          placeholder="Search case, owner, or id"
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

      <div className="hco-table-wrap">
        <table className="hco-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Owner</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Wait</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="hco-mono">{row.id}</span>
                  <strong className="hco-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.unit} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} pulse={row.status === 'urgent'} />
                </td>
                <td>{row.waitMin ? `${row.waitMin} min` : '—'}</td>
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
        heading={selected?.id || 'Queue'}
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
                { term: 'Case', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Unit', description: selected.unit },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Queue snapshot"
              language="json"
              code={`{\n  "id": "${selected.id}",\n  "waitMin": ${selected.waitMin},\n  "status": "${selected.status}"\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
