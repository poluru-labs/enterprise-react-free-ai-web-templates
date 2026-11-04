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
  { label: 'Inventory', description: 'Stock and warehouses', icon: 'home', to: `${BASE_PATH}/inventory` },
  { label: 'Deployments', description: 'Convoys and ETAs', icon: 'check', to: `${BASE_PATH}/deployments` },
  { label: 'Requests', description: 'Site needs queue', icon: 'clock', to: `${BASE_PATH}/requests` },
  { label: 'Regions', description: 'Area status', icon: 'filter', to: `${BASE_PATH}/regions` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · ReliefDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="relief-page">
      <PageHeader
        title="Disaster Resource Coordinator"
        description="Inventory, deployments, requests, and regional status. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this relief desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="relief-copy">
                Units available is stock across warehouses. Active deployments are convoys in the field.
                Open requests are unfilled site needs. Regions on watch are elevated status areas.
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
        title="ReliefDesk 2.0"
        message="Stock map and convoy tracker are live. Maya Poluru owns inventory control this week."
        dismissible
      />

      <section className="relief-hero">
        <div>
          <Badge label="Poluru Relief" variant="brand" soft pill />
          <h2>
            Resource coordination
            <VisuallyHidden> for Poluru Relief</VisuallyHidden>
          </h2>
          <p>
            Coordinate warehouse inventory, field deployments, incoming requests, and regional situational status.
          </p>
          <div className="relief-hero-actions">
            <Status label="Ops center active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/inventory`)}>Open inventory</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/requests`)}>
              Triage requests
            </Button>
          </div>
        </div>
        <div className="relief-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="relief-toolbar-row">
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

      <div className="relief-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="relief-panel">
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

      <section className="relief-stack">
        <h2 className="relief-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="relief-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="relief-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="relief-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="relief-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="relief-panel">
        <h2 className="relief-heading">
          <Icon name="check" size="sm" decorative />
          From stock to site
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Stock', description: 'Inventory' },
            { label: 'Dispatch', description: 'Deployments' },
            { label: 'Triage', description: 'Requests' },
            { label: 'Sitrep', description: 'Regions' },
            { label: 'Deliver', description: 'Fulfilled' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/inventory`,
              `${BASE_PATH}/deployments`,
              `${BASE_PATH}/requests`,
              `${BASE_PATH}/regions`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="relief-split">
        <section className="relief-panel">
          <h2 className="relief-heading">
            Supply mix
            <Tooltip content="Share of inventory by commodity class">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="relief-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="relief-meter-row">
                <div className="relief-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="relief-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="relief-copy">
                Water pallets restocked at WH-3 after Kavya Poluru cleared intake. Ravi Poluru still needs convoy priority from Jonah Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="relief-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="relief-person">
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

      <div className="relief-split">
        <section className="relief-panel">
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
        <section className="relief-panel">
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
