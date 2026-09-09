import { useParams } from 'react-router-dom';
import {
  DescriptionList,
  List,
  Meter,
  ProgressBar,
  Tab,
  Tabs,
  Tag,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { findPipeline } from '../lib/pipelines.js';
import { formatCompact, formatDateTime, formatDuration, formatRowsPerSec } from '../lib/format.js';
import { DataTable, PageHeader, SlaBadge, StatusBadge } from '../components/widgets/index.js';

export default function PipelineDetailPage() {
  const { id } = useParams();
  const pipeline = findPipeline(id);

  return (
    <div className="cd-page">
      <PageHeader
        title={pipeline.name}
        description={`${pipeline.purpose} Owned by ${pipeline.owner} · steward ${pipeline.steward}.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Pipelines', to: `${BASE_PATH}/pipelines` }, { label: pipeline.name }]}
        actions={
          <div className="cd-inline">
            <SlaBadge sla={pipeline.sla} />
            <StatusBadge status={pipeline.status} pulse={pipeline.status === 'Running'} />
          </div>
        }
      />

      <div className="cd-stage-strip">
        {pipeline.stages.map((stage) => (
          <div className="cd-stage-chip" key={stage.label}>
            <span>{stage.label}</span>
            <strong>
              <StatusBadge status={stage.status} />
            </strong>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <section className="cd-panel">
            <header className="cd-panel-header">
              <div>
                <h2>Record</h2>
                <p>Source, destination, and schedule.</p>
              </div>
            </header>
            <div className="cd-panel-body">
              <DescriptionList
                columns={2}
                items={[
                  { term: 'Source', description: pipeline.source },
                  { term: 'Destination', description: pipeline.destination },
                  { term: 'Engine', description: pipeline.engine },
                  { term: 'Schedule', description: pipeline.schedule },
                  { term: 'Throughput', description: formatRowsPerSec(pipeline.rowsPerSec) },
                  { term: 'Lag', description: formatDuration(pipeline.lagMinutes) },
                  { term: 'Last run', description: formatDateTime(pipeline.lastRun) },
                  { term: '24h volume', description: formatCompact(pipeline.volume24h) },
                ]}
              />
              <div className="cd-tag-row mt-3">
                {pipeline.tags.map((item) => (
                  <Tag key={item} label={item} variant="info" />
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="col-12 col-xl-5">
          <section className="cd-panel">
            <header className="cd-panel-header">
              <div>
                <h2>Quality</h2>
                <p>Score on the latest completed window.</p>
              </div>
            </header>
            <div className="cd-panel-body">
              <ProgressBar value={pipeline.qualityScore} max={100} label="Quality score" showValue />
              <Meter className="mt-3" value={pipeline.qualityScore} max={100} label="Freshness confidence" showValue />
              <List
                divided
                className="mt-3"
                items={pipeline.stages.map((stage) => ({ label: `${stage.label} · ${stage.status}`, icon: 'check' }))}
              />
            </div>
          </section>
        </div>
      </div>

      <section className="cd-panel">
        <header className="cd-panel-header">
          <div>
            <h2>Runs and activity</h2>
            <p>Recent windows and operator notes.</p>
          </div>
        </header>
        <div className="cd-panel-body">
          <Tabs>
            <Tab label="Runs">
              <DataTable
                rows={pipeline.runs}
                columns={[
                  { key: 'id', label: 'Run' },
                  {
                    key: 'started',
                    label: 'Started',
                    render: (value) => formatDateTime(value),
                  },
                  {
                    key: 'duration',
                    label: 'Duration',
                    render: (value) => formatDuration(value),
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: (value) => <StatusBadge status={value} />,
                  },
                  {
                    key: 'rows',
                    label: 'Rows',
                    render: (value) => formatCompact(value),
                  },
                ]}
              />
            </Tab>
            <Tab label="Activity">
              <Timeline
                items={pipeline.runs.map((run) => ({
                  title: `${run.id} ${run.status.toLowerCase()}`,
                  description: `${formatCompact(run.rows)} rows · ${formatDuration(run.duration)}`,
                  timestamp: formatDateTime(run.started),
                  status: run.status === 'Succeeded' ? 'complete' : 'current',
                }))}
              />
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
