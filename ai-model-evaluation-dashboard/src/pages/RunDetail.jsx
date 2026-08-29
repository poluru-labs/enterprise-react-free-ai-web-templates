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
  const [notes, setNotes] = useState('Keep Harbor in commit. Madhav Poluru’s invoice pack still needs PO recall.');
  const [quality, setQuality] = useState(run.status === 'Passed' ? 5 : 3);
  const [threshold, setThreshold] = useState(90);
  const step = run.status === 'Passed' ? 4 : run.status === 'Failed' ? 2 : run.status === 'Running' ? 1 : 3;

  return (
    <>
      <Breadcrumb items={[{ label: 'Runs', href: '#/runs' }, { label: run.name }]} />
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Job</span>
          <h1>{run.name}</h1>
          <p>{run.owner} · {run.model} · {run.samples} samples</p>
        </div>
        <div className="row">
          <Status label={run.status} variant={statusTone(run.status)} pulse={run.status === 'Running'} />
          <Badge label={`${run.score}%`} variant="brand" pill />
          <Button variant="secondary" icon="refresh" onClick={() => showToast({ title: 'Retry queued', description: `${run.name} is back with ${run.owner}.`, variant: 'info' })}>Retry</Button>
        </div>
      </header>
      <Stepper steps={runSteps} current={step} />
      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div className="stack">
          <Card header="Eval health">
            <ProgressBar label={`${run.samples} samples`} value={run.status === 'Passed' ? 100 : run.status === 'Running' ? 62 : 84} showValue />
            <Slider className="mt-3" label="Pass threshold" min={70} max={100} value={threshold} showValue onChange={(_, value) => setThreshold(value)} />
            <div className="row" style={{ marginTop: '0.85rem' }}>
              <span className="muted">Judge quality</span>
              <Rating value={quality} onChange={setQuality} />
            </div>
          </Card>
          <Card header="Record">
            <DescriptionList
              items={[
                { term: 'Suite', description: run.suite },
                { term: 'Owner', description: run.owner },
                { term: 'Model', description: run.model },
                { term: 'Score', description: `${run.score}%` },
                { term: 'Duration', description: run.duration },
                { term: 'When', description: run.when },
              ]}
            />
          </Card>
        </div>
        <Card header="Workspace">
          <Tabs className="prism-tabs">
            <Tab label="Notes">
              <div className="stack">
                <Textarea label="Latest note" rows={5} value={notes} onChange={(event) => setNotes(event.target.value)} />
                <Button size="sm" onClick={() => showToast({ title: 'Note saved', description: 'Meera Poluru’s note is on the run.', variant: 'success' })}>Save note</Button>
              </div>
            </Tab>
            <Tab label="Artifacts">
              <div className="stack">
                <FileUpload label="Attach scorecard" hint="jsonl, csv, or pdf" />
                <Tag label={`${run.name}.jsonl`} variant="brand" dismissible />
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
