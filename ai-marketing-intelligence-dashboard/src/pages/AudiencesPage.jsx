import { useMemo, useState } from 'react';
import {
  Badge,
  CircularProgress,
  ProgressBar,
  Search,
  Select,
  Status,
  showToast,
  Button,
} from '@poluru-labs/enterprise-design-system-react';
import audiences from '../data/audiences.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  Active: 'success',
  Refreshing: 'warning',
};

export default function AudiencesPage() {
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState('all');

  const rows = useMemo(() => {
    let list = searchRecords(audiences, query, ['name', 'owner', 'channel']);
    if (channel !== 'all') list = list.filter((row) => row.channel === channel);
    return list;
  }, [query, channel]);

  return (
    <div className="mid-page">
      <PageHeader
        title="Audiences"
        description="Segment reach, lift, and overlap. Kavya Poluru refreshes lifecycle cohorts every Monday."
        crumbs={[BREADCRUMB_ROOT, { label: 'Audiences' }]}
        actions={
          <Button
            size="sm"
            icon="refresh"
            onClick={() => showToast({ title: 'Lookalike sync started', variant: 'success' })}
          >
            Refresh seeds
          </Button>
        }
      />

      <div className="mid-filters">
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
            { label: 'Paid', value: 'Paid' },
            { label: 'Email', value: 'Email' },
            { label: 'Lifecycle', value: 'Lifecycle' },
          ]}
          value={channel}
          onChange={(event) => setChannel(event.target.value)}
        />
      </div>

      <div className="mid-audience-grid">
        {rows.map((row) => (
          <article key={row.id} className="mid-audience-card">
            <div className="mid-audience-head">
              <div>
                <span className="mid-mono">{row.id}</span>
                <h3>{row.name}</h3>
              </div>
              <CircularProgress value={row.lift} max={30} size={72} showValue />
            </div>
            <div className="mid-audience-meta">
              <Badge label={row.channel} variant="brand" soft size="sm" />
              <Status label={row.status} variant={STATUS_MAP[row.status] ?? 'neutral'} />
            </div>
            <p className="mid-copy">
              {formatCompact(row.size)} profiles · {row.overlap}% overlap · {row.owner}
            </p>
            <div className="mid-channel-row">
              <div className="mid-channel-label">
                <span>Lift vs holdout</span>
                <strong>{formatPercent(row.lift)}</strong>
              </div>
              <ProgressBar value={row.lift} max={30} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
