import { useState } from 'react';
import {
  Button,
  Card,
  CircularProgress,
  Combobox,
  DescriptionList,
  MenuItem,
  Meter,
  ProgressBar,
  Skeleton,
  Spinner,
  SplitButton,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { findModel, modelOptions } from '../data';

const metrics = [
  { key: 'safety', label: 'Safety' },
  { key: 'ground', label: 'Groundedness' },
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'score', label: 'Index' },
];

export default function Compare() {
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
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Delta</span>
          <h1>Compare</h1>
          <p>{a.name} vs {b.name} · Meera Poluru</p>
        </div>
        <div className="row">
          {busy ? <Spinner size="sm" showLabel label="Scoring" /> : null}
          <SplitButton label="Compare" onClick={() => run(false)} onSelect={({ value }) => run(value === 'export')}>
            <MenuItem value="export" label="Compare and export" />
            <MenuItem value="view" label="Compare only" />
          </SplitButton>
        </div>
      </header>
      <div className="row" style={{ marginBottom: '1rem' }}>
        <div style={{ flex: 1, minWidth: '14rem' }}>
          <Combobox label="Model A" value={left} options={modelOptions} onChange={setLeft} />
        </div>
        <div style={{ flex: 1, minWidth: '14rem' }}>
          <Combobox label="Model B" value={right} options={modelOptions} onChange={setRight} />
        </div>
      </div>
      {busy ? (
        <div className="compare-grid">
          <Card><Skeleton lines={6} /></Card>
          <Card><Skeleton lines={6} /></Card>
        </div>
      ) : (
        <div className="compare-grid">
          {[a, b].map((model) => (
            <Card key={model.id} header={model.name}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <CircularProgress value={model.score} showValue />
                <DescriptionList
                  compact
                  items={[
                    { term: 'Owner', description: model.owner },
                    { term: 'Provider', description: model.provider },
                    { term: 'Latency', description: `${model.latency}ms` },
                  ]}
                />
              </div>
              {metrics.map((metric) => (
                <div key={metric.key} className="score-row">
                  <span className="muted">{metric.label}</span>
                  <ProgressBar value={model[metric.key]} max={100} />
                  <span>{model[metric.key]}</span>
                </div>
              ))}
              <Meter className="mt-3" label="Latency budget" value={Math.min(100, model.latency / 12)} showValue />
            </Card>
          ))}
        </div>
      )}
      <div style={{ marginTop: '0.85rem' }}>
      <Card header="Delta">
        <p className="note">
          {a.name} leads safety by {(a.safety - b.safety).toFixed(1)} pts.
          {b.name} is {b.latency < a.latency ? 'faster' : 'slower'} by {Math.abs(a.latency - b.latency)}ms.
          Meera Poluru should keep {a.score >= b.score ? a.name : b.name} in production.
        </p>
        <Button className="mt-3" size="sm" variant="secondary" icon="download" onClick={() => run(true)}>Export delta</Button>
      </Card>
      </div>
    </>
  );
}
