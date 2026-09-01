import quality from '../data/quality.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent, formatScore } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { HorizontalBarChart } from '../components/charts/BarChart.jsx';
import {
  ChartSection,
  DataTable,
  PageHeader,
  SeverityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function QualityPage() {
  return (
    <div className="cvd-page">
      <PageHeader
        title="Quality and drift"
        description="Precision, recall, confusion notes, and domain drift across the four production models."
        crumbs={[BREADCRUMB_ROOT, { label: 'Quality' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Precision" value={formatScore(quality.summary.precision)} hint="Fleet weighted" icon="bi-bullseye" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Recall" value={formatScore(quality.summary.recall)} hint="Holding after night-shift-aug" icon="bi-graph-up" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="F1" value={formatScore(quality.summary.f1)} hint="Harmonic mean" icon="bi-intersect" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Drift score" value={formatScore(quality.summary.driftScore, 2)} hint="ANPR is the driver" icon="bi-activity" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Precision / recall" subtitle="Seven-day quality trend">
            <AreaChart labels={quality.trend.labels} series={quality.trend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Confusion hotspots" subtitle="Predicted vs actual this shift">
            <HorizontalBarChart
              items={quality.confusion.map((item) => ({
                name: `${item.predicted} → ${item.actual}`,
                value: item.count,
                color: item.severity === 'high' ? '#B42318' : item.severity === 'medium' ? '#B45309' : '#0F766E',
              }))}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Per-model scorecard" subtitle="Precision, recall, and drift posture">
            <DataTable
              rows={quality.byModel}
              rowKey="name"
              columns={[
                { key: 'name', label: 'Model', className: 'cvd-mono' },
                { key: 'precision', label: 'Precision', render: (value) => formatPercent(value * 100) },
                { key: 'recall', label: 'Recall', render: (value) => formatPercent(value * 100) },
                { key: 'f1', label: 'F1', render: (value) => formatScore(value) },
                { key: 'drift', label: 'Drift', render: (value) => <StatusBadge status={value} /> },
                { key: 'note', label: 'Note' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Confusion notes" subtitle="What operators are seeing in review">
            <ul className="cvd-note-list">
              {quality.notes.map((note) => (
                <li key={note.id}>
                  <i className="bi bi-lightbulb" aria-hidden="true" />
                  <div>
                    <strong>{note.title}</strong>
                    <p className="mb-0">{note.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Confusion pairs" subtitle="Counts that should feed the next train">
        <DataTable
          rows={quality.confusion}
          rowKey="actual"
          columns={[
            { key: 'predicted', label: 'Predicted' },
            { key: 'actual', label: 'Actual' },
            { key: 'count', label: 'Count' },
            { key: 'severity', label: 'Severity', render: (value) => <SeverityBadge severity={value} /> },
          ]}
        />
      </ChartSection>
    </div>
  );
}
