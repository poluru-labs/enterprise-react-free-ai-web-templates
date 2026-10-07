import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import experiments from '../data/experiments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  paused: 'warning',
};

export default function ExperimentsPage() {
  return (
    <div className="lex-page">
      <PageHeader
        title="Experiments"
        description="Arms, traffic, and duration. Program owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Experiments' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Experiment created', variant: 'success' })}
          >
            New experiment
          </Button>
        }
      />

      <section className="lex-panel">
        <h2>Experiment lifecycle</h2>
        <Stepper steps={experiments.steps} current={2} />
      </section>

      <Accordion>
        {experiments.experiments.map((exp) => (
          <AccordionItem key={exp.id} heading={exp.name}>
            <div className="lex-flow-meta">
              <Status label={exp.status} variant={STATUS_MAP[exp.status]} pulse={exp.status === 'live'} />
              <Badge label={`${exp.arms} arms`} variant="brand" soft size="sm" />
              <span>{exp.owner}</span>
              <span>Updated {exp.updated}</span>
            </div>
            <p className="lex-copy">
              Primary metric and guardrails attached. Analysis window closes when power is met or
              Jonah Poluru calls stop.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
