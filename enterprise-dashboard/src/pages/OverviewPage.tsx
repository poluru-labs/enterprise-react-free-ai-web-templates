import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  Meter,
  ProgressBar,
  Tag,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { activityTimeline, facilities, overviewStats, regionalHealth, tickets, useAlerts } from '../data';
import { ChartSection } from '../components/widgets/ChartSection';
import { PageHeader } from '../components/widgets/PageHeader';
import { StatCard } from '../components/widgets/StatCard';
import { StatusBadge } from '../components/widgets/StatusBadge';
import './pages.scss';

export function OverviewPage() {
  const navigate = useNavigate();
  const alerts = useAlerts();
  const openAlerts = alerts.filter((item) => !item.acknowledged).slice(0, 4);

  return (
    <div className="page">
      <PageHeader
        title="Fleet overview"
        description="Live capacity, power, and incident signals across US data centers."
        crumbs={[BREADCRUMB_ROOT, { label: 'Overview' }]}
        actions={
          <div className="quick-actions">
            <Button variant="primary" size="sm" onClick={() => navigate('/power')}>
              Power & cooling
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/capacity')}>
              Capacity plan
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/maintenance')}>
              Maintenance
            </Button>
            <Button variant="tertiary" size="sm" onClick={() => navigate('/tickets')}>
              Open tickets
            </Button>
          </div>
        }
      />

      <Alert
        variant="info"
        title="Fleet healthy"
        message="11 of 12 facilities reporting normal telemetry. Dallas DFW-1 has elevated cooling load."
        dismissible
      />

      <section className="stat-grid stagger" aria-label="Key metrics">
        {overviewStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            trendValue={stat.trendValue}
            hint={stat.hint}
            tone={stat.tone}
            sparkline={stat.sparkline}
          />
        ))}
      </section>

      <section className="card-grid stagger" aria-label="Regional health">
        {regionalHealth.map((region) => (
          <Card key={region.region} elevated padded>
            <div className="region-card">
              <div className="region-card__head">
                <h2>{region.region}</h2>
                <StatusBadge status={region.status} pulse={region.status === 'degraded'} />
              </div>
              <p className="muted">
                {region.sites} site{region.sites === 1 ? '' : 's'}
              </p>
              <ProgressBar label="Utilization" value={region.utilization} showValue />
              <span className="muted">{region.note}</span>
            </div>
          </Card>
        ))}
      </section>

      <div className="split-grid">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Facility capacity</h2>
              <Badge label="Live" variant="brand" soft pill />
            </div>
          }
        >
          <ul className="facility-list stagger">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <button type="button" className="facility-list__btn" onClick={() => navigate(`/facilities/${facility.id}`)}>
                  <div className="facility-list__top">
                    <div>
                      <strong>{facility.name}</strong>
                      <span className="muted">{facility.region}</span>
                    </div>
                    <StatusBadge status={facility.status} pulse={facility.status === 'degraded'} />
                  </div>
                  <ProgressBar label="Rack utilization" value={facility.utilization} showValue />
                  <Meter
                    label="Power headroom"
                    value={100 - Math.round(facility.utilization * 0.85)}
                    high={70}
                    low={30}
                    optimum={80}
                    showValue
                  />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="stack-col">
          <ChartSection
            title="Recent alerts"
            action={
              <Button variant="tertiary" size="sm" onClick={() => navigate('/alerts')}>
                View all
              </Button>
            }
          >
            <ul className="alert-feed stagger">
              {openAlerts.map((item) => (
                <li key={item.id}>
                  <Tag
                    label={item.severity}
                    variant={
                      item.severity === 'critical' ? 'danger' : item.severity === 'warning' ? 'warning' : 'info'
                    }
                  />
                  <div>
                    <strong>{item.title}</strong>
                    <span className="muted">
                      {item.facility} · {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>

          <Card
            elevated
            padded
            header={
              <div className="card-heading">
                <h2>Ops activity</h2>
              </div>
            }
          >
            <Timeline items={activityTimeline} />
          </Card>
        </div>
      </div>

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Active tickets</h2>
            <Button variant="tertiary" size="sm" onClick={() => navigate('/tickets')}>
              Manage
            </Button>
          </div>
        }
      >
        <ul className="ticket-preview stagger">
          {tickets.slice(0, 4).map((ticket) => (
            <li key={ticket.id}>
              <div>
                <strong>
                  {ticket.id} · {ticket.subject}
                </strong>
                <span className="muted">
                  {ticket.facility} · {ticket.assignee}
                </span>
              </div>
              <Tag
                label={ticket.priority}
                variant={ticket.priority === 'P1' ? 'danger' : ticket.priority === 'P2' ? 'warning' : 'info'}
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
