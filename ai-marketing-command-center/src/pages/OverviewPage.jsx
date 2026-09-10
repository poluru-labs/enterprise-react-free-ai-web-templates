import { Alert, Button, ProgressBar, Stat, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import campaigns from '../data/campaigns.json';
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
import { formatCurrency, formatPercent } from '../lib/format.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const attention = campaigns.filter((item) => item.status === 'Watch' || item.status === 'Paused');

  return (
    <div className="mq-page">
      <PageHeader
        title="Command snapshot"
        description="Poluru Growth · Subbu Poluru · campaigns, audiences, content, and journeys on one desk."
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
              icon="megaphone"
              onClick={() => navigate(`${BASE_PATH}/campaigns?launch=1`)}
            >
              Launch
            </Button>
          </>
        }
      />

      <section className="mq-hero">
        <div>
          <p className="mq-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="mq-hero-meta">
          <div>
            <span>ROAS</span>
            <strong>{overview.ticker.roas}</strong>
          </div>
          <div>
            <span>Spend</span>
            <strong>{overview.ticker.spend}</strong>
          </div>
          <div>
            <span>Live</span>
            <strong>{overview.ticker.live}</strong>
          </div>
        </div>
      </section>

      <div className="mq-stage-strip">
        {overview.stages.map((stage) => (
          <div className="mq-stage-chip" key={stage.id}>
            <span>{stage.label}</span>
            <strong>{stage.count}</strong>
            <span className="mq-subtle">{stage.hint}</span>
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
          <ChartSection title="Spend" subtitle="Paid vs email · last 7 days · thousands">
            <AreaChart labels={overview.spendTrend.labels} series={overview.spendTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Channel mix" subtitle="Attributed pipeline share">
            <DonutChart
              items={overview.channelShare}
              centerLabel="Share"
              centerValue="100%"
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Live flights"
            subtitle="Owner, spend, and ROAS"
            action={
              <Link className="mq-text-link" to={`${BASE_PATH}/campaigns`}>
                Open campaigns
              </Link>
            }
          >
            <DataTable
              rows={campaigns.filter((item) => item.status === 'Live' || item.status === 'Watch')}
              onRowClick={(row) => navigate(`${BASE_PATH}/campaigns/${row.id}`)}
              rowClassName={(row) => (row.status === 'Watch' ? 'is-attention' : '')}
              columns={[
                {
                  key: 'name',
                  label: 'Campaign',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="mq-subtle">{row.channel} · {row.audience}</div>
                    </div>
                  ),
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                {
                  key: 'roas',
                  label: 'ROAS',
                  render: (value) => (
                    <div className="mq-progress-cell">
                      <ProgressBar value={Math.min(value * 12, 100)} max={100} />
                      <span>{value}x</span>
                    </div>
                  ),
                },
                {
                  key: 'spend',
                  label: 'Spend',
                  render: (value) => formatCurrency(value),
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection
            title="Needs a look"
            subtitle="Paused and watch flights"
            action={
              <Link className="mq-text-link" to={`${BASE_PATH}/campaigns`}>
                View all
              </Link>
            }
          >
            <div className="mq-stack mb-3">
              <Stat label="On watch" value={attention.length} hint="Legal hold or CPC spike" trend="down" trendValue="−1" />
            </div>
            <DataTable
              rows={attention.map((row) => ({ id: row.id, title: row.name, status: row.status, owner: row.owner }))}
              onRowClick={(row) => navigate(`${BASE_PATH}/campaigns/${row.id}`)}
              columns={[
                { key: 'title', label: 'Flight' },
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

      <section className="mq-panel">
        <header className="mq-panel-header">
          <div>
            <h2>Alerts</h2>
            <p>Holds, CPC spikes, and journey health. CTR floor {formatPercent(3.5, 1)}.</p>
          </div>
        </header>
        <div className="mq-alert-list">
          {overview.alerts.map((alert) => (
            <div key={alert.id} className="mq-alert-item">
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
