import { useMemo, useState } from 'react';
import { DescriptionList, Drawer, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import modelsData from '../data/models.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate, formatLatency, formatPercent, formatScore } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Deployed', value: 'deployed' },
  { label: 'Canary', value: 'canary' },
];

export default function ModelsPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const { models, summary } = modelsData;

  const rows = useMemo(() => {
    return searchRecords(models, query, ['name', 'task', 'owner', 'version']).filter(
      (model) => status === 'all' || model.status === status,
    );
  }, [models, query, status]);

  return (
    <div className="cvd-page">
      <PageHeader
        title="Vision models"
        description="yolov8-warehouse, pose-safety, anpr-gate, and defect-pcb with versions, mAP, and owners."
        crumbs={[BREADCRUMB_ROOT, { label: 'Models' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Production models" value={summary.production} hint={`${summary.canary} canary`} icon="bi-cpu" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Mean mAP" value={formatScore(summary.meanMap)} hint="Fleet weighted" icon="bi-bullseye" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="p95 latency" value={formatLatency(summary.p95LatencyMs)} hint="Across serving nodes" icon="bi-stopwatch" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Canaries" value={summary.canary} hint="anpr-gate · defect-pcb" icon="bi-bezier2" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="mAP vs latency" subtitle="Quality and serving cost by model">
            <BarChart
              labels={models.map((model) => model.name)}
              series={[
                { name: 'mAP × 100', color: '#0F766E', values: models.map((model) => model.map * 100) },
                { name: 'Latency ms', color: '#14B8A6', values: models.map((model) => model.latencyMs) },
              ]}
            />
          </ChartSection>
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search name, task, owner, or version"
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

      <ChartSection title={`${rows.length} models`} subtitle="Click a row for precision, recall, and runtime">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.status === 'canary' ? 'is-attention' : '')}
          columns={[
            { key: 'name', label: 'Model', className: 'cvd-mono' },
            { key: 'version', label: 'Version', className: 'cvd-mono' },
            { key: 'task', label: 'Task' },
            { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            { key: 'map', label: 'mAP', render: (value) => formatScore(value) },
            { key: 'latencyMs', label: 'Latency', render: (value) => formatLatency(value) },
            { key: 'owner', label: 'Owner' },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.name || 'Model'}
        size="lg"
      >
        {selected ? (
          <div>
            <p className="cvd-drawer-lead">{selected.notes}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <StatusBadge status={selected.status} />
              <span className="cvd-subtle">{selected.runtime}</span>
            </div>
            <DescriptionList
              items={[
                { term: 'Version', description: selected.version },
                { term: 'Owner', description: selected.owner },
                { term: 'mAP', description: formatScore(selected.map) },
                { term: 'Precision', description: formatPercent(selected.precision * 100) },
                { term: 'Recall', description: formatPercent(selected.recall * 100) },
                { term: 'Latency', description: formatLatency(selected.latencyMs) },
                { term: 'Sites', description: selected.sites.join(', ') },
                { term: 'Updated', description: formatDate(selected.updatedAt) },
              ]}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
