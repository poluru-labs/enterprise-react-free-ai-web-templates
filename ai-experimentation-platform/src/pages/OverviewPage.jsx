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
    <div className="lex-page">
      <PageHeader
        title="Manage model variants, experiments, metrics, and rollout gates."
        description="A light program desk with named owners on every arm and every promote gate."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/lab/rollouts')}>
              Open rollouts
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Experiment drafted', variant: 'success' });
                navigate('/lab/experiments');
              }}
            >
              New experiment
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="VariantLab 3.2"
        message="Gate templates and guardrail stop are live. Promotes need Sofia Poluru after canary."
      />

      <section className="lex-hero">
        <div>
          <Badge label="Program" variant="brand" soft pill />
          <h2>Experimentation platform</h2>
          <p>
            Register variants, run controlled experiments, watch primary and guardrail metrics, then
            pass rollout gates before production traffic moves.
          </p>
          <div className="lex-hero-actions">
            <Button onClick={() => navigate('/lab/variants')}>Open variants</Button>
            <Button variant="secondary" onClick={() => navigate('/lab/metrics')}>
              View metrics
            </Button>
          </div>
        </div>
        <div className="lex-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="lex-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
          value="today"
        />
      </div>

      <div className="lex-stat-grid">
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

      <div className="lex-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="lex-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="lex-panel">
        <h2>From variant to production</h2>
        <Stepper
          steps={[
            { label: 'Variant', description: 'Register config' },
            { label: 'Experiment', description: 'Split traffic' },
            { label: 'Metrics', description: 'Measure lift' },
            { label: 'Analysis', description: 'Stats sign-off' },
            { label: 'Rollout', description: 'Pass the gate' },
          ]}
          current={3}
          onStepClick={(index) => {
            const routes = [
              '/lab/variants',
              '/lab/experiments',
              '/lab/metrics',
              '/lab/metrics',
              '/lab/rollouts',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="lex-split">
        <section className="lex-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="lex-copy">
                Checkout experiment is three-arm under Priya Poluru. Latency guardrail failed on
                ranker canary — Jonah Poluru is reviewing. Gate template v2 ships Friday.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="lex-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="lex-person">
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
        <section className="lex-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
