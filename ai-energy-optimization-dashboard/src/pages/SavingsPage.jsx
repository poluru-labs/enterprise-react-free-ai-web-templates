import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import savings from '../data/savings.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function SavingsPage() {
  return (
    <div className="eod-page">
      <PageHeader
        title="Savings"
        description="Projects, ROI, and run rate. Owner: Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Savings' }]}
      />

      <div className="eod-savings-hero">
        <article className="eod-panel eod-center">
          <p>Portfolio score</p>
          <CircularProgress value={savings.score} max={100} size={140} showValue />
        </article>
        {savings.projects.map((project) => (
          <article key={project.id} className="eod-panel">
            <h3>{project.name}</h3>
            <p className="eod-copy">
              {project.owner} · horizon {project.ttl}
            </p>
            <ProgressBar value={project.usage} max={100} label="Implementation" showValue />
            <Meter value={project.quality} min={0} max={100} label="ROI confidence" showValue />
            <DescriptionList items={project.fields} />
            <div className="eod-switch-row">
              <Switch
                label="Include in YTD roll-up"
                defaultChecked
                onChange={() => showToast({ title: `${project.id} roll-up updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
