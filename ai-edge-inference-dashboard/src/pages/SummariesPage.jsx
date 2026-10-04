import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import summaries from '../data/summaries.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  review: 'warning',
  draft: 'info',
};

export default function SummariesPage() {
  return (
    <div className="hco-page">
      <PageHeader
        title="Summaries"
        description="Visit notes, attestation, and handoff packs. Owner: Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Summaries' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Draft summary created', variant: 'success' })}
          >
            New summary
          </Button>
        }
      />

      <section className="hco-panel">
        <h2>Note path</h2>
        <Stepper steps={summaries.steps} current={2} />
      </section>

      <Accordion>
        {summaries.summaries.map((item) => (
          <AccordionItem key={item.id} heading={item.name}>
            <div className="hco-flow-meta">
              <Status label={item.status} variant={STATUS_MAP[item.status]} />
              <Badge label={`${item.sections} sections`} variant="neutral" soft size="sm" />
              <span>{item.owner}</span>
              <span>Updated {item.updated}</span>
            </div>
            <p className="hco-copy">
              Problem list, meds, and plan roll into the handoff pack. Attestation required before
              archive.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
