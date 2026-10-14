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
import predictions from '../data/predictions.json';
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

export default function PredictionsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(
    () =>
      predictions.forecasts.filter((row) => {
        const hay = `${row.name} ${row.owner} ${row.id}`.toLowerCase();
        return (status === 'all' || row.status === status) && (!query || hay.includes(query.toLowerCase()));
      }),
    [query, status],
  );

  return (
    <div className="fpl-page">
      <PageHeader
        title="Predictions"
        description="Horizons, units, and overrides. Desk owned by Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Predictions' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Forecast run queued', variant: 'success' })}
          >
            Run forecast
          </Button>
        }
      />

      <div className="fpl-filters">
        <Search
          placeholder="Search SKU, horizon, or owner"
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

      <div className="fpl-table-wrap">
        <table className="fpl-table">
          <thead>
            <tr>
              <th>Forecast</th>
              <th>Owner</th>
              <th>Horizon</th>
              <th>Status</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="fpl-mono">{row.id}</span>
                  <strong className="fpl-cell-title">{row.name}</strong>
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
        heading={selected?.id || 'Forecast'}
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
                { term: 'SKU pack', description: selected.name },
                { term: 'Owner', description: selected.owner },
                { term: 'Horizon', description: selected.horizon },
                { term: 'Updated', description: selected.updated },
              ]}
            />
            <CodeSnippet
              label="Point forecast"
              language="json"
              code={`{\n  "id": "${selected.id}",\n  "units": ${selected.units},\n  "status": "${selected.status}"\n}`}
            />
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
