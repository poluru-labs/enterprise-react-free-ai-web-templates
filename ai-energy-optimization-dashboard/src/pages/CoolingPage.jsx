import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  Stepper,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import cooling from '../data/cooling.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  tune: 'warning',
};

export default function CoolingPage() {
  return (
    <div className="eod-page">
      <PageHeader
        title="Cooling"
        description="CRAC setpoints, delta-T, and free cooling. Owner: Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Cooling' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Zone added', variant: 'success' })}
          >
            Add zone
          </Button>
        }
      />

      <section className="eod-panel">
        <h2>Cooling path</h2>
        <Stepper steps={cooling.steps} current={3} />
      </section>

      <Accordion>
        {cooling.zones.map((zone) => (
          <AccordionItem key={zone.id} heading={zone.name}>
            <div className="eod-flow-meta">
              <Status label={zone.status} variant={STATUS_MAP[zone.status]} />
              <Badge label={`ΔT ${zone.deltaT}°C`} variant="brand" soft size="sm" />
              <span>{zone.owner}</span>
              <span>Updated {zone.updated}</span>
            </div>
            <p className="eod-copy">
              Economizer hours roll into PUE. Setpoint changes need Marcus Poluru sign-off above
              2°C.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
