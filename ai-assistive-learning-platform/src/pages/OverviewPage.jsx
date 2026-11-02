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
  { label: 'Learners', description: 'Progress and tracks', icon: 'home', to: `${BASE_PATH}/learners` },
  { label: 'Modules', description: 'Paths and completion', icon: 'check', to: `${BASE_PATH}/modules` },
  { label: 'Accommodations', description: 'Requests and approvals', icon: 'clock', to: `${BASE_PATH}/accommodations` },
  { label: 'Support', description: 'Tickets and owners', icon: 'filter', to: `${BASE_PATH}/support` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · LearnDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="learn-page">
      <PageHeader
        title="Assistive Learning Platform"
        description="Learner progress, accommodations, content modules, and support tickets. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this learning desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="learn-copy">
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
        title="LearnDesk 2.0"
        message="Progress bands and module map are live. Maya Poluru owns learner success this week."
        dismissible
      />

      <section className="learn-hero">
        <div>
          <Badge label="Poluru Learning" variant="brand" soft pill />
          <h2>
            Learning control
            <VisuallyHidden> for Poluru Learning</VisuallyHidden>
          </h2>
          <p>
            Track learner progress, module completion, accommodations, and support tickets. Every learner coach is a Poluru teammate.
          </p>
          <div className="learn-hero-actions">
            <Status label="Term active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/learners`)}>Open learners</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/modules`)}>
              Review modules
            </Button>
          </div>
        </div>
        <div className="learn-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="learn-toolbar-row">
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

      <div className="learn-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="learn-panel">
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

      <section className="learn-stack">
        <h2 className="learn-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="learn-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="learn-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="learn-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="learn-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="learn-panel">
        <h2 className="learn-heading">
          <Icon name="check" size="sm" decorative />
          From enroll to graduate
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Enroll', description: 'Learners' },
            { label: 'Learn', description: 'Modules' },
            { label: 'Adapt', description: 'Accommodations' },
            { label: 'Help', description: 'Support' },
            { label: 'Graduate', description: 'Complete' },
          ]}
          onStepClick={(index) => {
            const routes = [
                            `${BASE_PATH}/modules`,
              `${BASE_PATH}/learners`,
              `${BASE_PATH}/learners`,
              `${BASE_PATH}/modules`,
              `${BASE_PATH}/reports`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="learn-split">
        <section className="learn-panel">
          <h2 className="learn-heading">
            Track mix
            <Tooltip content="Share of learners by track">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="learn-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="learn-meter-row">
                <div className="learn-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="learn-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="learn-copy">
                Module 4 went live after Kavya Poluru published captions. Ravi Poluru still needs accommodation sign-off from Priya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="learn-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="learn-person">
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

      <div className="learn-split">
        <section className="learn-panel">
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
        <section className="learn-panel">
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
