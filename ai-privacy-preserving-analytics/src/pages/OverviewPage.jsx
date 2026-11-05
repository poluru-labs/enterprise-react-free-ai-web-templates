import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Icon,
  List,
  Popover,
  ProgressBar,
  SegmentedControl,
  Skeleton,
  Spinner,
  Stat,
  Status,
  Stepper,
  Tab,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  VisuallyHidden,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const RANGES = {
  week: 'This week',
  month: 'This month',
  quarter: 'This quarter',
};

const SHORTCUTS = [
  { label: 'Metrics', description: 'Aggregated KPIs', icon: 'home', to: `${BASE_PATH}/metrics` },
  { label: 'Consent', description: 'Scopes by region', icon: 'check', to: `${BASE_PATH}/consent` },
  { label: 'Access log', description: 'Audit events', icon: 'clock', to: `${BASE_PATH}/access` },
  { label: 'Exports', description: 'Report bundles', icon: 'filter', to: `${BASE_PATH}/exports` },
];

export default function OverviewPage() {
  const navigate = useNavigate();
  const [range, setRange] = useState('week');
  const [loading, setLoading] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const refresh = () => {
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · PrivDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="priv-page">
      <PageHeader
        title="Privacy-Preserving Analytics"
        description="Aggregated metrics, consent scopes, access logs, and exports. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this privacy desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="priv-copy">
                Active consent scopes are lawful bases still in force. Queries counts aggregate reads in the last 24 hours.
                Access denials are policy blocks on sensitive resources. Exports ready are signed bundles this week.
              </p>
            </Popover>
            <Button variant="secondary" size="sm" icon="refresh" loading={loading} onClick={refresh}>
              Refresh
            </Button>
            <Button
              size="sm"
              icon="download"
              onClick={() => showToast({ title: 'Report queued', description: 'Jonah Poluru will receive it.', variant: 'success' })}
            >
              Export
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="PrivDesk 2.0"
        message="Consent map and access search are live. Maya Poluru owns metric catalog this week."
        dismissible
      />

      <section className="priv-hero">
        <div>
          <Badge label="Privacy program" variant="brand" soft pill />
          <h2>
            Privacy-preserving analytics
            <VisuallyHidden> for Poluru program ops</VisuallyHidden>
          </h2>
          <p>
            Publish k-anonymized metrics, map consent scopes, audit access, and deliver redacted exports to stakeholders.
          </p>
          <div className="priv-hero-actions">
            <Status label="Console active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/metrics`)}>Browse metrics</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/exports`)}>
              Report exports
            </Button>
          </div>
        </div>
        <div className="priv-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="priv-toolbar-row">
        <SegmentedControl
          value={range}
          onChange={setRange}
          options={[
            { label: 'This week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Quarter', value: 'quarter' },
          ]}
        />
        {loading ? <Spinner size="sm" label="Refreshing" showLabel /> : null}
        <VisuallyHidden>
          <span role="status">{loading ? 'Refreshing metrics' : `Showing ${RANGES[range]}`}</span>
        </VisuallyHidden>
      </div>

      <div className="priv-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="priv-panel">
                <Skeleton variant="text" lines={3} />
              </div>
            ))
          : overview.kpis.map((kpi) => (
              <Stat
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                hint={`${kpi.hint} · ${RANGES[range]}`}
                trend={kpi.trend}
                trendValue={kpi.trendValue}
              />
            ))}
      </div>

      <section className="priv-stack">
        <h2 className="priv-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="priv-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="priv-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="priv-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="priv-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="priv-panel">
        <h2 className="priv-heading">
          <Icon name="check" size="sm" decorative />
          From consent to export
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Scope', description: 'Consent' },
            { label: 'Aggregate', description: 'Metrics' },
            { label: 'Audit', description: 'Access' },
            { label: 'Deliver', description: 'Exports' },
            { label: 'Archive', description: 'Done' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/consent`,
              `${BASE_PATH}/metrics`,
              `${BASE_PATH}/access`,
              `${BASE_PATH}/exports`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="priv-split">
        <section className="priv-panel">
          <h2 className="priv-heading">
            Query mix
            <Tooltip content="Share of aggregate queries by purpose">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="priv-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="priv-meter-row">
                <div className="priv-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="priv-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="priv-copy">
                MET-2201 published after Kavya Poluru raised k-threshold. Ravi Poluru still needs EU consent renewal from Priya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="priv-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="priv-person">
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
      </div>

      <div className="priv-split">
        <section className="priv-panel">
          <h2>Shortcuts</h2>
          <List
            divided
            items={SHORTCUTS.map(({ label, description, icon }) => ({ label, description, icon }))}
            onSelect={(label) => {
              const match = SHORTCUTS.find((item) => item.label === label);
              if (match) navigate(match.to);
            }}
          />
        </section>
        <section className="priv-panel">
          <h2>Activity</h2>
          <Timeline
            items={overview.activity.map((item) => ({
              ...item,
              timestamp: formatDateTime(item.timestamp),
            }))}
          />
        </section>
      </div>
    </div>
  );
}
