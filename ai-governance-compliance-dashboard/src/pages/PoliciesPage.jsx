import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  CodeSnippet,
  Switch,
  Tab,
  Tabs,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import policies from '../data/policies.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function PoliciesPage() {
  const [ack, setAck] = useState(true);
  const published = policies.filter((item) => item.status === 'Published');
  const drafts = policies.filter((item) => item.status !== 'Published');

  return (
    <div className="gov-page">
      <PageHeader
        title="Policies"
        description="Acceptable use, PII, human review, and EU AI Act mapping."
        crumbs={[BREADCRUMB_ROOT, { label: 'Policies' }]}
        actions={<Tag label={`${published.length} published`} variant="success" />}
      />

      <Tabs>
        <Tab label="Library">
          <Accordion single>
            {policies.map((policy, index) => (
              <AccordionItem key={policy.id} heading={`${policy.id} · ${policy.title}`} defaultOpen={index === 0}>
                <div className="gov-stack">
                  <div className="gov-inline">
                    <StatusBadge status={policy.status} />
                    <span className="gov-subtle">Owner {policy.owner}</span>
                    <span className="gov-subtle">Updated {policy.updated}</span>
                  </div>
                  <p className="gov-note">{policy.summary}</p>
                  <p className="gov-note">Applies to {policy.appliesTo}.</p>
                  <CodeSnippet label={policy.id} language="text" code={policy.body} />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </Tab>
        <Tab label="Drafts">
          {drafts.length === 0 ? (
            <p className="gov-note">No drafts in legal review.</p>
          ) : (
            drafts.map((policy) => (
              <article className="gov-tile mb-3" key={policy.id}>
                <header>
                  <h3>{policy.title}</h3>
                  <StatusBadge status={policy.status} />
                </header>
                <p className="gov-note">{policy.summary}</p>
                <footer>
                  <span className="gov-subtle">{policy.owner}</span>
                  <Tag label={policy.id} variant="warning" />
                </footer>
              </article>
            ))
          )}
        </Tab>
        <Tab label="Attestation">
          <Switch
            label="I attest that High and Critical systems follow POL-01 and POL-03"
            checked={ack}
            onChange={(_, checked) => setAck(checked)}
          />
          <p className="gov-note mt-3">
            {ack
              ? 'Kavya Poluru attested for this workspace.'
              : 'Attestation is required before the next quarterly review.'}
          </p>
        </Tab>
      </Tabs>
    </div>
  );
}
