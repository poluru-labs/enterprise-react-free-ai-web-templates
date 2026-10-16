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
    <div className="hil-page">
      <PageHeader
        title="Manage annotation, reviewer consensus, calibration, and tasks."
        description="A light review desk with named owners on every batch and every dispute."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/hitl/consensus')}>
              Open consensus
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Task created', variant: 'success' });
                navigate('/hitl/tasks');
              }}
            >
              New task
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="ReviewLoop 3.1"
        message="Majority vote and Monday gold calibration are live. Dispute SLA pages Elena Poluru after 2 hours."
      />

      <section className="hil-hero">
        <div>
          <Badge label="Org" variant="brand" soft pill />
          <h2>Human-in-the-loop workspace</h2>
          <p>
            Label data, align reviewers, calibrate against gold sets, and ship tasks with clear SLAs
            before export to training.
          </p>
          <div className="hil-hero-actions">
            <Button onClick={() => navigate('/hitl/annotation')}>Open annotation</Button>
            <Button variant="secondary" onClick={() => navigate('/hitl/calibration')}>
              View calibration
            </Button>
          </div>
        </div>
        <div className="hil-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="hil-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: 'Week', value: 'week' },
            { label: 'Sprint', value: 'sprint' },
          ]}
          value="week"
        />
      </div>

      <div className="hil-stat-grid">
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

      <div className="hil-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="hil-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="hil-panel">
        <h2>From label to export</h2>
        <Stepper
          steps={[
            { label: 'Annotate', description: 'First pass labels' },
            { label: 'Review', description: 'Second pass' },
            { label: 'Consensus', description: 'Agreement check' },
            { label: 'Calibrate', description: 'Gold score' },
            { label: 'Export', description: 'Training pack' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/hitl/annotation',
              '/hitl/annotation',
              '/hitl/consensus',
              '/hitl/calibration',
              '/hitl/settings',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="hil-split">
        <section className="hil-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="hil-copy">
                Dispute queue above SLA — Elena Poluru added two lead reviewers. Vision lane gold
                pass dipped; Jonah Poluru scheduled a rubric refresh for Priya Poluru’s team.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="hil-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="hil-person">
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
        <section className="hil-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
