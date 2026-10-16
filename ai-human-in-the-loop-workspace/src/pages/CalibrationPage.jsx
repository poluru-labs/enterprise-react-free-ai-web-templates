import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import calibration from '../data/calibration.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CalibrationPage() {
  return (
    <div className="hil-page">
      <PageHeader
        title="Calibration"
        description="Gold sets, pass thresholds, and drift. Owner: Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Calibration' }]}
      />

      <div className="hil-calibration-hero">
        <article className="hil-panel hil-center">
          <p>Program pass rate</p>
          <CircularProgress value={calibration.score} max={100} size={140} showValue />
        </article>
        {calibration.bands.map((band) => (
          <article key={band.id} className="hil-panel">
            <h3>{band.name}</h3>
            <p className="hil-copy">
              {band.owner} · cadence {band.ttl}
            </p>
            <ProgressBar value={band.usage} max={100} label="Reviewer coverage" showValue />
            <Meter value={band.quality} min={0} max={100} label="Gold pass" showValue />
            <DescriptionList items={band.fields} />
            <div className="hil-switch-row">
              <Switch
                label="Block export if below threshold"
                defaultChecked={band.quality >= 90}
                onChange={() => showToast({ title: `${band.id} gate updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
