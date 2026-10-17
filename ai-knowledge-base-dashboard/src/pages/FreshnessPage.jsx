import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import freshness from '../data/freshness.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function FreshnessPage() {
  return (
    <div className="knb-page">
      <PageHeader
        title="Freshness"
        description="Stale content, review dates, and owner SLAs. Owner: Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Freshness' }]}
      />

      <div className="knb-freshness-hero">
        <article className="knb-panel knb-center">
          <p>Org freshness score</p>
          <CircularProgress value={freshness.score} max={100} size={140} showValue />
        </article>
        {freshness.bands.map((band) => (
          <article key={band.id} className="knb-panel">
            <h3>{band.name}</h3>
            <p className="knb-copy">
              {band.owner} · review every {band.ttl}
            </p>
            <ProgressBar value={band.usage} max={100} label="Pages on schedule" showValue />
            <Meter value={band.quality} min={0} max={100} label="Within SLA" showValue />
            <DescriptionList items={band.fields} />
            <div className="knb-switch-row">
              <Switch
                label="Auto-unpublish when overdue"
                defaultChecked={band.quality >= 90}
                onChange={() => showToast({ title: `${band.id} policy updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
