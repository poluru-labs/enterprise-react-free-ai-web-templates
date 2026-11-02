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
  { label: 'Findings', description: 'Severity and owners', icon: 'home', to: `${BASE_PATH}/findings` },
  { label: 'Audits', description: 'Scan runs and profiles', icon: 'check', to: `${BASE_PATH}/audits` },
  { label: 'Reports', description: 'Exports and VPAT', icon: 'clock', to: `${BASE_PATH}/reports` },
  { label: 'Settings', description: 'Profiles and floors', icon: 'filter', to: `${BASE_PATH}/settings` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Nina Poluru · AuditDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="acc-page">
      <PageHeader
        title="Accessibility Auditor"
        description="WCAG conformance tracking, page scans, contrast issues, and remediation queues. Desk owned by Nina Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this conformance desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="acc-copy">
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
        title="AuditDesk 2.0"
        message="Weekly storefront crawl and contrast sweep are live. Priya Poluru owns schedules this week."
        dismissible
      />

      <section className="acc-hero">
        <div>
          <Badge label="Poluru Digital" variant="brand" soft pill />
          <h2>
            Conformance control
            <VisuallyHidden> for Poluru Digital</VisuallyHidden>
          </h2>
          <p>
            Track WCAG findings, page scans, contrast issues, and remediation queues. Every page owner is a Poluru teammate.
          </p>
          <div className="acc-hero-actions">
            <Status label="Scans healthy" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/findings`)}>Open findings</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/audits`)}>
              Review audits
            </Button>
          </div>
        </div>
        <div className="acc-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="acc-toolbar-row">
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

      <div className="acc-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="acc-panel">
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

      <section className="acc-stack">
        <h2 className="acc-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="acc-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="acc-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="acc-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="acc-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="acc-panel">
        <h2 className="acc-heading">
          <Icon name="check" size="sm" decorative />
          From scan to remediation
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Scan', description: 'Crawl pages' },
            { label: 'Triage', description: 'Findings' },
            { label: 'Fix', description: 'Remediate' },
            { label: 'Verify', description: 'Rescan' },
            { label: 'Report', description: 'Sign-off' },
          ]}
          onStepClick={(index) => {
            const routes = [
                            `${BASE_PATH}/audits`,
              `${BASE_PATH}/findings`,
              `${BASE_PATH}/findings`,
              `${BASE_PATH}/audits`,
              `${BASE_PATH}/reports`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="acc-split">
        <section className="acc-panel">
          <h2 className="acc-heading">
            Severity mix
            <Tooltip content="Share of open findings by severity">
              <span>
                <Icon name="info" size="sm" label="About severity mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="acc-meter-list">
            {overview.bySeverity.map((row) => (
              <div key={row.label} className="acc-meter-row">
                <div className="acc-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="acc-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="acc-copy">
                Checkout contrast failures dropped after Maya Poluru shipped new tokens. Twelve pages still need alt text before Nina Poluru signs the VPAT.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="acc-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="acc-person">
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

      <div className="acc-split">
        <section className="acc-panel">
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
        <section className="acc-panel">
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
