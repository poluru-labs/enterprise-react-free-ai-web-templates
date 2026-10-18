import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import obligations from '../data/obligations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  draft: 'info',
};

export default function ObligationsPage() {
  return (
    <div className="lci-page">
      <PageHeader
        title="Obligations"
        description="Renewals, notices, filings, and owners. Ledger owned by Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Obligations' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Obligation added', variant: 'success' })}
          >
            Add obligation
          </Button>
        }
      />

      <section className="lci-panel">
        <h2>Obligation lifecycle</h2>
        <Stepper steps={obligations.steps} current={2} />
      </section>

      <Accordion>
        {obligations.scenarios.map((obl) => (
          <AccordionItem key={obl.id} heading={obl.name}>
            <div className="lci-flow-meta">
              <Status label={obl.status} variant={STATUS_MAP[obl.status]} pulse={obl.status === 'live'} />
              <Badge label={obl.delta} variant="brand" soft size="sm" />
              <span>{obl.owner}</span>
              <span>Updated {obl.updated}</span>
            </div>
            <p className="lci-copy">
              Reminders route to the contract owner; overdue items page Adira Poluru on business
              days.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
