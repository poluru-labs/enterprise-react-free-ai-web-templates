import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import experiments from '../data/experiments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function ExperimentsPage() {
  const live = experiments.items.filter((item) => item.status === 'Live').length;
  const failed = experiments.items.filter((item) => item.status === 'Failed').length;

  return (
    <div className="pmt-page">
      <PageHeader
        title="Experiments"
        description="A/B prompt tests across Support, GTM, Knowledge, and Safety."
        crumbs={[BREADCRUMB_ROOT, { label: 'Experiments' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Experiment drafted', description: 'Sravani Poluru can assign traffic next.', variant: 'success' })}
          >
            New experiment
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Active tests" value={experiments.items.length} icon="bi-bezier2" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Winning" value={live} icon="bi-trophy" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Paused" value={failed} icon="bi-pause-circle" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard className="h-100" label="Best lift" value="+4.2%" hint="Support copilot tone" icon="bi-graph-up-arrow" tone="info" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {experiments.items.slice(0, 3).map((item) => (
          <div className="col-12 col-xl-4" key={item.id}>
            <article className="pmt-experiment-card h-100">
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.status} />
              </header>
              <p className="pmt-note mt-2">{item.control} vs {item.variant} · {item.traffic}</p>
              <p className="pmt-stat-value">{item.lift}</p>
              <p className="pmt-subtle">{item.metric} · {item.owner}</p>
              <p className="pmt-note mt-auto">{item.note}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="All experiments" subtitle="Started between 24 and 28 Aug 2026">
            <DataTable
              rows={experiments.items}
              columns={[
                { key: 'name', label: 'Experiment' },
                { key: 'control', label: 'Control' },
                { key: 'variant', label: 'Variant' },
                { key: 'owner', label: 'Owner' },
                { key: 'metric', label: 'Metric' },
                { key: 'lift', label: 'Lift' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                {
                  key: 'started',
                  label: 'Started',
                  render: (value) => formatDate(value),
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
