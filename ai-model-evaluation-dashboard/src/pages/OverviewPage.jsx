import { Alert, Button, Skeleton, Timeline, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import overview from '../data/overview.json';
import runsData from '../data/runs.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { ChartSection, DataTable, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';
import { useState } from 'react';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { onRun } = useOutletContext();
  const [refreshing, setRefreshing] = useState(false);
  const live = runsData.runs.filter((item) => item.status === 'Running' || item.status === 'Needs review' || item.status === 'Queued');
  const suiteTotal = overview.suiteMix.reduce((sum, item) => sum + item.value, 0);

  function refresh() {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 420);
    showToast({ title: 'Scores refreshed', variant: 'info' });
  }

  return (
    <div className="prism-page">
      <PageHeader
        title="Eval snapshot"
        description="FY26 Q3 · Meera Poluru · pass rate, open reviews, and the jobs still scoring."
        crumbs={[BREADCRUMB_ROOT, { label: 'Overview' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" icon="refresh" onClick={refresh}>
              Refresh
            </Button>
            <Button size="sm" icon="plus" onClick={onRun}>
              Run evaluation
            </Button>
          </>
        }
      />

      <section className="prism-hero">
        <div>
          <p className="prism-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="prism-hero-meta">
          <div>
            <span>Pass rate</span>
            <strong>{overview.ticker.passRate}%</strong>
          </div>
          <div>
            <span>Mean score</span>
            <strong>{overview.ticker.meanScore}</strong>
          </div>
          <div>
            <span>Open reviews</span>
            <strong>{overview.ticker.openReviews}</strong>
          </div>
        </div>
      </section>

      <Alert
        variant="warning"
        title="Lens Extractor is on watch"
        message="Invoice field accuracy is 87.4%. Madhav Poluru opened a review; hold new invoice traffic until PO recall recovers."
      />

      <div className="row g-3 mb-3 mt-1">
        {refreshing
          ? overview.kpis.map((kpi) => (
              <div className="col-12 col-sm-6 col-xl-4 col-xxl-2" key={kpi.id}>
                <article className="prism-stat-card">
                  <Skeleton lines={3} />
                </article>
              </div>
            ))
          : overview.kpis.map((kpi) => (
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
          <ChartSection title="Quality index" subtitle="Weighted score · last 12 eval windows">
            <AreaChart labels={overview.scoreTrend.labels} series={overview.scoreTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Suite mix" subtitle="Live, watch, and draft packs">
            <DonutChart items={overview.suiteMix} centerLabel="Suites" centerValue={suiteTotal} />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Live runs"
            subtitle="Jobs still scoring or waiting on a judge"
            action={
              <Link className="prism-text-link" to={`${BASE_PATH}/runs`}>
                Open runs
              </Link>
            }
          >
            <DataTable
              rows={live}
              onRowClick={(row) => navigate(`${BASE_PATH}/runs/${row.id}`)}
              columns={[
                { key: 'name', label: 'Run', className: 'prism-mono' },
                { key: 'suite', label: 'Suite' },
                { key: 'owner', label: 'Owner' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} pulse={value === 'Running'} />,
                },
                { key: 'score', label: 'Score', render: (value) => `${value}` },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <section className="prism-panel prism-alert-panel">
            <header className="prism-panel-header">
              <div>
                <h2>Alerts</h2>
                <p>Watch items and judges still waiting.</p>
              </div>
            </header>
            <div className="prism-alert-list">
              {overview.alerts.map((alert) => (
                <div key={alert.id} className="prism-alert-item">
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

      <ChartSection title="Motion" subtitle="What Meera Poluru’s workspace did today">
        <Timeline items={overview.timeline} />
      </ChartSection>
    </div>
  );
}
