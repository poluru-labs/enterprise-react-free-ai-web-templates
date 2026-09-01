import { useState } from 'react';
import { CodeSnippet, Switch, showToast } from '@poluru-labs/enterprise-design-system-react';
import guardrails from '../data/guardrails.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function GuardrailsPage() {
  const [enabled, setEnabled] = useState(() =>
    Object.fromEntries(guardrails.items.map((item) => [item.id, item.status !== 'Watch'])),
  );
  const live = Object.values(enabled).filter(Boolean).length;

  return (
    <div className="llm-page">
      <PageHeader
        title="Guardrails"
        description="PII redaction, jailbreak filters, and groundedness gates in front of Aurora and Atlas."
        crumbs={[BREADCRUMB_ROOT, { label: 'Guardrails' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Policies" value={guardrails.items.length} icon="bi-shield-check" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Enabled" value={live} icon="bi-lock" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Hits today" value={guardrails.items.reduce((sum, item) => sum + item.hits, 0)} icon="bi-lightning" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="On watch" value={guardrails.items.filter((item) => item.status === 'Watch').length} icon="bi-eye" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {guardrails.items.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="llm-guard-card">
              <header>
                <h3>{item.heading}</h3>
                <StatusBadge status={enabled[item.id] ? item.status : 'Paused'} />
              </header>
              <p className="llm-policy-metric">
                <strong>{item.hits}</strong>
                <span>hits today</span>
              </p>
              <p className="llm-policy-note">{item.children}</p>
              <footer>
                <span>{item.owner}</span>
                <Switch
                  label="On"
                  checked={enabled[item.id]}
                  onChange={(_, checked) => {
                    setEnabled((current) => ({ ...current, [item.id]: checked }));
                    showToast({
                      title: checked ? `${item.heading} on` : `${item.heading} paused`,
                      variant: 'info',
                    });
                  }}
                />
              </footer>
            </article>
          </div>
        ))}
      </div>

      <ChartSection title="Trace ingest" subtitle="Use Subrahmanyam Poluru’s live key in staging only">
        <CodeSnippet
          code={guardrails.webhookSnippet}
          language="http"
          onCopy={() => showToast({ title: 'Copied', description: 'Use Subrahmanyam Poluru’s live key in staging only.', variant: 'info' })}
        />
      </ChartSection>
    </div>
  );
}
