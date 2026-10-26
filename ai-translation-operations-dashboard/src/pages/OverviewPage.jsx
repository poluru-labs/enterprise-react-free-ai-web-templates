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
  { label: 'Translations', description: 'Jobs and publish status', icon: 'home', to: `${BASE_PATH}/translations` },
  { label: 'Coverage', description: 'Locales and gaps', icon: 'check', to: `${BASE_PATH}/coverage` },
  { label: 'Terminology', description: 'Glossary and conflicts', icon: 'clock', to: `${BASE_PATH}/terminology` },
  { label: 'Reviews', description: 'Linguist QA queue', icon: 'filter', to: `${BASE_PATH}/reviews` },
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
    <div className="trn-page">
      <PageHeader
        title="AI Translation Operations Dashboard"
        description="Track translations, language coverage, terminology, and reviews. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this translation desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="trn-copy">
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
        title="LocalePulse 2.0"
        message="Batch publish, locale gap map, and term diff are live. Leela Poluru owns linguistics this week."
        dismissible
      />

      <section className="trn-hero">
        <div>
          <Badge label="Poluru Content Studio" variant="brand" soft pill />
          <h2>
            Localization control
            <VisuallyHidden> for Poluru Content Studio</VisuallyHidden>
          </h2>
          <p>
            Queue translation jobs, read locale coverage, manage glossary terms, and close linguist reviews. Every locale has a named owner.
          </p>
          <div className="trn-hero-actions">
            <Status label="Desk live" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/translations`)}>Open translations</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/reviews`)}>
              Review queue
            </Button>
          </div>
        </div>
        <div className="trn-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="trn-toolbar-row">
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

      <div className="trn-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="trn-panel">
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

      <section className="trn-stack">
        <h2 className="trn-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="trn-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="trn-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="trn-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="trn-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="trn-panel">
        <h2 className="trn-heading">
          <Icon name="check" size="sm" decorative />
          From source to publish
        </h2>
        <Stepper
          current={4}
          steps={[
            { label: 'Source', description: 'English base' },
            { label: 'Translate', description: 'Jobs' },
            { label: 'Term', description: 'Glossary' },
            { label: 'Cover', description: 'Locales' },
            { label: 'Publish', description: 'Reviews' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/battery`,
              `${BASE_PATH}/translations`,
              `${BASE_PATH}/reviews`,
              `${BASE_PATH}/telemetry`,
              `${BASE_PATH}/maintenance`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="trn-split">
        <section className="trn-panel">
          <h2 className="trn-heading">
            Locale mix
            <Tooltip content="Share of translated strings by locale">
              <span>
                <Icon name="info" size="sm" label="About locale mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="trn-meter-list">
            {overview.locales.map((row) => (
              <div key={row.label} className="trn-meter-row">
                <div className="trn-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="trn-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="trn-copy">
                Legal ja-JP blocked on terminology. Jonah Poluru opened a glossary fix. Checkout es-MX waits on one review until Nina Poluru signs off.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="trn-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="trn-person">
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

      <div className="trn-split">
        <section className="trn-panel">
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
        <section className="trn-panel">
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
