import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import credit from '../data/credit.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  shadow: 'info',
};

export default function CreditPage() {
  return (
    <div className="frd-page">
      <PageHeader
        title="Credit models"
        description="Scores, challenger paths, and drift. Model risk: Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Credit' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Model registered', variant: 'success' })}
          >
            Register model
          </Button>
        }
      />

      <section className="frd-panel">
        <h2>Decision path</h2>
        <Stepper steps={credit.steps} current={3} />
      </section>

      <Accordion>
        {credit.models.map((model) => (
          <AccordionItem key={model.id} heading={model.name}>
            <div className="frd-flow-meta">
              <Status label={model.status} variant={STATUS_MAP[model.status]} />
              <Badge label={`PSI ${model.psi}`} variant={model.psi > 0.1 ? 'warning' : 'brand'} soft size="sm" />
              <span>{model.owner}</span>
              <span>Updated {model.updated}</span>
            </div>
            <p className="frd-copy">
              Champion and challenger traffic split in shadow until Elena Poluru signs validation.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
