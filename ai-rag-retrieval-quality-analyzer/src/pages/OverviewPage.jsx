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
  { label: 'Query log', description: 'Sessions and latency', icon: 'home', to: `${BASE_PATH}/queries` },
  { label: 'KPIs', description: 'Precision and recall', icon: 'check', to: `${BASE_PATH}/kpis` },
  { label: 'Corpus', description: 'Source coverage', icon: 'clock', to: `${BASE_PATH}/corpus` },
  { label: 'Reviews', description: 'Spot-check queue', icon: 'filter', to: `${BASE_PATH}/reviews` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · RqDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="rq-page">
      <PageHeader
        title="Retrieval Quality Analyzer"
        description="Query logs, KPIs, corpus coverage, and review queues. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this quality desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="rq-copy">
                Mean precision@5 and recall@10 summarize ranking quality on the gold set. Corpus coverage is the share
                of sources indexed. Open reviews are human spot checks awaiting verdict.
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
        title="RqDesk 2.0"
        message="Query explorer and review inbox are live. Maya Poluru owns corpus refresh this week."
        dismissible
      />

      <section className="rq-hero">
        <div>
          <Badge label="Quality program" variant="brand" soft pill />
          <h2>
            Retrieval quality analyzer
            <VisuallyHidden> for Poluru search ops</VisuallyHidden>
          </h2>
          <p>
            Monitor query sessions, track precision and recall style KPIs, map corpus coverage, and clear the human review queue.
          </p>
          <div className="rq-hero-actions">
            <Status label="Console active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/queries`)}>Open query log</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/reviews`)}>
              Review queue
            </Button>
          </div>
        </div>
        <div className="rq-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="rq-toolbar-row">
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

      <div className="rq-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="rq-panel">
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

      <section className="rq-stack">
        <h2 className="rq-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="rq-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="rq-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="rq-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="rq-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="rq-panel">
        <h2 className="rq-heading">
          <Icon name="check" size="sm" decorative />
          From query to review
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Log', description: 'Queries' },
            { label: 'Measure', description: 'KPIs' },
            { label: 'Cover', description: 'Corpus' },
            { label: 'Verify', description: 'Reviews' },
            { label: 'Archive', description: 'Done' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/queries`,
              `${BASE_PATH}/kpis`,
              `${BASE_PATH}/corpus`,
              `${BASE_PATH}/reviews`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="rq-split">
        <section className="rq-panel">
          <h2 className="rq-heading">
            Corpus mix
            <Tooltip content="Share of indexed chunks by source type">
              <span>
                <Icon name="info" size="sm" label="About corpus mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="rq-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="rq-meter-row">
                <div className="rq-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="rq-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="rq-copy">
                KPI-298 dipped after billing FAQ reshuffle. Ravi Poluru queued REV-879 while Maya Poluru re-indexed support macros.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="rq-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="rq-person">
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

      <div className="rq-split">
        <section className="rq-panel">
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
        <section className="rq-panel">
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
