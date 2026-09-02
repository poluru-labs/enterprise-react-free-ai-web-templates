import { useMemo, useState } from 'react';
import { Button, ProgressBar, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import evaluations from '../data/evaluations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function EvaluationsPage() {
  const [query, setQuery] = useState('');
  const [outcome, setOutcome] = useState('all');

  const filtered = useMemo(() => {
    const byOutcome = evaluations.suites.filter((item) => outcome === 'all' || item.outcome === outcome);
    return searchRecords(byOutcome, query, ['name', 'prompt', 'owner']);
  }, [query, outcome]);

  const passed = evaluations.suites.filter((item) => item.outcome === 'Passed').length;
  const avg = (evaluations.suites.reduce((sum, item) => sum + item.score, 0) / evaluations.suites.length).toFixed(1);
  const failed = evaluations.suites.filter((item) => item.outcome === 'Failed').length;

  return (
    <div className="pmt-page">
      <PageHeader
        title="Evaluations"
        description="Suites, pass rates, and failing cases across Sravani Poluru’s golden sets."
        crumbs={[BREADCRUMB_ROOT, { label: 'Evaluations' }]}
        actions={
          <Button
            size="sm"
            icon="star"
            onClick={() => showToast({ title: 'Eval queued', description: 'Meera Poluru will see citation results in ~8 minutes.', variant: 'success' })}
          >
            Run evaluation
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Suites" value={evaluations.suites.length} icon="bi-clipboard-check" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Passed" value={passed} icon="bi-check-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Failed" value={failed} icon="bi-x-circle" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Mean score" value={`${avg}%`} icon="bi-graph-up" tone="info" />
        </div>
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search suites" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setOutcome('all');
        }}
      >
        <Select
          label="Outcome"
          value={outcome}
          onChange={(event) => setOutcome(event.target.value)}
          options={[
            { value: 'all', label: 'All outcomes' },
            { value: 'Passed', label: 'Passed' },
            { value: 'Review', label: 'Review' },
            { value: 'Failed', label: 'Failed' },
          ]}
        />
      </FilterBar>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Score trend" subtitle="Groundedness, citation nDCG, and refusal · 24–30 Aug">
            <AreaChart labels={evaluations.scoreTrend.labels} series={evaluations.scoreTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Latest scores" subtitle="Lakshmi Poluru owns the support suite">
            {filtered.map((item) => (
              <div key={item.id} className="pmt-score-row">
                <div>
                  <strong>{item.name}</strong>
                  <div className="pmt-subtle">{item.owner}</div>
                </div>
                <ProgressBar value={item.score} max={100} />
                <span>{formatPercent(item.score)}</span>
              </div>
            ))}
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="Evaluation suites" subtitle="Pass rates from the latest golden sets">
            <DataTable
              rows={filtered}
              columns={[
                {
                  key: 'name',
                  label: 'Suite',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="pmt-subtle">{row.prompt}</div>
                    </div>
                  ),
                },
                { key: 'owner', label: 'Owner' },
                { key: 'cases', label: 'Cases' },
                {
                  key: 'passRate',
                  label: 'Pass rate',
                  render: (value) => `${value}%`,
                },
                {
                  key: 'score',
                  label: 'Score',
                  render: (value) => (
                    <div className="pmt-progress-cell">
                      <ProgressBar value={value} max={100} />
                      <span>{formatPercent(value)}</span>
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
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="Failing cases" subtitle="RAG citation and legal ACL still need a re-eval">
            <DataTable
              rows={evaluations.failingCases}
              rowClassName={(row) => (row.suite.includes('Citation') ? 'is-severe' : 'is-attention')}
              columns={[
                { key: 'suite', label: 'Suite' },
                { key: 'prompt', label: 'Prompt' },
                { key: 'query', label: 'Query' },
                { key: 'reason', label: 'Reason' },
                { key: 'owner', label: 'Owner' },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
