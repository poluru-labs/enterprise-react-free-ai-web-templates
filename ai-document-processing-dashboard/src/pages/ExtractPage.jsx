import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import extract from '../data/extract.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ExtractPage() {
  return (
    <div className="dpd-page">
      <PageHeader
        title="Extract"
        description="Fields, tables, and confidence. Owner: Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Extract' }]}
      />

      <div className="dpd-extract-hero">
        <article className="dpd-panel dpd-center">
          <p>Desk score</p>
          <CircularProgress value={extract.score} max={100} size={140} showValue />
        </article>
        {extract.packs.map((pack) => (
          <article key={pack.id} className="dpd-panel">
            <h3>{pack.name}</h3>
            <p className="dpd-copy">
              {pack.owner} · retain {pack.ttl}
            </p>
            <ProgressBar value={pack.usage} max={100} label="Coverage" showValue />
            <Meter value={pack.quality} min={0} max={100} label="Confidence" showValue />
            <DescriptionList items={pack.fields} />
            <div className="dpd-switch-row">
              <Switch
                label="Auto-release"
                defaultChecked={pack.quality >= 95}
                onChange={() => showToast({ title: `${pack.id} release updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
