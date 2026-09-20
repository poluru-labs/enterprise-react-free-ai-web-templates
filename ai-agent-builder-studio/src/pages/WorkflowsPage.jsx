import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import workflows from '../data/workflows.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  draft: 'info',
  paused: 'warning',
};

export default function WorkflowsPage() {
  return (
    <div className="abs-page">
      <PageHeader
        title="Workflows"
        description="Compose steps, branches, and retries. Canvas owned by Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Workflows' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Blank flow created', variant: 'success' })}>
            New flow
          </Button>
        }
      />

      <section className="abs-panel">
        <h2>Release path</h2>
        <Stepper steps={workflows.steps} current={2} />
      </section>

      <Accordion>
        {workflows.flows.map((flow) => (
          <AccordionItem key={flow.id} heading={flow.name}>
            <div className="abs-flow-meta">
              <Status label={flow.status} variant={STATUS_MAP[flow.status]} />
              <Badge label={`${flow.steps} steps`} variant="neutral" soft size="sm" />
              <span>{flow.owner}</span>
              <span>Updated {flow.updated}</span>
            </div>
            <p className="abs-copy">
              Trigger, plan, act, eval. Retries use backoff. Dead letters go to Jonah Poluru.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
