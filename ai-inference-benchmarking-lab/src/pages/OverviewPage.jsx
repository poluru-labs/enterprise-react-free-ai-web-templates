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
  { label: 'Runs', description: 'Job history', icon: 'home', to: `${BASE_PATH}/runs` },
  { label: 'Metrics', description: 'Latency and throughput', icon: 'check', to: `${BASE_PATH}/metrics` },
  { label: 'Hardware', description: 'Host profiles', icon: 'clock', to: `${BASE_PATH}/hardware` },
  { label: 'Suites', description: 'Benchmark packages', icon: 'filter', to: `${BASE_PATH}/suites` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · BenchDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="bench-page">
      <PageHeader
        title="Inference Benchmarking Lab"
        description="Run history, latency and throughput stats, hardware profiles, and benchmark suites. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this lab desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="bench-copy">
                Runs this week counts completed and in-flight jobs. Median latency is p50 across active suites.
                Peak throughput is the best host rps this period. Hosts online are profiles ready to schedule.
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
        title="BenchDesk 2.0"
        message="Run compare and latency bands are live. Maya Poluru owns hardware ops this week."
        dismissible
      />

      <section className="bench-hero">
        <div>
          <Badge label="Poluru Lab" variant="brand" soft pill />
          <h2>
            Benchmark lab
            <VisuallyHidden> for Poluru Lab</VisuallyHidden>
          </h2>
          <p>
            Review run history, compare latency and throughput, manage hardware profiles, and schedule benchmark suites.
          </p>
          <div className="bench-hero-actions">
            <Status label="Lab floor active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/runs`)}>Open runs</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/metrics`)}>
              View metrics
            </Button>
          </div>
        </div>
        <div className="bench-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="bench-toolbar-row">
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

      <div className="bench-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="bench-panel">
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

      <section className="bench-stack">
        <h2 className="bench-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="bench-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="bench-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="bench-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="bench-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="bench-panel">
        <h2 className="bench-heading">
          <Icon name="check" size="sm" decorative />
          From schedule to sign-off
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Schedule', description: 'Suites' },
            { label: 'Execute', description: 'Runs' },
            { label: 'Measure', description: 'Metrics' },
            { label: 'Host', description: 'Hardware' },
            { label: 'Archive', description: 'Done' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/suites`,
              `${BASE_PATH}/runs`,
              `${BASE_PATH}/metrics`,
              `${BASE_PATH}/hardware`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="bench-split">
        <section className="bench-panel">
          <h2 className="bench-heading">
            Suite mix
            <Tooltip content="Share of runs by suite category">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="bench-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="bench-meter-row">
                <div className="bench-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="bench-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="bench-copy">
                STABLE-3 p99 improved after Kavya Poluru tuned batch size. Ravi Poluru still needs H-15 sign-off from Maya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="bench-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="bench-person">
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

      <div className="bench-split">
        <section className="bench-panel">
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
        <section className="bench-panel">
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
