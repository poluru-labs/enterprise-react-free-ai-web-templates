import { useState } from 'react';
import {
  Button,
  FileUpload,
  Rating,
  Slider,
  Stepper,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useParams } from 'react-router-dom';
import runsData from '../data/runs.json';
import samplesData from '../data/samples.json';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, formatPercent } from '../lib/format.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

function stepFor(status) {
  if (status === 'Passed') return 4;
  if (status === 'Failed') return 2;
  if (status === 'Running') return 1;
  if (status === 'Queued') return 0;
  return 3;
}

export default function RunDetailPage() {
  const { id } = useParams();
  const run = runsData.runs.find((item) => item.id === id) || runsData.runs[0];
  const [notes, setNotes] = useState('Keep Harbor in commit. Madhav Poluru’s invoice pack still needs PO recall.');
  const [quality, setQuality] = useState(run.status === 'Passed' ? 5 : 3);
  const [threshold, setThreshold] = useState(90);
  const samples = samplesData.samples.filter((item) => item.model === run.model || item.suite === run.suite);

  return (
    <div className="prism-page">
      <PageHeader
        title={run.name}
        description={`${run.owner} · ${run.model} · ${formatNumber(run.samples)} samples`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Runs', to: `${BASE_PATH}/runs` }, { label: run.name }]}
        actions={
          <>
            <StatusBadge status={run.status} pulse={run.status === 'Running'} />
            <Button
              variant="secondary"
              icon="refresh"
              onClick={() =>
                showToast({
                  title: 'Retry queued',
                  description: `${run.name} is back with ${run.owner}.`,
                  variant: 'info',
                })
              }
            >
              Retry
            </Button>
          </>
        }
      />

      <div className="prism-panel mb-3">
        <div className="prism-panel-body" style={{ paddingTop: '1.1rem' }}>
          <Stepper steps={runsData.runSteps} current={stepFor(run.status)} />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <article className="prism-stat-card">
            <p className="prism-stat-label">Score</p>
            <p className="prism-stat-value">{formatPercent(run.score)}</p>
            <p className="prism-stat-hint">{run.suite}</p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="prism-stat-card">
            <p className="prism-stat-label">Samples</p>
            <p className="prism-stat-value">{formatNumber(run.samples)}</p>
            <p className="prism-stat-hint">{run.duration} · {run.when}</p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="prism-stat-card">
            <p className="prism-stat-label">Pass threshold</p>
            <Slider min={70} max={100} value={threshold} showValue onChange={(_, value) => setThreshold(value)} />
            <div className="prism-stat-foot">
              <span className="prism-stat-hint">Judge quality</span>
              <Rating value={quality} onChange={setQuality} />
            </div>
          </article>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Samples" subtitle="Predicted vs expected for this stack">
            <DataTable
              rows={samples}
              columns={[
                { key: 'id', label: 'Sample', className: 'prism-mono' },
                { key: 'prompt', label: 'Prompt' },
                { key: 'predicted', label: 'Predicted' },
                { key: 'expected', label: 'Expected' },
                {
                  key: 'verdict',
                  label: 'Verdict',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Workspace" subtitle="Notes and artifacts">
            <div className="prism-stack">
              <Textarea
                label="Latest note"
                rows={5}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
              <Button
                size="sm"
                onClick={() =>
                  showToast({
                    title: 'Note saved',
                    description: 'Meera Poluru’s note is on the run.',
                    variant: 'success',
                  })
                }
              >
                Save note
              </Button>
              <FileUpload label="Attach scorecard" hint="jsonl, csv, or pdf" />
            </div>
          </ChartSection>
        </div>
      </div>

      <ChartSection title="History" subtitle="Motion around this job">
        <Timeline items={overview.timeline} />
      </ChartSection>
    </div>
  );
}
