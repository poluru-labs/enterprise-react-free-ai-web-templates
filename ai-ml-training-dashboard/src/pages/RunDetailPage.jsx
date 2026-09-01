import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Badge,
  Button,
  FileUpload,
  ProgressBar,
  Rating,
  Slider,
  Tab,
  Tabs,
  Tag,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import runsData from '../data/runs.json';
import checkpointsData from '../data/checkpoints.json';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function RunDetailPage() {
  const { id } = useParams();
  const run = runsData.items.find((item) => item.id === id) || runsData.items[0];
  const checkpoints = checkpointsData.items.filter((item) => item.runId === run.id);
  const [notes, setNotes] = useState('Keep Harbor in commit. Meera Poluru’s val set is clean.');
  const [quality, setQuality] = useState(4);
  const [lr, setLr] = useState(3);
  const epochPct = Math.round((run.epochCurrent / run.epochTotal) * 100);

  return (
    <div className="kiln-page">
      <PageHeader
        title={run.name}
        description={`${run.owner} · ${run.gpu} · ${run.cluster}`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Runs', to: `${BASE_PATH}/runs` }, { label: run.name }]}
        actions={
          <>
            <StatusBadge status={run.status} pulse={run.status === 'Running'} />
            <Badge label={run.acc} variant="brand" pill />
            <Button
              variant="secondary"
              size="sm"
              icon="refresh"
              onClick={() =>
                showToast({
                  title: 'Retry queued',
                  description: `${run.name} is back with Jordan Poluru’s settings.`,
                  variant: 'info',
                })
              }
            >
              Retry
            </Button>
          </>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <article className="kiln-stat-card">
            <p className="kiln-stat-label">Epochs</p>
            <p className="kiln-stat-value">{run.epoch}</p>
            <ProgressBar label="Progress" value={run.status === 'Succeeded' ? 100 : epochPct} showValue />
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="kiln-stat-card">
            <p className="kiln-stat-label">GPU</p>
            <p className="kiln-stat-value">{run.gpu}</p>
            <p className="kiln-stat-hint">
              {run.cluster} · ETA {run.eta}
            </p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="kiln-stat-card">
            <p className="kiln-stat-label">Loss</p>
            <p className="kiln-stat-value">{run.loss == null ? '—' : run.loss}</p>
            <p className="kiln-stat-hint">Val acc {run.acc}</p>
          </article>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Loss" subtitle={`${run.experiment} · last recorded epochs`}>
            <AreaChart labels={overview.lossTrend.labels} series={overview.lossTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Training health" subtitle="Learning rate and checkpoint quality">
            <Slider
              className="mb-3"
              label="Learning rate ×1e-4"
              min={1}
              max={10}
              value={lr}
              showValue
              onChange={(_, value) => setLr(value)}
            />
            <div className="kiln-inline-row">
              <span className="kiln-note">Checkpoint quality</span>
              <Rating value={quality} onChange={setQuality} />
            </div>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Checkpoints"
            subtitle="Promote from Harbor, Oak, or Bright"
            action={
              <Link className="kiln-text-link" to={`${BASE_PATH}/checkpoints`}>
                Open registry
              </Link>
            }
          >
            {checkpoints.length ? (
              <div className="row g-3">
                {checkpoints.map((ckpt) => (
                  <div className="col-12 col-md-6" key={ckpt.id}>
                    <article className="kiln-checkpoint-card">
                      <header>
                        <h3>Epoch {ckpt.epoch}</h3>
                        <StatusBadge status={ckpt.status} />
                      </header>
                      <p>
                        Acc {formatPercent(ckpt.acc)} · loss {ckpt.loss} · {ckpt.size}
                      </p>
                      <Button
                        size="sm"
                        onClick={() =>
                          showToast({
                            title: 'Checkpoint promoted',
                            description: `${run.name} epoch ${ckpt.epoch} is now a candidate for Kavya Poluru.`,
                            variant: 'success',
                          })
                        }
                      >
                        Promote
                      </Button>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <p className="kiln-note">No epoch checkpoints stored for this run yet.</p>
            )}
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <section className="kiln-panel">
            <header className="kiln-panel-header">
              <div>
                <h2>Workspace</h2>
                <p>Notes, artifacts, and motion.</p>
              </div>
            </header>
            <div className="kiln-panel-body">
              <Tabs className="kiln-tabs">
                <Tab label="Notes">
                  <div className="kiln-stack">
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
                          description: 'Kavya Poluru’s Harbor note is on the run.',
                          variant: 'success',
                        })
                      }
                    >
                      Save note
                    </Button>
                  </div>
                </Tab>
                <Tab label="Artifacts">
                  <div className="kiln-stack">
                    <FileUpload label="Add a checkpoint" hint="pt, safetensors, or onnx" />
                    <Tag label="epoch-12.pt" variant="brand" dismissible />
                  </div>
                </Tab>
                <Tab label="History">
                  <Timeline items={overview.timeline} />
                </Tab>
              </Tabs>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
