import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import collectionsData from '../data/collections.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function CollectionsPage() {
  return (
    <div className="rag-page">
      <PageHeader
        title="Collections"
        description="Topic clusters that retrieval prefers first. Chunk counts and owners stay on equal-height cards."
        crumbs={[BREADCRUMB_ROOT, { label: 'Collections' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'New collection draft opened', variant: 'info' })}>
            New collection
          </Button>
        }
      />

      <div className="row g-3">
        {collectionsData.collections.map((collection) => (
          <div className="col-12 col-md-6 col-xl-4" key={collection.id}>
            <article className="rag-content-card">
              <header>
                <h3>{collection.name}</h3>
                <StatusBadge status={collection.status} />
              </header>
              <p className="rag-content-metric">
                <strong>{formatNumber(collection.chunks)}</strong>
                <span>chunks · {formatNumber(collection.docs)} docs</span>
              </p>
              <p className="rag-content-note">{collection.description}</p>
              <footer>
                <span>{collection.owner}</span>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => showToast({ title: `${collection.name} pinned for retrieval`, variant: 'success' })}
                >
                  Prefer
                </Button>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
