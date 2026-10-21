import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  CircularProgress,
  ProgressBar,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import segments from '../data/segments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  Active: 'success',
  Refreshing: 'warning',
};

export default function SegmentsPage() {
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState('all');

  const rows = useMemo(() => {
    let list = searchRecords(segments, query, ['name', 'owner', 'channel']);
    if (channel !== 'all') list = list.filter((row) => row.channel === channel);
    return list;
  }, [query, channel]);

  return (
    <div className="per-page">
      <PageHeader
        title="User segments"
        description="Rule sets with reach and holdout lift. Kavya Poluru refreshes lifecycle segments every Monday."
        crumbs={[BREADCRUMB_ROOT, { label: 'Segments' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Segment draft created', variant: 'success' })}
          >
            New segment
          </Button>
        }
      />

      <div className="per-filters">
        <Search
          placeholder="Search segment or owner"
          value={query}
          clearable
          onChange={(_, value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        <Select
          label="Channel"
          options={[
            { label: 'All', value: 'all' },
            { label: 'In-app', value: 'In-app' },
            { label: 'Email', value: 'Email' },
            { label: 'Push', value: 'Push' },
            { label: 'Lifecycle', value: 'Lifecycle' },
          ]}
          value={channel}
          onChange={(event) => setChannel(event.target.value)}
        />
      </div>

      <div className="per-segment-grid">
        {rows.map((row) => (
          <article key={row.id} className="per-segment-card">
            <div className="per-segment-head">
              <div>
                <span className="per-mono">{row.id}</span>
                <h3>{row.name}</h3>
              </div>
              <CircularProgress value={row.lift} max={35} size={72} showValue />
            </div>
            <div className="per-segment-meta">
              <Badge label={row.channel} variant="brand" soft size="sm" />
              <Status label={row.status} variant={STATUS_MAP[row.status] ?? 'neutral'} />
            </div>
            <p className="per-copy">
              {formatCompact(row.size)} users · {row.overlap}% overlap · {row.owner}
            </p>
            <div className="per-meter-row">
              <div className="per-meter-label">
                <span>Lift vs holdout</span>
                <strong>{formatPercent(row.lift)}</strong>
              </div>
              <ProgressBar value={row.lift} max={35} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
