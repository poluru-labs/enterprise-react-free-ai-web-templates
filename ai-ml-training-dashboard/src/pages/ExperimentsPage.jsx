import { Meter } from '@poluru-labs/enterprise-design-system-react';
import experiments from '../data/experiments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function ExperimentsPage() {
  return (
    <div className="kiln-page">
      <PageHeader
        title="Experiments"
        description="Harbor leads · Kavya Poluru owns the encoder track"
        crumbs={[BREADCRUMB_ROOT, { label: 'Experiments' }]}
      />

      <div className="row g-3">
        {experiments.items.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="kiln-experiment-card">
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.status} />
              </header>
              <p className="kiln-policy-metric">
                <strong>{item.best}</strong>
                <span>
                  {item.runs} runs · {item.owner}
                </span>
              </p>
              <Meter label="Best accuracy" value={Number.parseFloat(item.best)} showValue />
              <p className="kiln-policy-note">{item.note}</p>
              <footer>{item.owner}</footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
