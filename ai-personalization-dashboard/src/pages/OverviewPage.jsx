import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  ProgressBar,
  SegmentedControl,
  Stat,
  Stepper,
  Tabs,
  Tab,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="per-page">
      <PageHeader
        title="AI Personalization Dashboard"
        description="Manage user segments, journeys, recommendations, and retention. Desk owned by Avery Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              icon="download"
              onClick={() => showToast({ title: 'Report queued', variant: 'success' })}
            >
              Export report
            </Button>
            <Button size="sm" icon="users" onClick={() => navigate(`${BASE_PATH}/segments`)}>
              Open segments
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="PersonaDesk 3.0"
        message="Journey simulator and churn radar are live. Rahul Poluru owns journey publish Friday."
      />

      <section className="per-hero">
        <div>
          <Badge label="Poluru Product" variant="brand" soft pill />
          <h2>Personalization control</h2>
          <p>
            Segment users, orchestrate journeys, rank recommendations, and track retention—all on
            one light desk with named owners on every rule and surface.
          </p>
          <div className="per-hero-actions">
            <Button onClick={() => navigate(`${BASE_PATH}/journeys`)}>View journeys</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/retention`)}>
              Retention cohorts
            </Button>
          </div>
        </div>
        <div className="per-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="per-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'This week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Quarter', value: 'quarter' },
          ]}
          value="week"
        />
      </div>

      <div className="per-stat-grid">
        {overview.kpis.map((kpi) => (
          <Stat
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            trendValue={kpi.trendValue}
          />
        ))}
      </div>

      <div className="per-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="per-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="per-panel">
        <h2>From segment to retain</h2>
        <Stepper
          steps={[
            { label: 'Segments', description: 'Rules & lift' },
            { label: 'Journeys', description: 'Triggers' },
            { label: 'Recommendations', description: 'Slots' },
            { label: 'Retention', description: 'Cohorts' },
            { label: 'Publish', description: 'Go live' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/segments`,
              `${BASE_PATH}/journeys`,
              `${BASE_PATH}/recommendations`,
              `${BASE_PATH}/retention`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="per-split">
        <section className="per-panel">
          <h2>Surface mix</h2>
          <div className="per-meter-list">
            {overview.surfaces.map((row) => (
              <div key={row.label} className="per-meter-row">
                <div className="per-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="per-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="per-copy">
                Win-back journey is in watch—Priya Poluru is tuning exit rules. Renewal nudge paused
                until Marcus Poluru confirms contract field sync.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="per-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="per-person">
                    <Avatar name={person.name} size="sm" />
                    <div>
                      <strong>{person.name}</strong>
                      <span>{person.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </section>
      </div>

      <section className="per-panel">
        <h2>Release trail</h2>
        <Timeline items={overview.releases} />
      </section>
    </div>
  );
}
