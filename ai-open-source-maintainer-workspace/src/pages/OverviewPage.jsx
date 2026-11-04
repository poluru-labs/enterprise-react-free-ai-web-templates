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
  { label: 'Issues', description: 'Triage and labels', icon: 'home', to: `${BASE_PATH}/issues` },
  { label: 'Releases', description: 'Tags and notes', icon: 'check', to: `${BASE_PATH}/releases` },
  { label: 'Contributors', description: 'Community roster', icon: 'clock', to: `${BASE_PATH}/contributors` },
  { label: 'Packages', description: 'Health scores', icon: 'filter', to: `${BASE_PATH}/packages` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · MaintDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="maint-page">
      <PageHeader
        title="Open Source Maintainer Workspace"
        description="Issues, releases, contributors, and package health. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this maintainer desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="maint-copy">
                Open issues are untriaged or in-progress tickets. Releases counts tags published in the last 30 days.
                Active contributors merged PRs this quarter. Packages healthy is the share passing health checks.
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
        title="MaintDesk 2.0"
        message="Issue inbox and release calendar are live. Maya Poluru owns releases this week."
        dismissible
      />

      <section className="maint-hero">
        <div>
          <Badge label="Poluru OSS" variant="brand" soft pill />
          <h2>
            Maintainer workspace
            <VisuallyHidden> for Poluru OSS</VisuallyHidden>
          </h2>
          <p>
            Triage issues, plan releases, recognize contributors, and monitor package health across your org repos.
          </p>
          <div className="maint-hero-actions">
            <Status label="Console active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/issues`)}>Open issues</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/packages`)}>
              Package health
            </Button>
          </div>
        </div>
        <div className="maint-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="maint-toolbar-row">
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

      <div className="maint-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="maint-panel">
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

      <section className="maint-stack">
        <h2 className="maint-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="maint-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="maint-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="maint-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="maint-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="maint-panel">
        <h2 className="maint-heading">
          <Icon name="check" size="sm" decorative />
          From report to release
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Triage', description: 'Issues' },
            { label: 'Review', description: 'Contributors' },
            { label: 'Ship', description: 'Releases' },
            { label: 'Monitor', description: 'Packages' },
            { label: 'Archive', description: 'Done' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/issues`,
              `${BASE_PATH}/contributors`,
              `${BASE_PATH}/releases`,
              `${BASE_PATH}/packages`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="maint-split">
        <section className="maint-panel">
          <h2 className="maint-heading">
            Repo mix
            <Tooltip content="Share of activity by repo category">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="maint-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="maint-meter-row">
                <div className="maint-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="maint-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="maint-copy">
                ISS-2201 unblocked after Kavya Poluru patched theme tokens. Ravi Poluru still needs release notes from Maya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="maint-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="maint-person">
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

      <div className="maint-split">
        <section className="maint-panel">
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
        <section className="maint-panel">
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
