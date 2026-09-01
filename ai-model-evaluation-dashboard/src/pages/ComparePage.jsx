import { useState } from 'react';
import {
  Button,
  Combobox,
  MenuItem,
  Skeleton,
  Spinner,
  SplitButton,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import modelsData from '../data/models.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatScore } from '../lib/format.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

const metrics = [
  { key: 'safety', label: 'Safety' },
  { key: 'ground', label: 'Groundedness' },
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'score', label: 'Index' },
];

const modelOptions = modelsData.models.map((item) => ({ value: item.id, label: item.name }));

function findModel(id) {
  return modelsData.models.find((item) => item.id === id) || modelsData.models[0];
}

export default function ComparePage() {
  const [left, setLeft] = useState('aurora');
  const [right, setRight] = useState('lens');
  const [busy, setBusy] = useState(false);
  const a = findModel(left);
  const b = findModel(right);

  function run(exportCsv) {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      showToast({
        title: exportCsv ? 'Comparison exported' : 'Comparison ready',
        description: exportCsv
          ? 'CSV sent to Meera Poluru.'
          : `${a.name} vs ${b.name} on the current index.`,
        variant: 'success',
      });
    }, 420);
  }

  return (
    <div className="prism-page">
      <PageHeader
        title="Compare"
        description={`${a.name} vs ${b.name} · Meera Poluru`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Compare' }]}
        actions={
          <>
            {busy ? <Spinner size="sm" showLabel label="Scoring" /> : null}
            <SplitButton label="Compare" onClick={() => run(false)} onSelect={({ value }) => run(value === 'export')}>
              <MenuItem value="export" label="Compare and export" />
              <MenuItem value="view" label="Compare only" />
            </SplitButton>
          </>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <Combobox label="Model A" value={left} options={modelOptions} onChange={setLeft} />
        </div>
        <div className="col-12 col-md-6">
          <Combobox label="Model B" value={right} options={modelOptions} onChange={setRight} />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {[a, b].map((model) => (
          <div className="col-12 col-md-6" key={model.id}>
            {busy ? (
              <article className="prism-model-card">
                <Skeleton lines={6} />
              </article>
            ) : (
              <article className="prism-model-card">
                <header>
                  <h3>{model.name}</h3>
                  <StatusBadge status={model.status} />
                </header>
                <p className="prism-card-metric">
                  <strong>{formatScore(model.score)}</strong>
                  <span>{model.owner} · {model.provider} · {model.latency}ms</span>
                </p>
                {metrics.map((metric) => (
                  <div key={metric.key} className="prism-score-row">
                    <span>{metric.label}</span>
                    <div className="prism-hbar-track">
                      <div
                        className="prism-hbar-fill"
                        style={{ width: `${model[metric.key]}%`, background: 'var(--prism-brand)' }}
                      />
                    </div>
                    <strong>{formatScore(model[metric.key])}</strong>
                  </div>
                ))}
                <p className="prism-card-note">{model.note}</p>
              </article>
            )}
          </div>
        ))}
      </div>

      <ChartSection
        title="Delta"
        subtitle={`${a.name} leads safety by ${formatScore(a.safety - b.safety)} pts.`}
        action={
          <Button size="sm" variant="secondary" icon="download" onClick={() => run(true)}>
            Export delta
          </Button>
        }
      >
        <BarChart
          items={[
            { name: `${a.name} safety`, value: a.safety, color: '#BE185D' },
            { name: `${b.name} safety`, value: b.safety, color: '#F9A8D4' },
            { name: `${a.name} index`, value: a.score, color: '#9D174D' },
            { name: `${b.name} index`, value: b.score, color: '#FBCFE8' },
          ]}
        />
        <p className="prism-note">
          {b.name} is {b.latency < a.latency ? 'faster' : 'slower'} by {Math.abs(a.latency - b.latency)}ms.
          Meera Poluru should keep {a.score >= b.score ? a.name : b.name} in production.
        </p>
      </ChartSection>
    </div>
  );
}
