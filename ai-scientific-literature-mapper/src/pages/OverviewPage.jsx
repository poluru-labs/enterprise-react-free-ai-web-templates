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
  { label: 'Corpus', description: 'Paper mapping', icon: 'home', to: `${BASE_PATH}/corpus` },
  { label: 'Clusters', description: 'Topic groups', icon: 'check', to: `${BASE_PATH}/clusters` },
  { label: 'Citations', description: 'Cross links', icon: 'clock', to: `${BASE_PATH}/citations` },
  { label: 'Curation', description: 'Task queue', icon: 'filter', to: `${BASE_PATH}/curation` },
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
      showToast({ title: 'Snapshot refreshed', description: 'Leela Poluru · LitDesk', variant: 'success' });
    }, 700);
  };

  return (
    <div className="lit-page">
      <PageHeader
        title="Scientific Literature Mapper"
        description="Corpus mapping, topic clusters, citation links, and curation. Desk owned by Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Home' }]}
        actions={
          <>
            <Popover
              open={legendOpen}
              onOpenChange={setLegendOpen}
              heading="How to read this library desk"
              trigger={
                <Button variant="secondary" size="sm">
                  Legend
                </Button>
              }
            >
              <p className="lit-copy">
                Papers mapped counts indexed records in the corpus. Active clusters are topic groups in use this month.
                Citation links are verified cross references. Open curation is metadata and merge work awaiting assignees.
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
        title="LitDesk 2.0"
        message="Corpus explorer and curation inbox are live. Maya Poluru owns cluster refresh this week."
        dismissible
      />

      <section className="lit-hero">
        <div>
          <Badge label="Research library" variant="brand" soft pill />
          <h2>
            Literature mapper
            <VisuallyHidden> for Poluru research ops</VisuallyHidden>
          </h2>
          <p>
            Map papers into the corpus, maintain topic clusters, verify citation links, and clear the curation queue.
          </p>
          <div className="lit-hero-actions">
            <Status label="Console active" variant="success" pulse />
            <Button onClick={() => navigate(`${BASE_PATH}/corpus`)}>Browse corpus</Button>
            <Button variant="secondary" onClick={() => navigate(`${BASE_PATH}/curation`)}>
              Curation queue
            </Button>
          </div>
        </div>
        <div className="lit-hero-meta">
          {overview.kpis.slice(0, 3).map((kpi) => (
            <div key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="lit-toolbar-row">
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

      <div className="lit-stat-grid">
        {loading
          ? overview.kpis.map((kpi) => (
              <div key={kpi.label} className="lit-panel">
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

      <section className="lit-stack">
        <h2 className="lit-heading">
          <Icon name="star" size="sm" decorative />
          New
        </h2>
        <div className="lit-card-grid">
          {overview.newFeatures.map((feature) => (
            <Card key={feature.title} padded elevated>
              <Tag label="New" variant="brand" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Link className="lit-text-link" to={feature.href}>
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Divider label="Enhancements" />

      <div className="lit-card-grid">
        {overview.enhancements.map((feature) => (
          <Card key={feature.title} padded>
            <Tag label="Enhanced" variant="neutral" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <Link className="lit-text-link" to={feature.href}>
              Open
            </Link>
          </Card>
        ))}
      </div>

      <section className="lit-panel">
        <h2 className="lit-heading">
          <Icon name="check" size="sm" decorative />
          From import to curated map
        </h2>
        <Stepper
          current={2}
          steps={[
            { label: 'Import', description: 'Corpus' },
            { label: 'Cluster', description: 'Topics' },
            { label: 'Link', description: 'Citations' },
            { label: 'Curate', description: 'Tasks' },
            { label: 'Archive', description: 'Done' },
          ]}
          onStepClick={(index) => {
            const routes = [
              `${BASE_PATH}/corpus`,
              `${BASE_PATH}/clusters`,
              `${BASE_PATH}/citations`,
              `${BASE_PATH}/curation`,
              `${BASE_PATH}/settings`,
            ];
            navigate(routes[index]);
          }}
        />
      </section>

      <div className="lit-split">
        <section className="lit-panel">
          <h2 className="lit-heading">
            Discipline mix
            <Tooltip content="Share of corpus by broad field">
              <span>
                <Icon name="info" size="sm" label="About discipline mix" />
              </span>
            </Tooltip>
          </h2>
          <div className="lit-meter-list">
            {overview.byTrack.map((row) => (
              <div key={row.label} className="lit-meter-row">
                <div className="lit-meter-label">
                  <span>{row.label}</span>
                  <strong>{row.share}%</strong>
                </div>
                <ProgressBar value={row.share} max={100} />
              </div>
            ))}
          </div>
        </section>
        <section className="lit-panel">
          <h2>Notes</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="This week">
              <p className="lit-copy">
                CLU-298 drifted after new folding papers arrived. Priya Poluru assigned CUR-884 while Jonah Poluru verified CIT-501.
              </p>
            </Tab>
            <Tab label="Owners">
              <div className="lit-avatar-row">
                {overview.team.map((person) => (
                  <div key={person.name} className="lit-person">
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

      <div className="lit-split">
        <section className="lit-panel">
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
        <section className="lit-panel">
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
