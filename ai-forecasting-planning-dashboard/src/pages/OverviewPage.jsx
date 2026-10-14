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
    <div className="fpl-page">
      <PageHeader
        title="Manage predictions, scenarios, confidence levels, and accuracy."
        description="A light planning desk with named owners on every horizon and every scenario."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/forecast/scenarios')}>
              Open scenarios
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Scenario drafted', variant: 'success' });
                navigate('/forecast/scenarios');
              }}
            >
              New scenario
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="PlanPulse 3.1"
        message="Rolling backtest and P80 defaults are live. S&OP publish lock opens Friday under Sofia Poluru."
      />

      <section className="fpl-hero">
        <div>
          <Badge label="Org" variant="brand" soft pill />
          <h2>Forecasting & planning</h2>
          <p>
            Generate predictions, stress scenarios, set confidence bands, and track accuracy before
            you publish to ERP and S&OP.
          </p>
          <div className="fpl-hero-actions">
            <Button onClick={() => navigate('/forecast/predictions')}>Open predictions</Button>
            <Button variant="secondary" onClick={() => navigate('/forecast/accuracy')}>
              View accuracy
            </Button>
          </div>
        </div>
        <div className="fpl-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="fpl-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'This week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Quarter', value: 'quarter' },
          ]}
          value="week"
        />
      </div>

      <div className="fpl-stat-grid">
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

      <div className="fpl-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="fpl-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="fpl-panel">
        <h2>From prediction to publish</h2>
        <Stepper
          steps={[
            { label: 'Predict', description: 'Horizon forecast' },
            { label: 'Scenario', description: 'Stress drivers' },
            { label: 'Confidence', description: 'Set bands' },
            { label: 'Accuracy', description: 'Backtest score' },
            { label: 'Publish', description: 'Lock & export' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/forecast/predictions',
              '/forecast/scenarios',
              '/forecast/confidence',
              '/forecast/accuracy',
              '/forecast/settings',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="fpl-split">
        <section className="fpl-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="fpl-copy">
                DC MAPE missed target — Marcus Poluru is rebasing replen models. Q4 stress scenario
                waits on supply assumptions from Priya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="fpl-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="fpl-person">
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
        <section className="fpl-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
