import { Alert, Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { ChartSection, DataTable, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const mixTotal = overview.sourceMix.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rag-page">
      <PageHeader
        title="Overview"
        description="Indexed documents, query volume, and the sources that still need a recrawl."
        crumbs={[BREADCRUMB_ROOT, { label: 'Overview' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" icon="download" onClick={() => showToast({ title: 'Snapshot queued', variant: 'success' })}>
              Export
            </Button>
            <Button size="sm" icon="refresh" onClick={() => showToast({ title: 'Index refreshed', variant: 'info' })}>
              Sync now
            </Button>
          </>
        }
      />

      <section className="rag-hero">
        <div>
          <p className="rag-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <Link className="rag-hero-action" to={`${BASE_PATH}/search`}>
          Test a query <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </Link>
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
          <ChartSection title="Query volume" subtitle="Queries, cited answers, and fallback · 7 days">
            <AreaChart labels={overview.queryVolume.labels} series={overview.queryVolume.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Source mix" subtitle="Drive, Notion, and direct uploads">
            <DonutChart items={overview.sourceMix} centerLabel="Docs" centerValue={formatNumber(mixTotal)} />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {overview.retrievalHealth.map((source) => (
          <div className="col-12 col-md-4" key={source.id}>
            <article className="rag-content-card">
              <header>
                <h3>{source.name}</h3>
                <StatusBadge status={source.status} />
              </header>
              <p className="rag-content-metric">
                <strong>{source.detail}</strong>
                <span>in the live index</span>
              </p>
              <p className="rag-content-note">{source.note}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Recent activity"
            subtitle="Changes made across your workspace"
            action={
              <Link className="rag-text-link" to={`${BASE_PATH}/conversations`}>
                View all
              </Link>
            }
          >
            <DataTable
              rows={overview.activity}
              columns={[
                { key: 'name', label: 'Person' },
                { key: 'action', label: 'Action' },
                { key: 'item', label: 'Item' },
                { key: 'time', label: 'When' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <section className="rag-panel">
            <header className="rag-panel-header">
              <div>
                <h2>Retrieval alerts</h2>
                <p>Stale sources, indexing, and eval health.</p>
              </div>
            </header>
            <div className="rag-alert-list">
              {overview.alerts.map((alert) => (
                <div key={alert.id} className="rag-alert-item">
                  <Alert variant={alert.variant} title={alert.title} message={alert.message} />
                  <Button variant="tertiary" size="sm" iconTrailing="chevron-right" onClick={() => navigate(alert.href)}>
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
