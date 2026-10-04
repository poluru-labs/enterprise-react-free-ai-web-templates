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
    <div className="hco-page">
      <PageHeader
        title="Monitor clinical queues, summaries, coding, and privacy events."
        description="A light network desk with named owners on every queue and every access event."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/healthcare/privacy')}>
              Open privacy
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Case opened', variant: 'success' });
                navigate('/healthcare/queues');
              }}
            >
              New case
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="CareLine 3.1"
        message="Code confidence and break-glass review are live. Privacy SLA pages Jonah Poluru after 4 hours."
      />

      <section className="hco-hero">
        <div>
          <Badge label="Network" variant="brand" soft pill />
          <h2>Healthcare operations</h2>
          <p>
            Watch the queues, draft and attest summaries, review suggested codes, and log every
            privacy-sensitive action. One trail from intake to archive.
          </p>
          <div className="hco-hero-actions">
            <Button onClick={() => navigate('/healthcare/queues')}>Open queues</Button>
            <Button variant="secondary" onClick={() => navigate('/healthcare/summaries')}>
              View summaries
            </Button>
          </div>
        </div>
        <div className="hco-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="hco-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
          value="today"
        />
      </div>

      <div className="hco-stat-grid">
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

      <div className="hco-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="hco-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="hco-panel">
        <h2>From queue to archive</h2>
        <Stepper
          steps={[
            { label: 'Queue', description: 'Triage the work' },
            { label: 'Summary', description: 'Draft the note' },
            { label: 'Coding', description: 'Suggest codes' },
            { label: 'Privacy', description: 'Log access' },
            { label: 'Settings', description: 'Policy and alerts' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/healthcare/queues',
              '/healthcare/summaries',
              '/healthcare/coding',
              '/healthcare/privacy',
              '/healthcare/settings',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="hco-split">
        <section className="hco-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="hco-copy">
                Priority lanes are on for ED. Handoff packs need attestation under Marcus Poluru.
                Two break-glass events are open.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="hco-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="hco-person">
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
        <section className="hco-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
