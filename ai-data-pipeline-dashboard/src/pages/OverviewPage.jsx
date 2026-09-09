import { Alert, Button, ProgressBar, Stat, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import pipelines from '../data/pipelines.json';
import quality from '../data/quality.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';
import { formatCompact } from '../lib/format.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const attention = pipelines.filter((item) => item.status === 'Delayed' || item.status === 'Failed');
  const failing = quality.filter((item) => item.status === 'Failing' || item.status === 'Watch');

  return (
    <div className="cd-page">
      <PageHeader
        title="Pipeline snapshot"
        description="Poluru Data · Subbu Poluru · eight named lanes across ingest, transform, quality, and lineage."
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
              onClick={() => showToast({ title: 'Jobs refreshed', variant: 'info' })}
            >
              Sync now
            </Button>
          </>
        }
      />

      <section className="cd-hero">
        <div>
          <p className="cd-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="cd-hero-meta">
          <div>
            <span>Throughput</span>
            <strong>{overview.ticker.rowsPerSec}/s</strong>
          </div>
          <div>
            <span>Failing</span>
            <strong>{overview.ticker.failing}</strong>
          </div>
          <div>
            <span>Freshness</span>
            <strong>{overview.ticker.fresh}</strong>
          </div>
        </div>
      </section>

      <div className="cd-stage-strip">
        {overview.stages.map((stage) => (
          <div className="cd-stage-chip" key={stage.id}>
            <span>{stage.label}</span>
            <strong>{stage.count}</strong>
            <span className="cd-subtle">{stage.hint}</span>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        {overview.kpis.map((kpi) => (
          <div className="col-12 col-sm-6 col-xl-4 col-xxl-2" key={kpi.id}>
            <StatCard
              label={kpi.label}
              value={kpi.value}
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
          <ChartSection title="Volume" subtitle="Ingested vs transformed rows · 7 days · millions">
            <AreaChart labels={overview.volumeTrend.labels} series={overview.volumeTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Quality mix" subtitle="Checks by current state">
            <DonutChart
              items={overview.qualityShare}
              centerLabel="Checks"
              centerValue={overview.qualityShare.reduce((sum, item) => sum + item.value, 0)}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Named pipelines"
            subtitle="Owner, lag, and 24h volume"
            action={
              <Link className="cd-text-link" to={`${BASE_PATH}/pipelines`}>
                Open pipelines
              </Link>
            }
          >
            <DataTable
              rows={pipelines}
              onRowClick={(row) => navigate(`${BASE_PATH}/pipelines/${row.id}`)}
              rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Delayed' ? 'is-attention' : '')}
              columns={[
                {
                  key: 'name',
                  label: 'Pipeline',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="cd-subtle">{row.source} → {row.destination}</div>
                    </div>
                  ),
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                {
                  key: 'qualityScore',
                  label: 'Quality',
                  render: (value) => (
                    <div className="cd-progress-cell">
                      <ProgressBar value={value} max={100} />
                      <span>{value}%</span>
                    </div>
                  ),
                },
                {
                  key: 'volume24h',
                  label: '24h',
                  render: (value) => formatCompact(value),
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection
            title="Needs attention"
            subtitle="Delayed jobs and failing checks"
            action={
              <Link className="cd-text-link" to={`${BASE_PATH}/quality`}>
                View quality
              </Link>
            }
          >
            <div className="cd-stack mb-3">
              <Stat label="Open issues" value={attention.length + failing.filter((item) => item.status === 'Failing').length} hint="SLA lag under 15 minutes" trend="up" trendValue="+1" />
            </div>
            <DataTable
              rows={[...attention.map((row) => ({ id: row.id, title: row.name, status: row.status, owner: row.owner }))]}
              onRowClick={(row) => navigate(`${BASE_PATH}/pipelines/${row.id}`)}
              columns={[
                { key: 'title', label: 'Job' },
                {
                  key: 'status',
                  label: 'State',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'owner', label: 'Owner' },
              ]}
            />
          </ChartSection>
        </div>
      </div>

      <section className="cd-panel">
        <header className="cd-panel-header">
          <div>
            <h2>Alerts</h2>
            <p>Lag, schema breaks, and lineage edits.</p>
          </div>
        </header>
        <div className="cd-alert-list">
          {overview.alerts.map((alert) => (
            <div key={alert.id} className="cd-alert-item">
              <Alert variant={alert.variant} title={alert.title} message={alert.message} />
              <Button
                variant="tertiary"
                size="sm"
                iconTrailing="chevron-right"
                onClick={() => navigate(alert.href)}
              >
                Inspect
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
