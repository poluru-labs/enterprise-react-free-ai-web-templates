import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import classify from '../data/classify.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  watch: 'warning',
  draft: 'info',
};

export default function ClassifyPage() {
  return (
    <div className="dpd-page">
      <PageHeader
        title="Classify"
        description="Types, scores, and routing. Catalog owned by Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Classify' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Draft type created', variant: 'success' })}
          >
            Add type
          </Button>
        }
      />

      <Accordion>
        {classify.types.map((type) => (
          <AccordionItem key={type.id} heading={type.name}>
            <div className="dpd-flow-meta">
              <Status label={type.status} variant={STATUS_MAP[type.status]} />
              <Badge label={`${type.volume} today`} variant="neutral" soft size="sm" />
              <Badge
                label={`${Math.round(type.accuracy * 1000) / 10}%`}
                variant="brand"
                soft
                size="sm"
              />
              <span>{type.owner}</span>
            </div>
            <p className="dpd-copy">{type.note}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
