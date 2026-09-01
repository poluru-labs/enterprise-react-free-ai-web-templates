import { Alert, Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDuration, formatNumber, formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import {
  ChartSection,
  DataTable,
  PageHeader,
  SeverityBadge,
  StatCard,
} from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const categoryTotal = overview.categories.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="cmb-page">
      <PageHeader
        title="Safety snapshot"
        description="Pending queue, auto-moderation coverage, and the cases that still need a human."
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
              onClick={() => showToast({ title: 'Queue refreshed', variant: 'info' })}
            >
              Sync now
            </Button>
          </>
        }
      />

      <section className="cmb-hero">
        <div>
          <p className="cmb-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="cmb-hero-meta">
          <div>
            <span>Pending</span>
            <strong>{formatNumber(overview.ticker.pending)}</strong>
          </div>
          <div>
            <span>Auto-mod</span>
            <strong>{overview.ticker.autoModRate}%</strong>
          </div>
          <div>
            <span>Median SLA</span>
            <strong>{overview.ticker.medianSlaMinutes}m</strong>
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
          <ChartSection title="Inbound volume" subtitle="Submitted, auto-actioned, and human-reviewed · 7 days">
            <AreaChart labels={overview.volumeTrend.labels} series={overview.volumeTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Open queue by category" subtitle="Hate, spam, sexual, self-harm, PII, scam">
            <DonutChart items={overview.categories} centerLabel="Open" centerValue={categoryTotal} />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {overview.policyHealth.map((policy) => (
          <div className="col-12 col-md-6 col-xl-4" key={policy.id}>
            <article className="cmb-policy-card">
              <header>
                <h3>{policy.name}</h3>
                <span className={`cmb-mode cmb-mode-${policy.mode}`}>{policy.mode}</span>
              </header>
              <p className="cmb-policy-metric">
                <strong>{formatNumber(policy.blocksToday)}</strong>
                <span>blocks today</span>
              </p>
              <p className="cmb-policy-note">{policy.note}</p>
              <footer>
                Precision {formatPercent(policy.precision)}
              </footer>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Live queue preview"
            subtitle="Oldest or hottest items waiting on a reviewer"
            action={
              <Link className="cmb-text-link" to={`${BASE_PATH}/queue`}>
                Open queue
              </Link>
            }
          >
            <DataTable
              rows={overview.queuePreview}
              onRowClick={() => navigate(`${BASE_PATH}/queue`)}
              columns={[
                { key: 'id', label: 'Case', className: 'cmb-mono' },
                { key: 'title', label: 'Title' },
                { key: 'source', label: 'Source' },
                {
                  key: 'severity',
                  label: 'Severity',
                  render: (value) => <SeverityBadge severity={value} />,
                },
                {
                  key: 'ageMinutes',
                  label: 'Age',
                  render: (value) => formatDuration(value),
                },
                { key: 'assignee', label: 'Assignee' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <section className="cmb-panel cmb-alert-panel">
            <header className="cmb-panel-header">
              <div>
                <h2>Alerts</h2>
                <p>SLA, dual-review, and classifier regressions.</p>
              </div>
            </header>
            <div className="cmb-alert-list">
              {overview.alerts.map((alert) => (
                <div key={alert.id} className="cmb-alert-item">
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
      </div>
    </div>
  );
}
