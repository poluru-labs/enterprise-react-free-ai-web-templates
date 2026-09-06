import { Alert, Button, ProgressBar, Stat, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import inventory from '../data/inventory.json';
import approvals from '../data/approvals.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
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
  const openApprovals = approvals.filter((item) => item.status === 'Pending' || item.status === 'In review');

  return (
    <div className="gov-page">
      <PageHeader
        title="Governance snapshot"
        description="FY26 Q3 · Kavya Poluru · six registered systems, four open approvals."
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
              onClick={() => showToast({ title: 'Register refreshed', variant: 'info' })}
            >
              Sync now
            </Button>
          </>
        }
      />

      <section className="gov-hero">
        <div>
          <p className="gov-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="gov-hero-meta">
          <div>
            <span>Pending</span>
            <strong>{overview.ticker.pending}</strong>
          </div>
          <div>
            <span>High risk</span>
            <strong>{overview.ticker.highRisk}</strong>
          </div>
          <div>
            <span>Coverage</span>
            <strong>{overview.ticker.coverage}</strong>
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
          <ChartSection title="Review volume" subtitle="Closed reviews and new requests · 7 days">
            <AreaChart labels={overview.reviewTrend.labels} series={overview.reviewTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Risk mix" subtitle="Registered systems by residual risk">
            <DonutChart
              items={overview.riskShare}
              centerLabel="Systems"
              centerValue={overview.ticker.models}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Model inventory"
            subtitle="Owner, residual risk, and control coverage"
            action={
              <Link className="gov-text-link" to={`${BASE_PATH}/inventory`}>
                Open inventory
              </Link>
            }
          >
            <DataTable
              rows={inventory}
              onRowClick={(row) => navigate(`${BASE_PATH}/inventory/${row.id}`)}
              columns={[
                {
                  key: 'name',
                  label: 'System',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="gov-subtle">{row.useCase} · {row.owner}</div>
                    </div>
                  ),
                },
                {
                  key: 'risk',
                  label: 'Risk',
                  render: (value) => <SeverityBadge severity={value} />,
                },
                {
                  key: 'coverage',
                  label: 'Coverage',
                  render: (value) => (
                    <div className="gov-progress-cell">
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
            title="Open approvals"
            subtitle="Waiting on Kavya Poluru or a delegate"
            action={
              <Link className="gov-text-link" to={`${BASE_PATH}/approvals`}>
                View all
              </Link>
            }
          >
            <div className="gov-stack mb-3">
              <Stat label="In flight" value={openApprovals.length} hint="SLA 3 business days" trend="down" trendValue="-2" />
            </div>
            <DataTable
              rows={openApprovals}
              onRowClick={() => navigate(`${BASE_PATH}/approvals`)}
              columns={[
                { key: 'title', label: 'Request' },
                {
                  key: 'status',
                  label: 'State',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'requester', label: 'Owner' },
              ]}
            />
          </ChartSection>
        </div>
      </div>

      <section className="gov-panel">
        <header className="gov-panel-header">
          <div>
            <h2>Alerts</h2>
            <p>Evidence, policy publishes, and expiring exceptions.</p>
          </div>
        </header>
        <div className="gov-alert-list">
          {overview.alerts.map((alert) => (
            <div key={alert.id} className="gov-alert-item">
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
