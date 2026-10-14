import {
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Switch,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import explain from '../data/explain.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ExplainPage() {
  return (
    <div className="frd-page">
      <PageHeader
        title="Explainability"
        description="Reason codes, factors, and audit packs. Owner: Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Explain' }]}
      />

      <div className="frd-explain-hero">
        <article className="frd-panel frd-center">
          <p>Pack quality</p>
          <CircularProgress value={explain.score} max={100} size={140} showValue />
        </article>
        {explain.packs.map((pack) => (
          <article key={pack.id} className="frd-panel">
            <h3>{pack.name}</h3>
            <p className="frd-copy">
              {pack.owner} · retain {pack.ttl}
            </p>
            <ProgressBar value={pack.usage} max={100} label="Completeness" showValue />
            <Meter value={pack.quality} min={0} max={100} label="Reg readiness" showValue />
            <DescriptionList items={pack.fields} />
            <div className="frd-switch-row">
              <Switch
                label="Released to customer"
                defaultChecked={pack.quality >= 95}
                onChange={() => showToast({ title: `${pack.id} release updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>

      <section className="frd-panel">
        <h2>Recent exports</h2>
        <Timeline
          items={[
            {
              title: 'Decline pack · Maya Poluru',
              description: 'Jonah Poluru · mailed',
              timestamp: '12 Oct',
              status: 'complete',
            },
            {
              title: 'Limit decrease · Poluru Labs',
              description: 'Pending compliance',
              timestamp: '13 Oct',
              status: 'current',
            },
          ]}
        />
      </section>
    </div>
  );
}
