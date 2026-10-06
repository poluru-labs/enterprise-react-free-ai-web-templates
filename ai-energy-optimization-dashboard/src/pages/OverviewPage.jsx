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
    <div className="eod-page">
      <PageHeader
        title="Optimize energy usage, cooling, carbon impact, and savings."
        description="A light portfolio desk with named owners on every site and every project."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/energy/carbon')}>
              Open carbon
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({ title: 'Project queued', variant: 'success' });
                navigate('/energy/savings');
              }}
            >
              New project
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="GridPulse 4.0"
        message="Carbon budget alerts and peak shave 2.1 are live. On-call: Sofia Poluru after hours."
      />

      <section className="eod-hero">
        <div>
          <Badge label="Portfolio" variant="brand" soft pill />
          <h2>Energy optimization</h2>
          <p>
            Watch load and cooling, track carbon against budget, and prove savings on every project.
            One trail from meter to ROI.
          </p>
          <div className="eod-hero-actions">
            <Button onClick={() => navigate('/energy/usage')}>Open usage</Button>
            <Button variant="secondary" onClick={() => navigate('/energy/cooling')}>
              View cooling
            </Button>
          </div>
        </div>
        <div className="eod-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="eod-toolbar-row">
        <SegmentedControl
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
          value="today"
        />
      </div>

      <div className="eod-stat-grid">
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

      <div className="eod-card-grid">
        {overview.features.map((feature) => (
          <Card key={feature.title} padded elevated>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="eod-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="eod-panel">
        <h2>From meter to savings</h2>
        <Stepper
          steps={[
            { label: 'Usage', description: 'Read the load' },
            { label: 'Cooling', description: 'Tune the plant' },
            { label: 'Carbon', description: 'Track impact' },
            { label: 'Savings', description: 'Prove ROI' },
            { label: 'Settings', description: 'Tariffs and alerts' },
          ]}
          current={2}
          onStepClick={(index) => {
            const routes = [
              '/energy/usage',
              '/energy/cooling',
              '/energy/carbon',
              '/energy/savings',
              '/energy/settings',
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="eod-split">
        <section className="eod-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Ship list">
              <p className="eod-copy">
                Peak shave is armed for North DC. Carbon budget is over by 8% this month under
                Elena Poluru. Row 12 delta-T is back in range.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="eod-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="eod-person">
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
        <section className="eod-panel">
          <h2>Release trail</h2>
          <Timeline items={overview.releases} />
        </section>
      </div>
    </div>
  );
}
