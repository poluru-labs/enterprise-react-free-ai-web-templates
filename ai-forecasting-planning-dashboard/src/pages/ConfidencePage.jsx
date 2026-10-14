import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import confidence from '../data/confidence.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ConfidencePage() {
  return (
    <div className="fpl-page">
      <PageHeader
        title="Confidence levels"
        description="Prediction intervals and bands. Owner: Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Confidence' }]}
      />

      <div className="fpl-confidence-hero">
        <article className="fpl-panel fpl-center">
          <p>Org coverage</p>
          <CircularProgress value={confidence.score} max={100} size={140} showValue />
        </article>
        {confidence.bands.map((band) => (
          <article key={band.id} className="fpl-panel">
            <h3>{band.name}</h3>
            <p className="fpl-copy">
              {band.owner} · horizon {band.ttl}
            </p>
            <ProgressBar value={band.usage} max={100} label="SKU coverage" showValue />
            <Meter value={band.quality} min={0} max={100} label="Calibration" showValue />
            <DescriptionList items={band.fields} />
            <div className="fpl-switch-row">
              <Switch
                label="Show band in publish pack"
                defaultChecked={band.quality >= 90}
                onChange={() => showToast({ title: `${band.id} pack updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
