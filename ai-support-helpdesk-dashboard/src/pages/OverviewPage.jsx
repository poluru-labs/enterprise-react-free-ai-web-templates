import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link, useNavigate } from 'react-router-dom';
import overview from '../data/overview.json';
import { allTickets, firstUnassigned } from '../lib/tickets.js';
import { BASE_PATH, BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { formatAge, formatDateTime } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  PriorityBadge,
  SlaBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function OverviewPage() {
  const navigate = useNavigate();
  const preview = allTickets()
    .filter((ticket) => ticket.status !== 'Resolved')
    .slice(0, 6);

  return (
    <div className="desk-page">
      <PageHeader
        title="Sunday desk"
        description={`${SIGNED_IN_USER.name} · 47 open · first response 18m · copilot deflection 41%.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Overview' }]}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`${BASE_PATH}/inbox`)}
            >
              Open inbox
            </Button>
            <Button
              size="sm"
              icon="arrow-right"
              onClick={() => {
                const ticket = firstUnassigned();
                if (!ticket) return;
                showToast({
                  title: 'Assigned to Meera Poluru',
                  description: ticket.id,
                  variant: 'success',
                });
                navigate(`${BASE_PATH}/tickets/${ticket.id}`);
              }}
            >
              Assign next
            </Button>
          </>
        }
      />

      <section className="desk-hero">
        <div>
          <p className="desk-kicker">{overview.hero.kicker}</p>
          <h2>{overview.hero.title}</h2>
          <p>{overview.hero.body}</p>
        </div>
        <div className="desk-hero-meta">
          {overview.slaCountdown.map((item) => (
            <div key={item.id}>
              <span>{item.label} clock</span>
              <strong>{item.remaining}</strong>
            </div>
          ))}
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
          <ChartSection title="Ticket volume" subtitle="Created vs resolved · 24–30 Aug 2026">
            <AreaChart labels={overview.volumeTrend.labels} series={overview.volumeTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Queue mix" subtitle="Working set by priority and AI hold">
            <DonutChart items={overview.queueMix} centerLabel="Open" centerValue={overview.openCount} />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {overview.queues.map((queue) => (
          <div className="col-12 col-sm-6 col-xl-3" key={queue.id}>
            <article className={`desk-queue-card tone-${queue.tone}`}>
              <header>
                <h3>{queue.label}</h3>
                <strong>{queue.count}</strong>
              </header>
              <p>{queue.hint}</p>
              <footer>
                <span>{queue.owner}</span>
                <Link className="desk-text-link" to={`${BASE_PATH}/inbox`}>
                  Open
                </Link>
              </footer>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection
            title="Live tickets"
            subtitle="Hottest items in the working set"
            action={
              <Link className="desk-text-link" to={`${BASE_PATH}/tickets`}>
                Full catalog
              </Link>
            }
          >
            <DataTable
              rows={preview}
              onRowClick={(row) => navigate(`${BASE_PATH}/tickets/${row.id}`)}
              rowClassName={(row) => (row.priority === 'P1' ? 'is-severe' : row.sla === 'at_risk' || row.sla === 'risk' ? 'is-attention' : '')}
              columns={[
                {
                  key: 'id',
                  label: 'Ticket',
                  render: (_, row) => (
                    <div>
                      <strong className="desk-mono">{row.id}</strong>
                      <div className="desk-subtle">{row.subject}</div>
                    </div>
                  ),
                },
                { key: 'customer', label: 'Customer' },
                {
                  key: 'priority',
                  label: 'Priority',
                  render: (value) => <PriorityBadge priority={value} />,
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'assignee', label: 'Assignee' },
                {
                  key: 'sla',
                  label: 'SLA',
                  render: (value, row) => (
                    <div>
                      <SlaBadge sla={value} />
                      <div className="desk-subtle">{row.slaLeft}</div>
                    </div>
                  ),
                },
                {
                  key: 'updatedAt',
                  label: 'Updated',
                  render: (value, row) => (
                    <div>
                      {formatDateTime(value)}
                      <div className="desk-subtle">{formatAge(row.ageMinutes)} old</div>
                    </div>
                  ),
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
