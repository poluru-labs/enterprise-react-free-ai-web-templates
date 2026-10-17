import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  SegmentedControl,
  Stat,
  Stepper,
  Tabs,
  Tab,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import overview from '../data/overview.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="knb-page">
      <PageHeader
        title="Manage articles, sources, citations, freshness, and knowledge gaps."
        description="A light knowledge desk with named owners on every article and every source."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/kb/gaps')}>
              Open gaps
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Draft created', variant: 'success' });
                navigate('/kb/articles');
              }}
            >
              New article
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="KnowPulse 3.1"
        message="Inline citations and stale radar are live. Gap triage pages Elena Poluru daily at 08:00."
      />

      <section className="knb-hero">
        <div>
          <Badge label="Org" variant="brand" soft pill />
          <h2>Knowledge base</h2>
          <p>
            Publish articles, connect sources, prove citations, keep content fresh, and close gaps
            before customers hit dead ends.
          </p>
          <div className="knb-hero-actions">
            <Button onClick={() => navigate('/kb/articles')}>Browse articles</Button>
            <Button variant="secondary" onClick={() => navigate('/kb/freshness')}>
              View freshness
            </Button>
          </div>
        </div>
        <div className="knb-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="knb-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: 'Week', value: 'week' },
            { label: 'Quarter', value: 'quarter' },
          ]}
          value="week"
        />
      </div>

      <div className="knb-stat-grid">
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

      <div className="knb-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="knb-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="knb-panel">
        <h2>From source to answer</h2>
        <Stepper
          steps={[
            { label: 'Source', description: 'Connect feed' },
            { label: 'Article', description: 'Draft & review' },
            { label: 'Cite', description: 'Link origin' },
            { label: 'Fresh', description: 'Review date' },
            { label: 'Close gap', description: 'Ship topic' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/kb/sources',
              '/kb/articles',
              '/kb/citations',
              '/kb/freshness',
              '/kb/gaps',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="knb-split">
        <section className="knb-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="knb-copy">
                Billing proration gap still open — Elena Poluru drafting with Marcus Poluru. Broken
                API rate-limit cite fixed by Sofia Poluru; Jonah Poluru queued macro refresh.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="knb-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="knb-person">
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
        <section className="knb-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
