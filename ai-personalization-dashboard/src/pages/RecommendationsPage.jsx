import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  CodeSnippet,
  Drawer,
  ProgressBar,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import recommendations from '../data/recommendations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  Live: 'success',
  'In review': 'warning',
  Draft: 'info',
};

export default function RecommendationsPage() {
  const [query, setQuery] = useState('');
  const [surface, setSurface] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    let list = searchRecords(recommendations, query, ['slot', 'model', 'owner', 'surface']);
    if (surface !== 'all') list = list.filter((row) => row.surface === surface);
    return list;
  }, [query, surface]);

  return (
    <div className="per-page">
      <PageHeader
        title="Recommendations"
        description="Ranked slots by surface and model. Maya Poluru owns in-app placement."
        crumbs={[BREADCRUMB_ROOT, { label: 'Recommendations' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Slot draft added', variant: 'success' })}
          >
            New slot
          </Button>
        }
      />

      <div className="per-filters">
        <Search
          placeholder="Search slot, model, or owner"
          value={query}
          clearable
          onChange={(_, value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        <Select
          label="Surface"
          options={[
            { label: 'All surfaces', value: 'all' },
            { label: 'In-app', value: 'In-app' },
            { label: 'Checkout', value: 'Checkout' },
            { label: 'Email', value: 'Email' },
            { label: 'Push', value: 'Push' },
          ]}
          value={surface}
          onChange={(event) => setSurface(event.target.value)}
        />
      </div>

      <div className="per-table-wrap">
        <table className="per-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Surface</th>
              <th>Model</th>
              <th>CTR</th>
              <th>Lift</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="per-mono">{row.id}</span>
                  <strong className="per-cell-title">{row.slot}</strong>
                </td>
                <td>
                  <Badge label={row.surface} variant="brand" soft size="sm" />
                </td>
                <td>{row.model}</td>
                <td>{formatPercent(row.ctr)}</td>
                <td>
                  <div className="per-score-cell">
                    <span>{formatPercent(row.lift)}</span>
                    <ProgressBar value={row.lift} max={20} />
                  </div>
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status] ?? 'neutral'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        heading={selected?.slot ?? 'Slot'}
        size="md"
      >
        {selected ? (
          <>
            <p className="per-copy">
              {selected.owner} · updated {formatDateTime(selected.updated)}
            </p>
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  slot: selected.slot,
                  surface: selected.surface,
                  model: selected.model,
                  ctr: selected.ctr,
                  lift: selected.lift,
                },
                null,
                2,
              )}
            />
            <div className="per-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Ranking saved', variant: 'success' })}>
                Save ranking
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Holdout enabled', variant: 'info' })}
              >
                Enable holdout
              </Button>
            </div>
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
