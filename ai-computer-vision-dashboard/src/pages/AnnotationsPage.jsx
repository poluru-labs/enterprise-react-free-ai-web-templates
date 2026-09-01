import { useMemo, useState } from 'react';
import { Search, Select, showToast, Button } from '@poluru-labs/enterprise-design-system-react';
import annotations from '../data/annotations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Queued', value: 'queued' },
  { label: 'In review', value: 'in_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export default function AnnotationsPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    return searchRecords(annotations.frames, query, ['id', 'frame', 'camera', 'label', 'assignee', 'dataset']).filter(
      (frame) => status === 'all' || frame.status === status,
    );
  }, [status, query]);

  return (
    <div className="cvd-page">
      <PageHeader
        title="Annotation queue"
        description="Frames waiting on class labels, with assignee and review status."
        crumbs={[BREADCRUMB_ROOT, { label: 'Annotations' }]}
        actions={
          <Button size="sm" onClick={() => showToast({ title: 'Batch assigned to Jonah Poluru', variant: 'success' })}>
            Assign next 10
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Queued" value={annotations.summary.queued} hint="Unclaimed frames" icon="bi-hourglass" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="In review" value={annotations.summary.inReview} hint="Needs second pair of eyes" icon="bi-eye" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Approved today" value={annotations.summary.approvedToday} hint="Promoted to gold" icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Rejected today" value={annotations.summary.rejectedToday} hint="Sent back to queue" icon="bi-x-circle" tone="danger" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search frame, camera, class, or assignee"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setStatus('all');
          setQuery('');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} frames`} subtitle="Helmet, plate, and defect labels in the current queue">
        <DataTable
          rows={rows}
          rowClassName={(row) => (row.status === 'rejected' ? 'is-severe' : row.priority === 'high' ? 'is-attention' : '')}
          columns={[
            { key: 'frame', label: 'Frame', className: 'cvd-mono' },
            { key: 'camera', label: 'Camera', className: 'cvd-mono' },
            { key: 'site', label: 'Site' },
            { key: 'label', label: 'Class' },
            { key: 'assignee', label: 'Assignee' },
            { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            { key: 'priority', label: 'Priority', render: (value) => <SeverityBadge severity={value} /> },
            { key: 'dataset', label: 'Dataset', className: 'cvd-mono' },
            { key: 'submittedAt', label: 'Submitted', render: (value) => formatDateTime(value) },
          ]}
        />
      </ChartSection>
    </div>
  );
}
