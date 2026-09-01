import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import reviews from '../data/reviews.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatDuration, formatNumber } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { statusLabel } from '../lib/status.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const DECISION_OPTIONS = [
  { label: 'All decisions', value: 'all' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Escalated', value: 'escalated' },
];

export default function ReviewsPage() {
  const [decision, setDecision] = useState('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const filtered = reviews.decisions.filter((row) => decision === 'all' || row.decision === decision);
    return searchRecords(filtered, query, ['id', 'title', 'reviewer', 'policy', 'category']);
  }, [decision, query]);

  return (
    <div className="cmb-page">
      <PageHeader
        title="Completed reviews"
        description="Human decisions from today’s shift, including handle time and policy."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reviews' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Decisions today" value={formatNumber(reviews.summary.decisionsToday)} icon="bi-clipboard-check" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Approved" value={formatNumber(reviews.summary.approved)} icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Rejected" value={formatNumber(reviews.summary.rejected)} icon="bi-x-circle" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Median handle"
            value={formatDuration(reviews.summary.medianHandleMinutes)}
            hint={`${reviews.summary.escalated} escalated`}
            icon="bi-stopwatch"
            tone="info"
          />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search reviewer, policy, or case"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setDecision('all');
          setQuery('');
        }}
      >
        <Select
          label="Decision"
          options={DECISION_OPTIONS}
          value={decision}
          onChange={(event) => setDecision(event.target.value)}
        />
      </FilterBar>

      <ChartSection title={`${rows.length} decisions`} subtitle="Most recent first">
        <DataTable
          rows={rows}
          columns={[
            { key: 'id', label: 'Review', className: 'cmb-mono' },
            { key: 'title', label: 'Title' },
            {
              key: 'category',
              label: 'Category',
              render: (value) => statusLabel(value),
            },
            { key: 'reviewer', label: 'Reviewer' },
            { key: 'policy', label: 'Policy' },
            {
              key: 'decision',
              label: 'Decision',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'handleMinutes',
              label: 'Handle',
              render: (value) => formatDuration(value),
            },
            {
              key: 'decidedAt',
              label: 'When',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
