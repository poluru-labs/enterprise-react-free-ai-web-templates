import { Alert, Badge } from '@poluru-labs/enterprise-design-system-react';
import toolCalls from '../data/toolCalls.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatLatency, formatNumber, formatPercent } from '../lib/format.js';
import { GroupedBarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

function toolTone(status) {
  if (status === 'failing') return 'failed';
  if (status === 'slow') return 'watching';
  if (status === 'watch') return 'queued';
  return 'healthy';
}

export default function ToolCallsPage() {
  const failing = toolCalls.tools.filter((tool) => tool.status === 'failing');
  const slow = toolCalls.tools.filter((tool) => tool.status === 'slow');

  return (
    <div className="amd-page">
      <PageHeader
        title="Tool calls"
        description="Watch success rate, latency, and regressions across the tool belt."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tool Calls' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Calls today</span>
            <strong>{formatNumber(toolCalls.summary.totalCallsToday)}</strong>
          </article>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Avg success rate</span>
            <strong>{formatPercent(toolCalls.summary.avgSuccessRate)}</strong>
          </article>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Avg latency</span>
            <strong>{formatLatency(toolCalls.summary.avgLatencyMs)}</strong>
          </article>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Tools needing attention</span>
            <strong>{toolCalls.summary.slowTools + toolCalls.summary.failingTools}</strong>
          </article>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {failing.map((tool) => (
          <div className="col-12 col-lg-6" key={tool.id}>
            <Alert
              variant="danger"
              title={`${tool.name} is failing`}
              message={`Success rate ${formatPercent(tool.successRate)} · error budget ${tool.errorBudgetUsed}% used · last call ${formatDateTime(tool.lastUsed)}.`}
            />
          </div>
        ))}
        {slow.map((tool) => (
          <div className="col-12 col-lg-6" key={tool.id}>
            <Alert
              variant="warning"
              title={`${tool.name} is slow`}
              message={`Average latency ${formatLatency(tool.avgLatencyMs)} with p95 ${formatLatency(tool.p95LatencyMs)}. Budget is 1.20s.`}
            />
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection
            title="Usage trend"
            subtitle="Highest-volume tools over the last 7 days"
          >
            <GroupedBarChart labels={toolCalls.usageTrend.labels} series={toolCalls.usageTrend.series} />
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Tool inventory" subtitle="Success, latency, and last-used telemetry">
        <DataTable
          rows={toolCalls.tools}
          rowClassName={(row) => (row.status === 'failing' || row.status === 'slow' ? 'is-attention' : '')}
          columns={[
            {
              key: 'name',
              label: 'Tool',
              className: 'amd-mono',
              render: (value, row) => (
                <div>
                  <strong>{value}</strong>
                  <div className="amd-subtle">{row.ownerAgent}</div>
                </div>
              ),
            },
            {
              key: 'totalCalls',
              label: 'Total calls',
              render: (value) => formatNumber(value),
            },
            {
              key: 'successRate',
              label: 'Success rate',
              render: (value) => formatPercent(value),
            },
            {
              key: 'avgLatencyMs',
              label: 'Avg latency',
              render: (value) => formatLatency(value),
            },
            {
              key: 'lastUsed',
              label: 'Last used',
              render: (value) => formatDateTime(value),
            },
            {
              key: 'status',
              label: 'Health',
              render: (value, row) => (
                <div className="d-flex align-items-center gap-2">
                  <StatusBadge status={toolTone(value)} />
                  {row.errorBudgetUsed >= 80 ? (
                    <Badge label="Budget" variant="danger" size="sm" soft />
                  ) : null}
                </div>
              ),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
