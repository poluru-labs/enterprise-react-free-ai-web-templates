import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import coding from '../data/coding.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CodingPage() {
  return (
    <div className="hop-page">
      <PageHeader
        title="Coding"
        description="ICD-10 and CPT suggestions with confidence. Owner: Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Coding' }]}
      />

      <div className="hop-coding-hero">
        <article className="hop-panel hop-center">
          <p>Network score</p>
          <CircularProgress value={coding.score} max={100} size={140} showValue />
        </article>
        {coding.packs.map((pack) => (
          <article key={pack.id} className="hop-panel">
            <h3>{pack.name}</h3>
            <p className="hop-copy">
              {pack.owner} · retain {pack.ttl}
            </p>
            <ProgressBar value={pack.usage} max={100} label="Coverage" showValue />
            <Meter value={pack.quality} min={0} max={100} label="Confidence" showValue />
            <DescriptionList items={pack.fields} />
            <div className="hop-switch-row">
              <Switch
                label="Auto-submit above floor"
                defaultChecked={pack.quality >= 95}
                onChange={() => showToast({ title: `${pack.id} submit updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
