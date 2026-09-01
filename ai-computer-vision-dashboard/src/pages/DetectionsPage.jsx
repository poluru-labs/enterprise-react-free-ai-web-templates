import { useMemo, useState } from 'react';
import { DescriptionList, Drawer, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import detections from '../data/detections.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatConfidence, formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  ConfidenceBadge,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const LABEL_OPTIONS = [
  { label: 'All classes', value: 'all' },
  { label: 'Forklift', value: 'forklift' },
  { label: 'PPE', value: 'ppe' },
  { label: 'Person', value: 'person' },
  { label: 'Plate', value: 'plate' },
  { label: 'Defect', value: 'defect' },
  { label: 'Helmet', value: 'helmet' },
];

export default function DetectionsPage() {
  const [label, setLabel] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    return searchRecords(detections.events, query, ['id', 'label', 'camera', 'site', 'model']).filter(
      (event) => label === 'all' || event.label === label,
    );
  }, [label, query]);

  return (
    <div className="cvd-page">
      <PageHeader
        title="Detections"
        description="Forklift, PPE, person, plate, and defect events with confidence, camera, and time."
        crumbs={[BREADCRUMB_ROOT, { label: 'Detections' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Events today" value={formatCompact(detections.summary.today)} hint="Across 46 live cameras" icon="bi-bounding-box" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="High confidence" value={formatCompact(detections.summary.highConfidence)} hint="≥ 0.90" icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Review queue" value={detections.summary.reviewQueue} hint="Low-confidence or policy" icon="bi-inbox" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Mean confidence" value={formatConfidence(detections.summary.meanConfidence)} hint="Last 24 hours" icon="bi-graph-up" tone="info" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search class, camera, site, or model"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setLabel('all');
          setQuery('');
        }}
      >
        <Select label="Class" options={LABEL_OPTIONS} value={label} onChange={(event) => setLabel(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} events`} subtitle="Click a row for bounding box and model">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.confidence < 0.5 ? 'is-severe' : row.confidence < 0.75 ? 'is-attention' : '')}
          columns={[
            { key: 'time', label: 'Time', render: (value) => formatDateTime(value) },
            { key: 'label', label: 'Class' },
            { key: 'camera', label: 'Camera', className: 'cvd-mono' },
            { key: 'site', label: 'Site' },
            { key: 'confidence', label: 'Confidence', render: (value) => <ConfidenceBadge value={value} /> },
            { key: 'model', label: 'Model', className: 'cvd-mono' },
            { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Detection'}
        size="md"
      >
        {selected ? (
          <DescriptionList
            items={[
              { term: 'Class', description: selected.label },
              { term: 'Camera', description: selected.camera },
              { term: 'Site', description: selected.site },
              { term: 'Confidence', description: formatConfidence(selected.confidence) },
              { term: 'Model', description: selected.model },
              { term: 'Bounding box', description: selected.bbox },
              { term: 'Time', description: formatDateTime(selected.time) },
            ]}
          />
        ) : null}
      </Drawer>
    </div>
  );
}
