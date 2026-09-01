import { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import evaluations from '../data/evaluations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { modelOptions } from '../lib/models.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { ChartSection, DataTable, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function EvaluationsPage() {
  const [open, setOpen] = useState(false);
  const passed = evaluations.suites.filter((item) => item.outcome === 'Passed').length;
  const avg = (evaluations.suites.reduce((sum, item) => sum + item.score, 0) / evaluations.suites.length).toFixed(1);

  useEffect(() => {
    const run = () => setOpen(true);
    window.addEventListener('llm:run-eval', run);
    return () => window.removeEventListener('llm:run-eval', run);
  }, []);

  return (
    <div className="llm-page">
      <PageHeader
        title="Evaluations"
        description="Safety, groundedness, and field accuracy across the Poluru stacks."
        crumbs={[BREADCRUMB_ROOT, { label: 'Evaluations' }]}
        actions={
          <Button size="sm" icon="star" onClick={() => setOpen(true)}>
            Run evaluation
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Suites" value={evaluations.suites.length} icon="bi-clipboard-check" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Passed" value={passed} icon="bi-check-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Needs review" value={evaluations.suites.length - passed} icon="bi-eye" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Mean score" value={`${avg}%`} icon="bi-graph-up" tone="info" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Score trend" subtitle="Safety, groundedness, and Lens field accuracy">
            <AreaChart labels={evaluations.scoreTrend.labels} series={evaluations.scoreTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Latest scores" subtitle="Harini Poluru owns the Nova suite">
            {evaluations.suites.map((item) => (
              <div key={item.id} className="llm-score-row">
                <div>
                  <strong>{item.name}</strong>
                  <div className="llm-subtle">{item.owner}</div>
                </div>
                <ProgressBar value={item.score} max={100} />
                <span>{item.score}%</span>
              </div>
            ))}
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Evaluation runs" subtitle="Quality signals from the latest suites">
        <DataTable
          rows={evaluations.suites}
          columns={[
            {
              key: 'name',
              label: 'Suite',
              render: (_, row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="llm-subtle">{row.owner}</div>
                </div>
              ),
            },
            { key: 'model', label: 'Model' },
            {
              key: 'score',
              label: 'Score',
              render: (value) => (
                <div className="llm-progress-cell">
                  <ProgressBar value={value} max={100} />
                  <span>{value}%</span>
                </div>
              ),
            },
            {
              key: 'outcome',
              label: 'Outcome',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
        />
      </ChartSection>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Run evaluation"
        footer={(
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Eval queued', description: 'Harini Poluru will see Nova results in ~8 minutes.', variant: 'success' });
              }}
            >
              Start
            </Button>
          </>
        )}
      >
        <Select label="Model" options={modelOptions} defaultValue="nova" />
      </Modal>
    </div>
  );
}
