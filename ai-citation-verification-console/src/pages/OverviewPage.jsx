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
  { label: 'Bibliography', description: 'Entries and DOI checks', icon: 'home', to: `${BASE_PATH}/citations` },
  { label: 'Sources', description: 'Link health and archives', icon: 'check', to: `${BASE_PATH}/sources` },
  { label: 'Queue', description: 'Verification batches', icon: 'clock', to: `${BASE_PATH}/queue` },
  { label: 'Publishers', description: 'Metadata and SLAs', icon: 'filter', to: `${BASE_PATH}/publishers` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · CiteDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="cite-page">
      <PageHeader
        title="Citation Verification Console"
        description="Bibliography checks, source status, verification queues, and publisher metadata. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this verification desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="cite-copy">
                Open queue counts active verification batches. Verified today is bibliography cleared in the last window.
                Broken links are sources failing crawl. Publishers synced is metadata refreshed this week.
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
        title="CiteDesk 2.0"
        message="DOI resolver and queue triage are live. Maya Poluru owns publisher sync this week."
        dismissible
      />

      <section className="cite-hero">
        <div>
          <Badge label="Poluru Research" variant="brand" soft pill />
          <h2>
            Citation control
            <VisuallyHidden> for Poluru Research</VisuallyHidden>
          </h2>
          <p>
            Verify bibliography entries, monitor source health, triage analyst queues, and keep publisher metadata current.
          </p>
          <div className="cite-hero-actions">
            <Status label="Desk active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/citations`)}>Open bibliography</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/queue`)}>
              Review queue
            </Button>
          </div>
        </div>
        <div className="cite-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="cite-toolbar-row">
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

      <div className="cite-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="cite-panel">
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

      <section className="cite-stack">
        <h2 className="cite-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="cite-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="cite-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="cite-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="cite-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="cite-panel">
        <h2 className="cite-heading">
          <Icon name="check" size="sm" decorative />
          From import to export
        </h2>
        <Stepper
          current={3}
          steps={[
            { label: 'Import', description: 'Bibliography' },
            { label: 'Resolve', description: 'Sources' },
            { label: 'Review', description: 'Queue' },
            { label: 'Sync', description: 'Publishers' },
            { label: 'Export', description: 'Verified set' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/citations`,
              `${BASE_PATH}/sources`,
              `${BASE_PATH}/queue`,
              `${BASE_PATH}/publishers`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="cite-split">
        <section className="cite-panel">
          <h2 className="cite-heading">
            Source mix
            <Tooltip content="Share of citations by material type">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="cite-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="cite-meter-row">
                <div className="cite-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="cite-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="cite-copy">
                Crossref batch finished after Kavya Poluru cleared DOI mismatches. Ravi Poluru still needs publisher sign-off from Priya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="cite-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="cite-person">
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

      <div className="cite-split">
        <section className="cite-panel">
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
        <section className="cite-panel">
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
