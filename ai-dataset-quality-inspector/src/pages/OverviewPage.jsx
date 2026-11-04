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
  { label: 'Schemas', description: 'Checks and pass rates', icon: 'home', to: `${BASE_PATH}/schemas` },
  { label: 'Anomalies', description: 'Counts and severity', icon: 'check', to: `${BASE_PATH}/anomalies` },
  { label: 'Rules', description: 'Validation catalog', icon: 'clock', to: `${BASE_PATH}/rules` },
  { label: 'Releases', description: 'Readiness scores', icon: 'filter', to: `${BASE_PATH}/releases` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · QualDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="qual-page">
      <PageHeader
        title="Dataset Quality Inspector"
        description="Schema checks, anomaly counts, validation rules, and release readiness scores. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this quality desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="qual-copy">
                Schema pass rate is the latest validation run. Open anomalies are unresolved row-level issues.
                Active rules are enforced in the catalog. Release score is average readiness across candidates.
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
        title="QualDesk 2.0"
        message="Schema diff and rule simulator are live. Maya Poluru owns schema checks this week."
        dismissible
      />

      <section className="qual-hero">
        <div>
          <Badge label="Poluru Quality" variant="brand" soft pill />
          <h2>
            Quality control
            <VisuallyHidden> for Poluru Quality</VisuallyHidden>
          </h2>
          <p>
            Inspect schemas, track anomalies, manage validation rules, and gate releases with readiness scores.
          </p>
          <div className="qual-hero-actions">
            <Status label="Checks active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/schemas`)}>Open schemas</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/releases`)}>
              Review releases
            </Button>
          </div>
        </div>
        <div className="qual-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="qual-toolbar-row">
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

      <div className="qual-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="qual-panel">
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

      <section className="qual-stack">
        <h2 className="qual-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="qual-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="qual-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="qual-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="qual-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="qual-panel">
        <h2 className="qual-heading">
          <Icon name="check" size="sm" decorative />
          From scan to ship
        </h2>
        <Stepper
          current={3}
          steps={[
            { label: 'Scan', description: 'Schemas' },
            { label: 'Triage', description: 'Anomalies' },
            { label: 'Define', description: 'Rules' },
            { label: 'Gate', description: 'Releases' },
            { label: 'Ship', description: 'Ready' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/schemas`,
              `${BASE_PATH}/anomalies`,
              `${BASE_PATH}/rules`,
              `${BASE_PATH}/releases`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="qual-split">
        <section className="qual-panel">
          <h2 className="qual-heading">
            Table mix
            <Tooltip content="Share of checks by table category">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="qual-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="qual-meter-row">
                <div className="qual-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="qual-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="qual-copy">
                Schema drift on customer_dim cleared after Kavya Poluru updated the contract. Ravi Poluru still needs release sign-off from Jonah Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="qual-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="qual-person">
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

      <div className="qual-split">
        <section className="qual-panel">
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
        <section className="qual-panel">
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
