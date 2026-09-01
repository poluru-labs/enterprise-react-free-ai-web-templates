import { CircularProgress, Meter, ProgressBar } from '@poluru-labs/enterprise-design-system-react';
import clusters from '../data/clusters.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function ClustersPage() {
  return (
    <div className="kiln-page">
      <PageHeader
        title="Clusters"
        description="Elena, Luca, and Noor Poluru own regional GPU capacity"
        crumbs={[BREADCRUMB_ROOT, { label: 'Clusters' }]}
      />

      <div className="row g-3">
        {clusters.items.map((item) => (
          <div className="col-12 col-md-6 col-xl-3" key={item.id}>
            <article className="kiln-cluster-card">
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.util > 90 ? 'Hot' : 'Ready'} pulse={item.util > 90} />
              </header>
              <div className="kiln-cluster-hero">
                <CircularProgress value={item.util} showValue />
                <div>
                  <p className="kiln-note">{item.gpus}</p>
                  <p className="kiln-note">{item.owner}</p>
                </div>
              </div>
              <ProgressBar className="mt-3" label="Utilization" value={item.util} showValue />
              <Meter className="mt-3" label="Queue depth" value={item.queue} max={16} showValue />
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
