import { Link } from 'react-router-dom';
import { Badge, Rating } from '@poluru-labs/enterprise-design-system-react';
import models from '../data/models.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function ModelsPage() {
  return (
    <div className="kiln-page">
      <PageHeader
        title="Models"
        description="Candidates and production weights · Poluru Cloud"
        crumbs={[BREADCRUMB_ROOT, { label: 'Models' }]}
      />

      <div className="row g-3">
        {models.items.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="kiln-model-card">
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.stage} />
              </header>
              <dl className="kiln-settings-list">
                <div>
                  <dt>Owner</dt>
                  <dd>{item.owner}</dd>
                </div>
                <div>
                  <dt>Params</dt>
                  <dd>{item.params}</dd>
                </div>
                <div>
                  <dt>Accuracy</dt>
                  <dd>{item.acc}</dd>
                </div>
                <div>
                  <dt>Stage</dt>
                  <dd>{item.stage}</dd>
                </div>
              </dl>
              <footer>
                <Badge label={item.acc} variant="brand" pill />
                <Rating value={item.stage === 'Production' ? 5 : 4} readonly />
                <Link className="kiln-text-link" to={`${BASE_PATH}/runs`}>
                  Open runs
                </Link>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
