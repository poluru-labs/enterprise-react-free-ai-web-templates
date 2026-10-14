import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import scenarios from '../data/scenarios.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  draft: 'info',
};

export default function ScenariosPage() {
  return (
    <div className="fpl-page">
      <PageHeader
        title="Scenarios"
        description="Base, upside, and stress. S&OP owned by Priya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Scenarios' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Scenario created', variant: 'success' })}
          >
            New scenario
          </Button>
        }
      />

      <section className="fpl-panel">
        <h2>Planning path</h2>
        <Stepper steps={scenarios.steps} current={3} />
      </section>

      <Accordion>
        {scenarios.scenarios.map((scn) => (
          <AccordionItem key={scn.id} heading={scn.name}>
            <div className="fpl-flow-meta">
              <Status label={scn.status} variant={STATUS_MAP[scn.status]} pulse={scn.status === 'live'} />
              <Badge label={scn.delta} variant="brand" soft size="sm" />
              <span>{scn.owner}</span>
              <span>Updated {scn.updated}</span>
            </div>
            <p className="fpl-copy">
              Compare against base before Sofia Poluru locks publish for S&OP.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
