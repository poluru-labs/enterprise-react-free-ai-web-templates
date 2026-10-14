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
    <div className="frd-page">
      <PageHeader
        title="Track fraud, credit models, portfolio risk, and explainability."
        description="A light firm desk with named owners on every case, model, and limit breach."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/risk/fraud')}>
              Open fraud
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Case opened', variant: 'success' });
                navigate('/risk/fraud');
              }}
            >
              New case
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="RiskPulse 2.6"
        message="Reason code packs and champion/challenger are live. SMB book is at 96% of VaR limit."
      />

      <section className="frd-hero">
        <div>
          <Badge label="Firm" variant="brand" soft pill />
          <h2>Financial risk</h2>
          <p>
            Triage fraud, monitor credit models, watch portfolio limits, and ship explainability packs
            regulators can audit.
          </p>
          <div className="frd-hero-actions">
            <Button onClick={() => navigate('/risk/portfolio')}>Open portfolio</Button>
            <Button variant="secondary" onClick={() => navigate('/risk/explain')}>
              View explain
            </Button>
          </div>
        </div>
        <div className="frd-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="frd-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
          value="today"
        />
      </div>

      <div className="frd-stat-grid">
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

      <div className="frd-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="frd-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="frd-panel">
        <h2>From alert to explain</h2>
        <Stepper
          steps={[
            { label: 'Fraud', description: 'Triage cases' },
            { label: 'Credit', description: 'Score & decide' },
            { label: 'Portfolio', description: 'Watch limits' },
            { label: 'Explain', description: 'Ship the pack' },
            { label: 'Settings', description: 'Policy & alerts' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/risk/fraud',
              '/risk/credit',
              '/risk/portfolio',
              '/risk/explain',
              '/risk/settings',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="frd-split">
        <section className="frd-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="frd-copy">
                Graph signals cut mule investigation time. SMB VaR is in breach — Marcus Poluru
                owns the limit review. Twelve explain packs await Jonah Poluru sign-off.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="frd-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="frd-person">
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
        <section className="frd-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
