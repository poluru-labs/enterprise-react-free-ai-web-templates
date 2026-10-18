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
    <div className="lci-page">
      <PageHeader
        title="Extract clauses, track obligations, and manage contract reviews."
        description="A light legal desk with named owners on every clause and every renewal."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/legal/reviews')}>
              Open reviews
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Review opened', variant: 'success' });
                navigate('/legal/reviews');
              }}
            >
              New review
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="ContractPulse 3.1"
        message="Clause diff and renewal radar are live. Review SLA pages Elena Poluru when queue exceeds 7 days."
      />

      <section className="lci-hero">
        <div>
          <Badge label="Org" variant="brand" soft pill />
          <h2>Contract intelligence</h2>
          <p>
            Pull key clauses from executed agreements, track obligations and notice dates, and run
            structured reviews before sign-off.
          </p>
          <div className="lci-hero-actions">
            <Button onClick={() => navigate('/legal/clauses')}>Browse clauses</Button>
            <Button variant="secondary" onClick={() => navigate('/legal/obligations')}>
              View obligations
            </Button>
          </div>
        </div>
        <div className="lci-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="lci-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Quarter', value: 'quarter' },
            { label: 'Year', value: 'year' },
            { label: 'Portfolio', value: 'all' },
          ]}
          value="quarter"
        />
      </div>

      <div className="lci-stat-grid">
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

      <div className="lci-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="lci-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="lci-panel">
        <h2>From ingest to sign-off</h2>
        <Stepper
          steps={[
            { label: 'Ingest', description: 'Upload PDF' },
            { label: 'Extract', description: 'Clause blocks' },
            { label: 'Obligate', description: 'Dates & owners' },
            { label: 'Review', description: 'Redlines' },
            { label: 'Execute', description: 'Archive' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/legal/settings',
              '/legal/clauses',
              '/legal/obligations',
              '/legal/reviews',
              '/legal/settings',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="lci-split">
        <section className="lci-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="lci-copy">
                Acme amendment over SLA — Elena Poluru escalated to outside counsel. Jonah Poluru
                flagged renewal notice on CloudCo SOW; Sofia Poluru updated indemnity fallback in
                the playbook.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="lci-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="lci-person">
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
        <section className="lci-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
