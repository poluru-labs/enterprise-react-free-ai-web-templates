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
    <div className="mid-page">
      <PageHeader
        title="AI Marketing Intelligence Dashboard"
        description="Analyze campaigns, audiences, attribution, and generated content. Desk owned by Avery Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              icon="download"
              onClick={() => showToast({ title: 'Digest queued', variant: 'success' })}
            >
              Export digest
            </Button>
            <Button
              size="sm"
              icon="megaphone"
              onClick={() => navigate(`${BASE_PATH}/campaigns`)}
            >
              Open campaigns
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="MarkSight 2.4"
        message="Multi-touch compare and variant scoring are live. Rahul Poluru owns attribution cutover Friday."
      />

      <section className="mid-hero">
        <div>
          <Badge label="Poluru Growth" variant="brand" soft pill />
          <h2>Marketing intelligence</h2>
          <p>
            Track campaign performance, segment health, credit models, and content variants on one
            light desk—no clutter, just named owners on every metric.
          </p>
          <div className="mid-hero-actions">
            <Button onClick={() => navigate(`${BASE_PATH}/attribution`)}>View attribution</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/content`)}>
              Review content
            </Button>
          </div>
        </div>
        <div className="mid-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="mid-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'This week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Quarter', value: 'quarter' },
          ]}
          value="week"
        />
      </div>

      <div className="mid-stat-grid">
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

      <div className="mid-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="mid-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="mid-panel">
        <h2>From click to credit</h2>
        <Stepper
          steps={[
            { label: 'Campaigns', description: 'Spend & ROAS' },
            { label: 'Audiences', description: 'Segments & lift' },
            { label: 'Attribution', description: 'Credit rules' },
            { label: 'Content', description: 'Variants' },
            { label: 'Publish', description: 'Launch lock' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/campaigns`,
              `${BASE_PATH}/audiences`,
              `${BASE_PATH}/attribution`,
              `${BASE_PATH}/content`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="mid-split">
        <section className="mid-panel">
          <h2>Channel mix</h2>
          <div className="mid-channel-list">
            {overview.channels.map((row) => (
              <div key={row.label} className="mid-channel-row">
                <div className="mid-channel-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="mid-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="mid-copy">
                Brand flight is in watch—Elena Poluru is shifting budget to retargeting. Webinar
                invite paused until Kavya Poluru refreshes the finance segment.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="mid-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="mid-person">
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

      <section className="mid-panel">
        <h2>Release trail</h2>
        <Timeline items={overview.releases} />
      </section>
    </div>
  );
}
