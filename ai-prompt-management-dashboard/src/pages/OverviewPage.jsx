import { Alert, Button, ProgressBar, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import prompts from '../data/prompts.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { BarChart } from '../components/charts/BarChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { formatPercent } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const livePrompts = prompts.items.filter((item) => item.status === 'Live');

  return (
    <div className="pmt-page">
      <PageHeader
        title="Library health"
        description="FY26 Q3 · Sravani Poluru · 128 live prompts across eight families."
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
              icon="plus"
              onClick={() => navigate(`${BASE_PATH}/library?create=1`)}
            >
              New prompt
            </Button>
          </>
        }
      />

      <section className="pmt-hero">
        <div>
          <p className="pmt-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="pmt-hero-meta">
          <div>
            <span>Live</span>
            <strong>{overview.ticker.live}</strong>
          </div>
          <div>
            <span>Eval pass</span>
            <strong>{overview.ticker.evalPass}</strong>
          </div>
          <div>
            <span>p95</span>
            <strong>{overview.ticker.p95}</strong>
          </div>
        </div>
      </section>

      <div className="row g-3 mb-3">
        {overview.kpis.map((kpi) => (
          <div className="col-12 col-sm-6 col-xl-4 col-xxl-2" key={kpi.id}>
            <StatCard
              className="h-100"
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
          <ChartSection title="Playground volume" subtitle="Runs and failed evals · 24–30 Aug 2026">
            <AreaChart labels={overview.volumeTrend.labels} series={overview.volumeTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Prompt health" subtitle="Live, review, canary, and failed packs">
            <DonutChart items={overview.health} centerLabel="Catalog" centerValue="128" />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Live prompts"
            subtitle="Highest-scoring production packs"
            action={
              <Link className="pmt-text-link" to={`${BASE_PATH}/library`}>
                Open library
              </Link>
            }
          >
            <DataTable
              rows={livePrompts}
              onRowClick={(row) => navigate(`${BASE_PATH}/library/${row.id}`)}
              columns={[
                {
                  key: 'name',
                  label: 'Prompt',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="pmt-subtle">{row.family} · {row.owner}</div>
                    </div>
                  ),
                },
                { key: 'version', label: 'Version' },
                {
                  key: 'score',
                  label: 'Score',
                  render: (value) => formatPercent(value),
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} pulse={value === 'Live'} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Editor load" subtitle="Open drafts and reviews per owner">
            <BarChart
              items={overview.owners.map((person) => ({
                name: person.name,
                value: person.load,
                color: '#162E93',
              }))}
              unit="%"
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="Release SLA" subtitle="Publish, eval, and review freshness">
            {overview.sla.map((item) => (
              <div key={item.label} className="pmt-score-row">
                <strong>{item.label}</strong>
                <ProgressBar value={item.value} max={100} />
                <span>{item.value}%</span>
              </div>
            ))}
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <section className="pmt-panel h-100">
            <header className="pmt-panel-header">
              <div>
                <h2>Desk alerts</h2>
                <p>Review holds, failed evals, and canaries.</p>
              </div>
            </header>
            <div className="pmt-alert-list">
              {overview.alerts.map((alert) => (
                <div key={alert.id} className="pmt-alert-item">
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
