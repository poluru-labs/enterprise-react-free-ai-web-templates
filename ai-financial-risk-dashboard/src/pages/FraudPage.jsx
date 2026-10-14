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
import fraud from '../data/fraud.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'Active', value: 'active' },
  { label: 'Review', value: 'review' },
  { label: 'Closed', value: 'closed' },
];

const STATUS_MAP = {
  urgent: 'danger',
  active: 'warning',
  review: 'info',
  closed: 'success',
};

export default function FraudPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      fraud.cases.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="frd-page">
      <PageHeader
        title="Fraud"
        description="Alerts, cases, and graph signals. Desk owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Fraud' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Case created', variant: 'success' })}
          >
            New case
          </Button>
        }
      />

      <div className="frd-filters">
        <Search
          placeholder="Search case, channel, or owner"
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

      <div className="frd-table-wrap">
        <table className="frd-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Owner</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Exposure</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="frd-mono">{row.id}</span>
                  <strong className="frd-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.channel} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} pulse={row.status === 'urgent'} />
                </td>
                <td>${row.loss.toLocaleString()}</td>
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
        heading={selected?.id || 'Case'}
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
                { term: 'Summary', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Channel', description: selected.channel },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Graph excerpt"
              language="json"
              code={`{\n  "caseId": "${selected.id}",\n  "lossUsd": ${selected.loss},\n  "status": "${selected.status}"\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
