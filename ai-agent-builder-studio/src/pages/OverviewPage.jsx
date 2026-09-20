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
    <div className="abs-page">
      <PageHeader
        title="Build tools, workflows, memory, tests, and deployments."
        description="A clean studio for shipping agent systems with a shared registry and release path."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/studio/tests')}>
              Open tests
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Project started', variant: 'success' });
                navigate('/studio/tools');
              }}
            >
              New project
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="Studio 2.4"
        message="TTL policies for memory stores and canary deploys are available today. Owner: Avery Poluru."
      />

      <section className="abs-hero">
        <div>
          <Badge label="Workspace" variant="brand" soft pill />
          <h2>Agent Builder Studio</h2>
          <p>
            Design the contract, wire the flow, store only what you need, prove it with evals, then
            ship. One workspace, one release trail.
          </p>
          <div className="abs-hero-actions">
            <Button onClick={() => navigate('/studio/workflows')}>Open workflows</Button>
            <Button variant="secondary" onClick={() => navigate('/studio/deployments')}>
              View deploys
            </Button>
          </div>
        </div>
        <div className="abs-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="abs-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
          value="today"
        />
      </div>

      <div className="abs-stat-grid">
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

      <div className="abs-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="abs-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="abs-panel">
        <h2>From contract to release</h2>
        <Stepper
          steps={[
            { label: 'Tools', description: 'Define the contract' },
            { label: 'Workflows', description: 'Compose the path' },
            { label: 'Memory', description: 'Scope the store' },
            { label: 'Tests', description: 'Gate the change' },
            { label: 'Deploy', description: 'Ship the build' },
          ]}
          current={3}
          onStepClick={(index) => {
            const routes = ['/studio/tools', '/studio/workflows', '/studio/memory', '/studio/tests', '/studio/deployments'];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="abs-split">
        <section className="abs-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="abs-copy">
                Memory TTL is in review with Elena Poluru. Search 2.4.1 is on canary under Priya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="abs-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="abs-person">
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
        <section className="abs-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
