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
  { label: 'Recommendations', description: 'Slots, models, and rank', icon: 'star', to: `${BASE_PATH}/recommendations` },
  { label: 'Conversions', description: 'Assisted orders and revenue', icon: 'check', to: `${BASE_PATH}/conversions` },
  { label: 'Experiments', description: 'Traffic, lift, and guardrails', icon: 'filter', to: `${BASE_PATH}/experiments` },
  { label: 'Catalog', description: 'Coverage by department', icon: 'folder', to: `${BASE_PATH}/catalog` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Avery Poluru · Rankline', variant: 'success' });
    }, 700);
  };

  return (
    <div className="rec-page">
      <PageHeader
        title="AI Recommendation Engine Dashboard"
        description="Track recommendations, conversions, experiments, and catalog coverage. Desk owned by Avery Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="rec-copy">
                Served counts impressions. Conversion is assisted orders divided by served.
                Experiments are running tests. Coverage is active SKUs with a live slot.
              </p>
            </Popover>
            <Button variant="secondary" size="sm" icon="refresh" loading={loading} onClick={refresh}>
              Refresh
            </Button>
            <Button
              size="sm"
              icon="download"
              onClick={() => showToast({ title: 'Report queued', description: 'Elena Poluru will receive it.', variant: 'success' })}
            >
              Export
            </Button>
          </>
        }
      />

      <Alert
        variant="info"
        title="Rankline 2.4"
        message="Attribution ledger, guardrail stop, and the coverage map are live. Rahul Poluru owns experiment publish this week."
        dismissible
      />

      <section className="rec-hero">
        <div>
          <Badge label="Poluru Retail" variant="brand" soft pill />
          <h2>
            Recommendation control
            <VisuallyHidden> for Poluru Retail</VisuallyHidden>
          </h2>
          <p>
            Serve ranked slots, read assisted conversions, watch experiments, and see where the
            catalog is still thin. Every surface has a named owner.
          </p>
          <div className="rec-hero-actions">
            <Status label="Serving live" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/recommendations`)}>Open slots</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/experiments`)}>
              Review experiments
            </Button>
          </div>
        </div>
        <div className="rec-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="rec-toolbar-row">
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

      <div className="rec-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="rec-panel">
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

      <section className="rec-stack">
        <h2 className="rec-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="rec-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="rec-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="rec-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="rec-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="rec-panel">
        <h2 className="rec-heading">
          <Icon name="check" size="sm" decorative />
          From catalog to publish
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Catalog', description: 'Coverage' },
            { label: 'Rank', description: 'Slots' },
            { label: 'Experiment', description: 'Lift' },
            { label: 'Convert', description: 'Orders' },
            { label: 'Publish', description: 'Live' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/catalog`,
              `${BASE_PATH}/recommendations`,
              `${BASE_PATH}/experiments`,
              `${BASE_PATH}/conversions`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="rec-split">
        <section className="rec-panel">
          <h2 className="rec-heading">
            Surface mix
            <Tooltip content="Share of served recommendations by surface">
              <span>
                <Icon name="info" size="sm" label="About surface mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="rec-meter-list">
            {overview.surfaces.map((row) => (
              <div key={row.label} className="rec-meter-row">
                <div className="rec-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="rec-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="rec-copy">
                Email subject lines hit the guardrail. Nina Poluru paused the copy. Grocery coverage
                is still under the floor until Leela Poluru fills pantry substitutes.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="rec-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="rec-person">
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

      <div className="rec-split">
        <section className="rec-panel">
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
        <section className="rec-panel">
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
