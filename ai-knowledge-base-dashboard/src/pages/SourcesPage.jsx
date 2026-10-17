import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import sources from '../data/sources.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  draft: 'info',
};

export default function SourcesPage() {
  return (
    <div className="knb-page">
      <PageHeader
        title="Sources"
        description="Connected wikis, crawls, and feeds. Sync owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Sources' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Source connected', variant: 'success' })}
          >
            Connect source
          </Button>
        }
      />

      <section className="knb-panel">
        <h2>Ingest path</h2>
        <Stepper steps={sources.steps} current={2} />
      </section>

      <Accordion>
        {sources.scenarios.map((src) => (
          <AccordionItem key={src.id} heading={src.name}>
            <div className="knb-flow-meta">
              <Status label={src.status} variant={STATUS_MAP[src.status]} pulse={src.status === 'live'} />
              <Badge label={src.delta} variant="brand" soft size="sm" />
              <span>{src.owner}</span>
              <span>Updated {src.updated}</span>
            </div>
            <p className="knb-copy">
              Upstream diffs notify Marcus Poluru before articles auto-publish.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
