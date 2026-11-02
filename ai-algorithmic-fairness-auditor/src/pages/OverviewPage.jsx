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
  { label: 'Metrics', description: 'Disparity and floors', icon: 'home', to: `${BASE_PATH}/metrics` },
  { label: 'Cohorts', description: 'Segments and outcomes', icon: 'check', to: `${BASE_PATH}/cohorts` },
  { label: 'Policies', description: 'Thresholds and rules', icon: 'clock', to: `${BASE_PATH}/policies` },
  { label: 'Reviews', description: 'Certification queue', icon: 'filter', to: `${BASE_PATH}/reviews` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Rahul Poluru · ParityDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="fair-page">
      <PageHeader
        title="Algorithmic Fairness Auditor"
        description="Bias metrics, cohort reviews, policy checks, and remediation workflows. Desk owned by Rahul Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this fairness desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="fair-copy">
                Online counts registered units reporting heartbeats. Battery is average state of charge.
                Missions are active tasks. Maintenance is open work orders.
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
        title="ParityDesk 2.0"
        message="Cohort compare and threshold alerts are live. Priya Poluru owns metric windows this week."
        dismissible
      />

      <section className="fair-hero">
        <div>
          <Badge label="Poluru Models" variant="brand" soft pill />
          <h2>
            Fairness control
            <VisuallyHidden> for Poluru Models</VisuallyHidden>
          </h2>
          <p>
            Track disparity metrics, cohort outcomes, policy checks, and remediation workflows. Every model owner is a Poluru teammate.
          </p>
          <div className="fair-hero-actions">
            <Status label="Program healthy" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/metrics`)}>Open metrics</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/cohorts`)}>
              Review cohorts
            </Button>
          </div>
        </div>
        <div className="fair-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="fair-toolbar-row">
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

      <div className="fair-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="fair-panel">
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

      <section className="fair-stack">
        <h2 className="fair-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="fair-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="fair-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="fair-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="fair-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="fair-panel">
        <h2 className="fair-heading">
          <Icon name="check" size="sm" decorative />
          From measure to remediate
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Measure', description: 'Metrics' },
            { label: 'Segment', description: 'Cohorts' },
            { label: 'Check', description: 'Policies' },
            { label: 'Fix', description: 'Remediate' },
            { label: 'Certify', description: 'Reviews' },
          ]}
          onStepClick={(index) => {
            const routes = [
                            `${BASE_PATH}/cohorts`,
              `${BASE_PATH}/metrics`,
              `${BASE_PATH}/metrics`,
              `${BASE_PATH}/cohorts`,
              `${BASE_PATH}/reports`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="fair-split">
        <section className="fair-panel">
          <h2 className="fair-heading">
            Program mix
            <Tooltip content="Share of active reviews by program">
              <span>
                <Icon name="info" size="sm" label="About program mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="fair-meter-list">
            {overview.bySegment.map((row) => (
              <div key={row.label} className="fair-meter-row">
                <div className="fair-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="fair-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="fair-copy">
                Lending parity improved after Maya Poluru reweighted region B. Pricing uplift still needs sign-off before Jonah Poluru closes the exception.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="fair-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="fair-person">
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

      <div className="fair-split">
        <section className="fair-panel">
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
        <section className="fair-panel">
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
