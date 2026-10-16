import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import consensus from '../data/consensus.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  draft: 'info',
};

export default function ConsensusPage() {
  return (
    <div className="hil-page">
      <PageHeader
        title="Reviewer consensus"
        description="Agreement rates, tie-breaks, and dispute routing. Owned by Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Consensus' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Policy saved', variant: 'success' })}
          >
            New policy
          </Button>
        }
      />

      <section className="hil-panel">
        <h2>Review path</h2>
        <Stepper steps={consensus.steps} current={3} />
      </section>

      <Accordion>
        {consensus.scenarios.map((scn) => (
          <AccordionItem key={scn.id} heading={scn.name}>
            <div className="hil-flow-meta">
              <Status label={scn.status} variant={STATUS_MAP[scn.status]} pulse={scn.status === 'live'} />
              <Badge label={scn.delta} variant="brand" soft size="sm" />
              <span>{scn.owner}</span>
              <span>Updated {scn.updated}</span>
            </div>
            <p className="hil-copy">
              Majority vote applies when three reviewers align; otherwise routes to Elena Poluru for
              tie-break.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
