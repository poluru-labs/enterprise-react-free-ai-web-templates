import { Alert, Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import overview from '../data/overview.json';
import runsData from '../data/runs.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { onLaunch } = useOutletContext();
  const live = runsData.items.filter((run) => run.status === 'Running');

  return (
    <div className="kiln-page">
      <PageHeader
        title="Foundry snapshot"
        description="Live jobs, GPU heat, and the coaching Kavya Poluru needs this hour."
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
            <Button size="sm" icon="plus" onClick={onLaunch}>
              Launch run
            </Button>
          </>
        }
      />

      <section className="kiln-hero">
        <div>
          <p className="kiln-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="kiln-hero-meta">
          <div>
            <span>Live runs</span>
            <strong>{formatNumber(overview.ticker.liveRuns)}</strong>
          </div>
          <div>
            <span>Queue wait</span>
            <strong>{overview.ticker.queueWaitMinutes}m</strong>
          </div>
          <div>
            <span>Val acc</span>
            <strong>{overview.ticker.valAccuracy}%</strong>
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
          <ChartSection title="Loss curve" subtitle="harbor-encoder-v3 · last 12 epochs">
            <AreaChart labels={overview.lossTrend.labels} series={overview.lossTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Cluster utilization" subtitle="Regional GPU heat this hour">
            <BarChart items={overview.clusterUtil} unit="%" />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {live.map((run) => (
          <div className="col-12 col-md-6 col-xl-4" key={run.id}>
            <Link className="kiln-run-card" to={`${BASE_PATH}/runs/${run.id}`}>
              <header>
                <h3>{run.name}</h3>
                <StatusBadge status={run.status} pulse />
              </header>
              <p>
                {run.owner} · {run.gpu} · {run.cluster}
              </p>
              <dl>
                <div>
                  <dt>Epoch</dt>
                  <dd>{run.epoch}</dd>
                </div>
                <div>
                  <dt>Val</dt>
                  <dd>{run.acc}</dd>
                </div>
                <div>
                  <dt>ETA</dt>
                  <dd>{run.eta}</dd>
                </div>
              </dl>
            </Link>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12">
          <section className="kiln-panel kiln-alert-panel">
            <header className="kiln-panel-header">
              <div>
                <h2>Alerts</h2>
                <p>H100 heat, OOM retries, and catalog drift.</p>
              </div>
            </header>
            <div className="kiln-alert-list">
              {overview.alerts.map((alert) => (
                <div key={alert.id} className="kiln-alert-item">
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
