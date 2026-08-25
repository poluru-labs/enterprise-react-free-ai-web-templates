import { useMemo, useState } from 'react';
import { Select } from '@poluru-labs/enterprise-design-system-react';
import evaluations from '../data/evaluations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { HorizontalBarChart } from '../components/charts/BarChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const SUITE_OPTIONS = [
  { label: 'All suites', value: 'all' },
  ...[...new Set(evaluations.runs.map((run) => run.suite))].map((suite) => ({
    label: suite,
    value: suite,
  })),
];

export default function EvaluationsPage() {
  const [suite, setSuite] = useState('all');

  const rows = useMemo(
    () => evaluations.runs.filter((run) => suite === 'all' || run.suite === suite),
    [suite],
  );

  return (
    <div className="amd-page">
      <PageHeader
        title="Evaluations"
        description="Golden-set pass rate, groundedness, and recent regression runs."
        crumbs={[BREADCRUMB_ROOT, { label: 'Evaluations' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Pass rate"
            value={formatPercent(evaluations.summary.passRate)}
            hint={`${evaluations.summary.evalRunsToday} runs today`}
            icon="bi-clipboard-check"
            tone="brand"
            trend="down"
            trendValue="-0.2 pts"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Groundedness"
            value={evaluations.summary.groundedness}
            hint="Eval-set hit rate"
            icon="bi-pin-map"
            tone="info"
            trend="down"
            trendValue="-0.4"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Hallucination rate"
            value={formatPercent(evaluations.summary.hallucinationRate)}
            hint="Detected fabricated claims"
            icon="bi-chat-square-quote"
            tone="warning"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Regressions"
            value={evaluations.summary.regressions}
            hint="Suites below last week's baseline"
            icon="bi-graph-down-arrow"
            tone="danger"
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Quality trend" subtitle="Pass rate and groundedness over 7 days">
            <AreaChart labels={evaluations.trend.labels} series={evaluations.trend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Suite mix" subtitle="Passing versus failing cases">
            <HorizontalBarChart
              items={evaluations.suites.map((item) => ({
                name: item.name,
                value: item.pass,
                color: item.color,
              }))}
            />
          </ChartSection>
        </div>
      </div>

      <FilterBar onReset={() => setSuite('all')}>
        <Select
          label="Eval suite"
          options={SUITE_OPTIONS}
          value={suite}
          onChange={(event) => setSuite(event.target.value)}
        />
      </FilterBar>

      <ChartSection title="Recent eval runs" subtitle="Click filters above to isolate a suite">
        <DataTable
          rows={rows}
          rowClassName={(row) => (row.status === 'failed' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'Run', className: 'amd-mono' },
            { key: 'suite', label: 'Suite' },
            { key: 'agentName', label: 'Agent' },
            {
              key: 'score',
              label: 'Score',
              render: (value, row) => (
                <span className={`amd-score ${row.status === 'failed' ? 'is-hot' : ''}`}>{value}</span>
              ),
            },
            {
              key: 'failedCases',
              label: 'Failed',
              render: (value, row) => `${value} / ${row.cases}`,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'ranAt',
              label: 'Ran',
              render: (value) => formatDateTime(value),
            },
            { key: 'note', label: 'Note' },
          ]}
        />
      </ChartSection>
    </div>
  );
}
