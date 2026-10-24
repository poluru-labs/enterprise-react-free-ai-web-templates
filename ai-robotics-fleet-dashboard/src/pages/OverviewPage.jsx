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
  { label: 'Robots', description: 'Units, zones, and status', icon: 'home', to: `${BASE_PATH}/robots` },
  { label: 'Missions', description: 'Routes, tasks, and ETA', icon: 'check', to: `${BASE_PATH}/missions` },
  { label: 'Battery', description: 'SOC bands and dock swaps', icon: 'clock', to: `${BASE_PATH}/battery` },
  { label: 'Telemetry', description: 'Streams and alerts', icon: 'filter', to: `${BASE_PATH}/telemetry` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Avery Poluru · Assignline', variant: 'success' });
    }, 700);
  };

  return (
    <div className="flt-page">
      <PageHeader
        title="AI Robotics Fleet Dashboard"
        description="Monitor robots, missions, battery levels, telemetry, and maintenance. Desk owned by Victor Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this fleet desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="flt-copy">
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
        title="FleetPulse 2.1"
        message="Live trace map, swap scheduler, and mission replay are live. Rahul Poluru owns dispatch this week."
        dismissible
      />

      <section className="flt-hero">
        <div>
          <Badge label="Poluru Logistics" variant="brand" soft pill />
          <h2>
            Fleet control
            <VisuallyHidden> for Poluru Logistics</VisuallyHidden>
          </h2>
          <p>
            Dispatch missions, read battery health, watch telemetry, and close maintenance tickets. Every zone has a named owner.
          </p>
          <div className="flt-hero-actions">
            <Status label="Fleet online" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/robots`)}>Open robots</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/missions`)}>
              Review missions
            </Button>
          </div>
        </div>
        <div className="flt-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="flt-toolbar-row">
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

      <div className="flt-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="flt-panel">
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

      <section className="flt-stack">
        <h2 className="flt-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="flt-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="flt-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="flt-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="flt-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="flt-panel">
        <h2 className="flt-heading">
          <Icon name="check" size="sm" decorative />
          From charge to mission complete
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Charge', description: 'Dock & SOC' },
            { label: 'Assign', description: 'Robots' },
            { label: 'Mission', description: 'Routes' },
            { label: 'Telemetry', description: 'Streams' },
            { label: 'Maintain', description: 'Work orders' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/battery`,
              `${BASE_PATH}/robots`,
              `${BASE_PATH}/missions`,
              `${BASE_PATH}/telemetry`,
              `${BASE_PATH}/maintenance`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="flt-split">
        <section className="flt-panel">
          <h2 className="flt-heading">
            Zone mix
            <Tooltip content="Share of active robots by zone">
              <span>
                <Icon name="info" size="sm" label="About zone mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="flt-meter-list">
            {overview.zones.map((row) => (
              <div key={row.label} className="flt-meter-row">
                <div className="flt-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="flt-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="flt-copy">
                Pick Gamma tripped a motor fault. Jonah Poluru opened a wheel swap. Pack zone still needs one dock slot until Elena Poluru clears the queue.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="flt-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="flt-person">
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

      <div className="flt-split">
        <section className="flt-panel">
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
        <section className="flt-panel">
          <h2>Release trail</h2>
          <Timeline
            items={overview.releases.map((item) => ({
              ...item,
              timestamp: formatDateTime(item.timestamp),
            }))}
          />
        </section>
      </div>
    </div>
  );
}
