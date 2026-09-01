import { Alert, Button, ProgressBar, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import models from '../data/models.json';
import incidents from '../data/incidents.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import costs from '../data/costs.json';
import {
  ChartSection,
  DataTable,
  PageHeader,
  SeverityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="llm-page">
      <PageHeader
        title="Ops snapshot"
        description="FY26 Q3 · Subrahmanyam Poluru · 111.2K requests across six serving stacks."
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
              onClick={() => showToast({ title: 'Metrics refreshed', variant: 'info' })}
            >
              Sync now
            </Button>
          </>
        }
      />

      <section className="llm-hero">
        <div>
          <p className="llm-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="llm-hero-meta">
          <div>
            <span>p95</span>
            <strong>{overview.ticker.p95}</strong>
          </div>
          <div>
            <span>Errors</span>
            <strong>{overview.ticker.errors}</strong>
          </div>
          <div>
            <span>Spend</span>
            <strong>{overview.ticker.spend}</strong>
          </div>
        </div>
      </section>

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
          <ChartSection title="Request volume" subtitle="Inbound calls and errors · 7 days">
            <AreaChart labels={overview.requestTrend.labels} series={overview.requestTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Spend share" subtitle="Token cost by model this period">
            <DonutChart
              items={costs.share.map((item) => ({ name: item.name, value: item.value, color: item.color }))}
              centerLabel="USD"
              centerValue={`$${costs.periodSpend.toLocaleString('en-US')}`}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Model health"
            subtitle="Latency, success, and serving state"
            action={
              <Link className="llm-text-link" to={`${BASE_PATH}/models`}>
                Open registry
              </Link>
            }
          >
            <DataTable
              rows={models}
              onRowClick={(row) => navigate(`${BASE_PATH}/models/${row.id}`)}
              columns={[
                {
                  key: 'name',
                  label: 'Model',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="llm-subtle">{row.provider} · {row.owner}</div>
                    </div>
                  ),
                },
                { key: 'calls', label: 'Requests' },
                { key: 'latency', label: 'Latency' },
                {
                  key: 'success',
                  label: 'Success',
                  render: (value) => (
                    <div className="llm-progress-cell">
                      <ProgressBar value={value} max={100} />
                      <span>{value}%</span>
                    </div>
                  ),
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection
            title="Incidents"
            subtitle="Watch pages still open"
            action={
              <Link className="llm-text-link" to={`${BASE_PATH}/incidents`}>
                View all
              </Link>
            }
          >
            <DataTable
              rows={incidents.slice(0, 4)}
              onRowClick={() => navigate(`${BASE_PATH}/incidents`)}
              columns={[
                { key: 'title', label: 'Incident' },
                {
                  key: 'severity',
                  label: 'State',
                  render: (value) => <SeverityBadge severity={value} />,
                },
                { key: 'owner', label: 'Owner' },
              ]}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <section className="llm-panel">
            <header className="llm-panel-header">
              <div>
                <h2>Alerts</h2>
                <p>Watch pages, budget, and eval sign-off.</p>
              </div>
            </header>
            <div className="llm-alert-list">
              {overview.alerts.map((alert) => (
                <div key={alert.id} className="llm-alert-item">
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
