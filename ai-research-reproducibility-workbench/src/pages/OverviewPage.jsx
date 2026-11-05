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
  { label: 'Runs', description: 'Experiment log', icon: 'home', to: `${BASE_PATH}/runs` },
  { label: 'Artifacts', description: 'Sealed outputs', icon: 'check', to: `${BASE_PATH}/artifacts` },
  { label: 'Environments', description: 'Pinned stacks', icon: 'clock', to: `${BASE_PATH}/environments` },
  { label: 'Reproductions', description: 'Verify status', icon: 'filter', to: `${BASE_PATH}/reproductions` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · ReproDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="repro-page">
      <PageHeader
        title="Research Reproducibility Workbench"
        description="Runs, artifacts, environment pins, and reproduction tracking. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this workbench"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="repro-copy">
                Runs this week counts scheduled trials. Repro verified is the share of gold studies passing parity checks.
                Pinned environments are locked stacks in active use. Artifact drift flags sealed outputs with hash mismatch.
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
        title="ReproDesk 2.0"
        message="Run compare and reproduction inbox are live. Maya Poluru owns environment pins this week."
        dismissible
      />

      <section className="repro-hero">
        <div>
          <Badge label="Research ops" variant="brand" soft pill />
          <h2>
            Reproducibility workbench
            <VisuallyHidden> for Poluru labs</VisuallyHidden>
          </h2>
          <p>
            Log experiment runs, seal artifacts, pin environments, and track independent reproductions through verification.
          </p>
          <div className="repro-hero-actions">
            <Status label="Console active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/runs`)}>Open runs</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/reproductions`)}>
              Reproductions
            </Button>
          </div>
        </div>
        <div className="repro-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="repro-toolbar-row">
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

      <div className="repro-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="repro-panel">
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

      <section className="repro-stack">
        <h2 className="repro-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="repro-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="repro-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="repro-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="repro-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="repro-panel">
        <h2 className="repro-heading">
          <Icon name="check" size="sm" decorative />
          From run to verified repro
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Run', description: 'Experiments' },
            { label: 'Seal', description: 'Artifacts' },
            { label: 'Pin', description: 'Env' },
            { label: 'Verify', description: 'Repro' },
            { label: 'Archive', description: 'Done' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/runs`,
              `${BASE_PATH}/artifacts`,
              `${BASE_PATH}/environments`,
              `${BASE_PATH}/reproductions`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="repro-split">
        <section className="repro-panel">
          <h2 className="repro-heading">
            Study mix
            <Tooltip content="Share of runs by study track">
              <span>
                <Icon name="info" size="sm" label="About study mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="repro-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="repro-meter-row">
                <div className="repro-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="repro-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="repro-copy">
                RUN-2185 failed on seed mismatch. Priya Poluru opened REP-870 while Maya Poluru refreshed ENV-301 pins.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="repro-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="repro-person">
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

      <div className="repro-split">
        <section className="repro-panel">
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
        <section className="repro-panel">
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
