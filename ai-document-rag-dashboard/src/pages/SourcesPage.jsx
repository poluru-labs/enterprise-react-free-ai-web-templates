import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import sourcesData from '../data/sources.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SourcesPage() {
  return (
    <div className="rag-page">
      <PageHeader
        title="Sources"
        description="Connectors that feed the Contextly index. Last sync, document count, and health sit on equal-height cards."
        crumbs={[BREADCRUMB_ROOT, { label: 'Sources' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Connect source dialog opened', variant: 'info' })}>
            Add connector
          </Button>
        }
      />

      <div className="row g-3">
        {sourcesData.connectors.map((source) => (
          <div className="col-12 col-md-6 col-xl-4" key={source.id}>
            <article className="rag-content-card">
              <header>
                <span className={`rag-source-icon ${source.kind}`}>
                  <i className={`bi ${source.icon}`} aria-hidden="true" />
                </span>
                <StatusBadge status={source.health} />
              </header>
              <h3>{source.name}</h3>
              <p className="rag-content-metric">
                <strong>{formatNumber(source.docs)}</strong>
                <span>documents · last sync {source.lastSync}</span>
              </p>
              <p className="rag-content-note">{source.note}</p>
              <footer>
                <span>{source.owner}</span>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => showToast({ title: `${source.name} recrawl queued`, variant: 'success' })}
                >
                  Recrawl
                </Button>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
