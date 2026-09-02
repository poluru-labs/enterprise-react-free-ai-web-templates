import { Alert, Button, ProgressBar, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import {
  ChartSection,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="nx-page">
      <PageHeader
        title="Control plane"
        description="FY26 Q3 · Lakshmi Poluru · $184.2K MRR across 42 live tenants."
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

      <section className="nx-hero">
        <div>
          <p className="nx-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="nx-hero-meta">
          <div>
            <span>MRR</span>
            <strong>{overview.ribbon.mrr}</strong>
          </div>
          <div>
            <span>Churn</span>
            <strong>{overview.ribbon.churn}</strong>
          </div>
          <div>
            <span>Failed</span>
            <strong>{overview.ribbon.failedInvoices}</strong>
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
          <ChartSection title="Recognized revenue" subtitle="MRR vs failed invoices · 24–30 Aug 2026">
            <AreaChart labels={overview.revenueTrend.labels} series={overview.revenueTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Plan mix" subtitle="Live tenants by contract">
            <DonutChart items={overview.planMix} centerLabel="Tenants" centerValue="42" />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {overview.tenantHealth.map((tenant) => (
          <div className="col-12 col-md-6 col-xl-4" key={tenant.id}>
            <article
              className="nx-health-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${BASE_PATH}/tenants/${tenant.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') navigate(`${BASE_PATH}/tenants/${tenant.id}`);
              }}
            >
              <header>
                <div>
                  <h3>{tenant.name}</h3>
                  <span className="nx-subtle">{tenant.plan} · {tenant.owner}</span>
                </div>
                <StatusBadge status={tenant.status} />
              </header>
              <div className="nx-policy-metric">
                <strong>{tenant.health}</strong>
                <span>health score</span>
              </div>
              <ProgressBar value={tenant.health} max={100} />
              <p className="nx-policy-note">{tenant.note}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Recent activity"
            subtitle="Invites, invoices, and flag rollouts"
            action={
              <Link className="nx-text-link" to={`${BASE_PATH}/audit`}>
                Open audit
              </Link>
            }
          >
            <ul className="nx-note-list">
              {overview.activity.map((item) => (
                <li key={item.title}>
                  <i className="bi bi-dot" />
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mb-0">{item.description}</p>
                    <span className="nx-subtle">{item.timestamp}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <section className="nx-panel">
            <header className="nx-panel-header">
              <div>
                <h2>Watch list</h2>
                <p>Trials, dunning, and a restore from this morning.</p>
              </div>
            </header>
            <div className="nx-alert-list">
              <div className="nx-alert-item">
                <Alert
                  variant="warning"
                  title="Cascade Retail is past due"
                  message="INV-2841 failed twice. Meera Poluru is on dunning day 5."
                />
                <Button variant="tertiary" size="sm" iconTrailing="chevron-right" onClick={() => navigate(`${BASE_PATH}/billing`)}>
                  Open billing
                </Button>
              </div>
              <div className="nx-alert-item">
                <Alert
                  variant="info"
                  title="Atlas Health trial ends 4 Sep"
                  message="Harini Poluru has 22 of 80 seats filled. Convert before the lock."
                />
                <Button variant="tertiary" size="sm" iconTrailing="chevron-right" onClick={() => navigate(`${BASE_PATH}/tenants/atlas-health`)}>
                  Open tenant
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
