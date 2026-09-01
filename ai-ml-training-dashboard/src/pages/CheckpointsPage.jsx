import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link } from 'react-router-dom';
import checkpoints from '../data/checkpoints.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function CheckpointsPage() {
  return (
    <div className="kiln-page">
      <PageHeader
        title="Checkpoints"
        description="Epoch weights for Harbor, Oak, and Bright · promote into the registry"
        crumbs={[BREADCRUMB_ROOT, { label: 'Checkpoints' }]}
      />

      <div className="row g-3">
        {checkpoints.items.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="kiln-checkpoint-card">
              <header>
                <h3>
                  {item.run} · e{item.epoch}
                </h3>
                <StatusBadge status={item.status} />
              </header>
              <p className="kiln-policy-metric">
                <strong>{formatPercent(item.acc)}</strong>
                <span>
                  loss {item.loss} · {item.size}
                </span>
              </p>
              <p className="kiln-policy-note">
                {item.experiment} · {item.owner}
              </p>
              <footer>
                <Link className="kiln-text-link" to={`${BASE_PATH}/runs/${item.runId}`}>
                  Open run
                </Link>
                <Button
                  size="sm"
                  onClick={() =>
                    showToast({
                      title: 'Checkpoint promoted',
                      description: `${item.run} epoch ${item.epoch} is now a candidate for Kavya Poluru.`,
                      variant: 'success',
                    })
                  }
                >
                  Promote
                </Button>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
