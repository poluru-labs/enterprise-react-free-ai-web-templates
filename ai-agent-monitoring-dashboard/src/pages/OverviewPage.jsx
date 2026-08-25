import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link } from 'react-router-dom';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { HorizontalBarChart } from '../components/charts/BarChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { AlertPanel, ChartSection, DataTable, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

const activityTone = {
  success: 'completed',
  danger: 'failed',
  warning: 'watching',
  info: 'running',
};

export default function OverviewPage() {
  return (
    <div className="amd-page">
      <PageHeader
        title="Operations snapshot"
        description="Live view of autonomous fleet throughput, reliability, and memory posture."
        crumbs={[BREADCRUMB_ROOT, { label: 'Overview' }]}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              icon="download"
              onClick={() => showToast({ title: 'Snapshot queued', variant: 'success' })}
            >
              Export
            </Button>
            <Button
              size="sm"
              icon="refresh"
              onClick={() => showToast({ title: 'Telemetry refreshed', variant: 'info' })}
            >
              Sync now
            </Button>
          </>
        }
      />

      <section className="amd-hero">
        <div>
          <p className="amd-kicker">Monday · 24 Aug 2026 · last sync 12s ago</p>
          <h2>Fleet is productive, with two reliability hotspots.</h2>
          <p>
            Completion is tracking ahead of last week, but Sentinel Ops loop rate and Helix Data memory
            saturation need operator attention.
          </p>
        </div>
        <div className="amd-hero-meta">
          <div>
            <span>Completion ratio</span>
            <strong>89.3%</strong>
          </div>
          <div>
            <span>Open alerts</span>
            <strong>3</strong>
          </div>
          <div>
            <span>MTTR</span>
            <strong>18m</strong>
          </div>
        </div>
      </section>

      <div className="row g-3 mb-3">
        {overview.kpis.map((kpi) => (
          <div className="col-12 col-sm-6 col-xl-4 col-xxl-2" key={kpi.id}>
            <StatCard
              label={kpi.label}
              value={typeof kpi.value === 'number' ? formatNumber(kpi.value) : kpi.value}
              hint={kpi.hint}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon}
              tone={kpi.tone}
              sparkline={kpi.sparkline}
            />
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Task completion trend"
            subtitle="Started versus completed over the last 7 days"
          >
            <AreaChart labels={overview.taskTrend.labels} series={overview.taskTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-md-6 col-xl-5">
          <ChartSection title="Tool usage distribution" subtitle="Call volume by tool · today">
            <HorizontalBarChart items={overview.toolUsage} />
          </ChartSection>
        </div>
        <div className="col-12 col-md-6 col-xl-4">
          <ChartSection title="Failure reasons" subtitle="Taxonomy of today’s 102 failures">
            <DonutChart items={overview.failureReasons} centerLabel="Failures" centerValue="102" />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-8">
          <AlertPanel alerts={overview.alerts} />
        </div>
      </div>

      <ChartSection
        title="Recent agent activity"
        subtitle="Newest events across the production fleet"
        action={
          <Link className="amd-text-link" to={`${BASE_PATH}/tasks`}>
            View tasks
          </Link>
        }
      >
        <DataTable
          rows={overview.recentActivity}
          columns={[
            {
              key: 'time',
              label: 'Time',
              render: (value) => formatDateTime(value),
            },
            { key: 'agent', label: 'Agent' },
            { key: 'event', label: 'Event' },
            {
              key: 'type',
              label: 'Signal',
              render: (value) => <StatusBadge status={activityTone[value] || value} />,
            },
            {
              key: 'ref',
              label: 'Ref',
              className: 'amd-mono',
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
