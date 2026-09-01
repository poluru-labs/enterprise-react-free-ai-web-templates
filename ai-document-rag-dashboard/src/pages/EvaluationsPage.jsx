import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import evaluations from '../data/evaluations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function EvaluationsPage() {
  return (
    <div className="rag-page">
      <PageHeader
        title="Evaluations"
        description="Keep your answer quality honest with faithfulness, citation coverage, and regression trend."
        crumbs={[BREADCRUMB_ROOT, { label: 'Evaluations' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Evaluation run queued', variant: 'success' })}>
            Run evaluation
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-4">
          <article className="rag-score-card">
            <p>Overall score</p>
            <strong>{evaluations.overall.score}</strong>
            <span>{evaluations.overall.label}</span>
            <div className="rag-score-bar">
              <span style={{ width: `${evaluations.overall.score}%` }} />
            </div>
            <small>{evaluations.overall.delta}</small>
          </article>
        </div>
        <div className="col-12 col-xl-8">
          <ChartSection title="Latest quality checks" subtitle="Faithfulness, citations, relevance, precision">
            <div className="rag-check-grid">
              {evaluations.checks.map((check) => (
                <div className="rag-check-row" key={check.label}>
                  <i className={`bi ${check.icon}`} aria-hidden="true" />
                  <span>{check.label}</span>
                  <strong>{check.score}</strong>
                </div>
              ))}
            </div>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Regression trend" subtitle="Latest suite scores">
            <BarChart items={evaluations.regression.items} unit="%" />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Evaluation runs"
            subtitle="Last 30 days"
            action={
              <Button variant="tertiary" size="sm" onClick={() => showToast({ title: 'Reports opened', variant: 'info' })}>
                View reports
              </Button>
            }
          >
            <DataTable
              rows={evaluations.runs}
              columns={[
                { key: 'name', label: 'Run' },
                { key: 'count', label: 'Set' },
                { key: 'score', label: 'Score' },
                { key: 'date', label: 'When' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
