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
  { label: 'Demand', description: 'Forecasts and spikes', icon: 'home', to: `${BASE_PATH}/demand` },
  { label: 'Shipments', description: 'Lanes, ETAs, exceptions', icon: 'check', to: `${BASE_PATH}/shipments` },
  { label: 'Suppliers', description: 'Risk scores and audits', icon: 'clock', to: `${BASE_PATH}/suppliers` },
  { label: 'Inventory', description: 'Coverage and on-hand', icon: 'filter', to: `${BASE_PATH}/inventory` },
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
    <div className="sct-page">
      <PageHeader
        title="AI Supply Chain Control Tower"
        description="Monitor demand, shipments, supplier risk, and inventory. Desk owned by Avery Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this tower desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="sct-copy">
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
        title="ChainPulse 2.0"
        message="Lane tracker, spike alerts, and coverage map are live. Avery Poluru owns planning this week."
        dismissible
      />

      <section className="sct-hero">
        <div>
          <Badge label="Poluru Global Supply" variant="brand" soft pill />
          <h2>
            Network control
            <VisuallyHidden> for Poluru Global Supply</VisuallyHidden>
          </h2>
          <p>
            Read demand signals, track shipments, score suppliers, and protect inventory coverage. Every lane has a named owner.
          </p>
          <div className="sct-hero-actions">
            <Status label="Network live" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/shipments`)}>Open shipments</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/demand`)}>
              Review demand
            </Button>
          </div>
        </div>
        <div className="sct-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="sct-toolbar-row">
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

      <div className="sct-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="sct-panel">
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

      <section className="sct-stack">
        <h2 className="sct-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="sct-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="sct-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="sct-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="sct-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="sct-panel">
        <h2 className="sct-heading">
          <Icon name="check" size="sm" decorative />
          From forecast to delivery
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Forecast', description: 'Demand plan' },
            { label: 'Source', description: 'Suppliers' },
            { label: 'Move', description: 'Shipments' },
            { label: 'Stock', description: 'Inventory' },
            { label: 'Review', description: 'Settings' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/battery`,
              `${BASE_PATH}/shipments`,
              `${BASE_PATH}/demand`,
              `${BASE_PATH}/telemetry`,
              `${BASE_PATH}/maintenance`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="sct-split">
        <section className="sct-panel">
          <h2 className="sct-heading">
            Region mix
            <Tooltip content="Share of shipment volume by region">
              <span>
                <Icon name="info" size="sm" label="About region mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="sct-meter-list">
            {overview.regions.map((row) => (
              <div key={row.label} className="sct-meter-row">
                <div className="sct-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="sct-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="sct-copy">
                Polar Metals flagged critical risk. Jonah Poluru opened a mitigation. Chicago DC still needs two SKUs until Elena Poluru clears the wave.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="sct-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="sct-person">
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

      <div className="sct-split">
        <section className="sct-panel">
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
        <section className="sct-panel">
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
