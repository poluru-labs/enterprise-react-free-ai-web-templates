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
  { label: 'Datasets', description: 'Versions and hashes', icon: 'home', to: `${BASE_PATH}/datasets` },
  { label: 'Lineage', description: 'Upstream and downstream', icon: 'check', to: `${BASE_PATH}/lineage` },
  { label: 'Custody', description: 'Handoffs and seals', icon: 'clock', to: `${BASE_PATH}/custody` },
  { label: 'Audit trail', description: 'Immutable log', icon: 'filter', to: `${BASE_PATH}/audit` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · ProvDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="prov-page">
      <PageHeader
        title="Data Provenance Explorer"
        description="Lineage tables, dataset versions, custody events, and audit trails. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this provenance desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="prov-copy">
                Active datasets are registered snapshots. Lineage links are verified edges in the registry.
                Open custody counts handoffs in flight. Audit entries are immutable events recorded this quarter.
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
        title="ProvDesk 2.0"
        message="Version diff and lineage export are live. Maya Poluru owns lineage curation this week."
        dismissible
      />

      <section className="prov-hero">
        <div>
          <Badge label="Poluru Data" variant="brand" soft pill />
          <h2>
            Provenance control
            <VisuallyHidden> for Poluru Data</VisuallyHidden>
          </h2>
          <p>
            Explore dataset versions, lineage edges as tables, custody handoffs, and a searchable audit trail.
          </p>
          <div className="prov-hero-actions">
            <Status label="Registry active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/datasets`)}>Open datasets</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/custody`)}>
              Review custody
            </Button>
          </div>
        </div>
        <div className="prov-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="prov-toolbar-row">
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

      <div className="prov-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="prov-panel">
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

      <section className="prov-stack">
        <h2 className="prov-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="prov-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="prov-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="prov-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="prov-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="prov-panel">
        <h2 className="prov-heading">
          <Icon name="check" size="sm" decorative />
          From ingest to attest
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Ingest', description: 'Datasets' },
            { label: 'Link', description: 'Lineage' },
            { label: 'Transfer', description: 'Custody' },
            { label: 'Log', description: 'Audit' },
            { label: 'Attest', description: 'Export' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/datasets`,
              `${BASE_PATH}/lineage`,
              `${BASE_PATH}/custody`,
              `${BASE_PATH}/audit`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="prov-split">
        <section className="prov-panel">
          <h2 className="prov-heading">
            Pipeline mix
            <Tooltip content="Share of datasets by lifecycle stage">
              <span>
                <Icon name="info" size="sm" label="About track mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="prov-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="prov-meter-row">
                <div className="prov-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="prov-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="prov-copy">
                Lineage gap on DS-2201 closed after Kavya Poluru added upstream edge. Ravi Poluru still needs custody seal from Priya Poluru.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="prov-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="prov-person">
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

      <div className="prov-split">
        <section className="prov-panel">
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
        <section className="prov-panel">
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
