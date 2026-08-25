import { useMemo, useState } from 'react';
import { Select } from '@poluru-labs/enterprise-design-system-react';
import failures from '../data/failures.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { statusLabel } from '../lib/status.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  StatusBadge,
} from '../components/widgets/index.js';

const REASON_OPTIONS = [
  { label: 'All reasons', value: 'all' },
  ...failures.reasons.map((reason) => ({ label: reason.name, value: reason.id })),
];

export default function FailuresPage() {
  const [reason, setReason] = useState('all');

  const logs = useMemo(
    () => failures.logs.filter((row) => reason === 'all' || row.reason === reason),
    [reason],
  );

  return (
    <div className="amd-page">
      <PageHeader
        title="Failures"
        description="Why agents stop: timeouts, tool errors, validation, hallucinations, and memory overflow."
        crumbs={[BREADCRUMB_ROOT, { label: 'Failures' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Failures today</span>
            <strong>{failures.summary.failuresToday}</strong>
          </article>
        </div>
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Failure rate</span>
            <strong>{formatPercent(failures.summary.failureRate)}</strong>
          </article>
        </div>
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Top reason</span>
            <strong>{statusLabel(failures.summary.topReason)}</strong>
          </article>
        </div>
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>MTTR</span>
            <strong>{failures.summary.mttrMinutes}m</strong>
          </article>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {failures.reasons.map((item) => (
          <div className="col-12 col-md-6 col-xl" key={item.id}>
            <button
              type="button"
              className={`amd-reason-card ${reason === item.id ? 'is-active' : ''}`}
              onClick={() => setReason(item.id === reason ? 'all' : item.id)}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>{item.name}</span>
                <SeverityBadge severity={item.severity} />
              </div>
              <strong>{item.count}</strong>
              <p>{formatPercent(item.share)} of failures</p>
              <span className="amd-reason-bar" style={{ background: item.color, width: `${item.share}%` }} />
            </button>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Failure volume" subtitle="Daily count over the last week">
            <AreaChart labels={failures.trend.labels} series={failures.trend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Reason mix" subtitle="Share of today’s failures">
            <DonutChart
              items={failures.reasons.map((item) => ({
                name: item.name,
                value: item.count,
                color: item.color,
              }))}
              centerLabel="Today"
              centerValue={failures.summary.failuresToday}
            />
          </ChartSection>
        </div>
      </div>

      <FilterBar
        onReset={() => setReason('all')}
      >
        <Select
          label="Failure reason"
          options={REASON_OPTIONS}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
      </FilterBar>

      <ChartSection title="Failure log" subtitle="Most recent abort events across agents">
        <DataTable
          rows={logs}
          columns={[
            { key: 'id', label: 'ID', className: 'amd-mono' },
            { key: 'agentName', label: 'Agent' },
            {
              key: 'reason',
              label: 'Reason',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'severity',
              label: 'Severity',
              render: (value) => <SeverityBadge severity={value} />,
            },
            { key: 'message', label: 'Detail' },
            {
              key: 'occurredAt',
              label: 'When',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
