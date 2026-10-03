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
    <div className="dpd-page">
      <PageHeader
        title="Process OCR, classification, extraction, validation, and exceptions."
        description="A light desk for inbound files, field scores, and a named owner on every exception."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/documents/exceptions')}>
              Open exceptions
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Batch started', variant: 'success' });
                navigate('/documents/inbox');
              }}
            >
              New batch
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="Pagewise 1.4"
        message="Field confidence and duplicate hash are live. Exception SLA pages Sofia Poluru after 8 hours."
      />

      <section className="dpd-hero">
        <div>
          <Badge label="Desk" variant="brand" soft pill />
          <h2>Document processing</h2>
          <p>
            Capture the packet, classify the type, extract the fields, prove the rules, then clear
            what fails. One trail from inbox to export.
          </p>
          <div className="dpd-hero-actions">
            <Button onClick={() => navigate('/documents/inbox')}>Open inbox</Button>
            <Button variant="secondary" onClick={() => navigate('/documents/validate')}>
              View rules
            </Button>
          </div>
        </div>
        <div className="dpd-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="dpd-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
          value="today"
        />
      </div>

      <div className="dpd-stat-grid">
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

      <div className="dpd-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="dpd-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="dpd-panel">
        <h2>From inbox to export</h2>
        <Stepper
          steps={[
            { label: 'OCR', description: 'Read the page' },
            { label: 'Classify', description: 'Name the type' },
            { label: 'Extract', description: 'Lift the fields' },
            { label: 'Validate', description: 'Prove the rules' },
            { label: 'Exceptions', description: 'Clear the rest' },
          ]}
          current={3}
          onStepClick={(index) => {
            const routes = [
              '/documents/inbox',
              '/documents/classify',
              '/documents/extract',
              '/documents/validate',
              '/documents/exceptions',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="dpd-split">
        <section className="dpd-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="dpd-copy">
                Duplicate hash is on for invoices. Identity glare is still a watch under Priya
                Poluru. PO-over-$2k is the only failing rule.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="dpd-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="dpd-person">
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
        <section className="dpd-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
