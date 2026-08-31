import {
  Card,
  Meter,
  ProgressBar,
  Skeleton,
  Spinner,
  Status,
  Stepper,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { statusVariant, versions } from '../data';

const steps = [
  { label: 'Draft', description: 'Author' },
  { label: 'Eval', description: 'Golden set' },
  { label: 'Review', description: 'Owner sign-off' },
  { label: 'Canary', description: '10% traffic' },
  { label: 'Publish', description: 'Production' },
];

export default function Releases() {
  return (
    <>
      <section className="page-head">
        <div>
          <p className="eyebrow">Pipeline</p>
          <h1>Releases</h1>
          <p className="summary">Draft, evaluate, and publish. Lakshmi Poluru’s support copilot is the current live pack.</p>
        </div>
        <Spinner size="sm" label="Live jobs" showLabel />
      </section>

      <Card elevated>
        <div className="card-body">
          <div className="section-head">
            <h2>Canonical pipeline</h2>
            <Status label="Review" variant="info" pulse />
          </div>
          <Stepper steps={steps} current={2} />
        </div>
      </Card>

      <section className="split" style={{ marginTop: '0.9rem' }}>
        <Card elevated>
          <div className="card-body">
            <h2>Active versions</h2>
            {versions.map((job) => (
              <div className="job-row" key={job.id}>
                <div className="job-head">
                  <div>
                    <strong>{job.id} · {job.prompt}</strong>
                    <p className="meta">{job.owner} · {job.stage}</p>
                  </div>
                  <Status label={job.status} variant={statusVariant(job.status)} />
                </div>
                {job.status === 'Canary' ? (
                  <ProgressBar value={job.progress} max={100} label={job.id} showValue />
                ) : job.status === 'Failed' ? (
                  <Skeleton variant="text" lines={2} />
                ) : (
                  <Meter value={job.progress} max={100} label={job.id} showValue optimum={100} high={90} low={50} />
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card elevated>
          <div className="card-body">
            <h2>Run log</h2>
            <Timeline
              items={versions.map((job, index) => ({
                title: `${job.id} · ${job.prompt}`,
                description: `${job.owner} · ${job.status}`,
                timestamp: job.stage,
                status: index === 0 ? 'current' : job.status === 'Live' ? 'complete' : 'upcoming',
              }))}
            />
          </div>
        </Card>
      </section>
    </>
  );
}
