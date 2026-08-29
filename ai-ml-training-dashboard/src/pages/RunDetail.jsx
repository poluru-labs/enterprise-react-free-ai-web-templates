import { useState } from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  DescriptionList,
  FileUpload,
  ProgressBar,
  Rating,
  Slider,
  Status,
  Stepper,
  Tab,
  Tabs,
  Tag,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { findRun, runSteps, statusTone, timeline } from '../data';

export default function RunDetail({ routeId }) {
  const run = findRun(routeId);
  const [notes, setNotes] = useState('Keep Harbor in commit. Meera Poluru’s val set is clean.');
  const [quality, setQuality] = useState(4);
  const [lr, setLr] = useState(3);
  const step = run.status === 'Succeeded' ? 4 : run.status === 'Failed' ? 2 : 2;

  return (
    <>
      <Breadcrumb items={[{ label: 'Runs', href: '#/runs' }, { label: run.name }]} />
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Job</span>
          <h1>{run.name}</h1>
          <p>{run.owner} · {run.gpu} · {run.eta}</p>
        </div>
        <div className="row">
          <Status label={run.status} variant={statusTone(run.status)} pulse={run.status === 'Running'} />
          <Badge label={run.acc} variant="brand" pill />
          <Button variant="secondary" icon="refresh" onClick={() => showToast({ title: 'Retry queued', description: `${run.name} is back with Jordan Poluru’s settings.`, variant: 'info' })}>Retry</Button>
        </div>
      </header>
      <Stepper steps={runSteps} current={step} />
      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div className="stack">
          <Card header="Training health">
            <ProgressBar label={`Epoch ${run.epoch}`} value={run.status === 'Succeeded' ? 100 : 60} showValue />
            <Slider className="mt-3" label="Learning rate ×1e-4" min={1} max={10} value={lr} showValue onChange={(_, value) => setLr(value)} />
            <div className="row" style={{ marginTop: '0.85rem' }}>
              <span className="muted">Checkpoint quality</span>
              <Rating value={quality} onChange={setQuality} />
            </div>
          </Card>
          <Card header="Record">
            <DescriptionList
              items={[
                { term: 'Experiment', description: run.experiment },
                { term: 'Owner', description: run.owner },
                { term: 'Cluster', description: run.cluster },
                { term: 'GPU', description: run.gpu },
                { term: 'Accuracy', description: run.acc },
                { term: 'Loss', description: run.loss == null ? '—' : String(run.loss) },
              ]}
            />
          </Card>
        </div>
        <Card header="Workspace">
          <Tabs className="forge-tabs">
            <Tab label="Notes">
              <div className="stack">
                <Textarea label="Latest note" rows={5} value={notes} onChange={(event) => setNotes(event.target.value)} />
                <Button size="sm" onClick={() => showToast({ title: 'Note saved', description: 'Kavya Poluru’s Harbor note is on the run.', variant: 'success' })}>Save note</Button>
              </div>
            </Tab>
            <Tab label="Artifacts">
              <div className="stack">
                <FileUpload label="Add a checkpoint" hint="pt, safetensors, or onnx" />
                <Tag label="epoch-12.pt" variant="brand" dismissible />
              </div>
            </Tab>
            <Tab label="History">
              <Timeline items={timeline} />
            </Tab>
          </Tabs>
        </Card>
      </div>
    </>
  );
}
