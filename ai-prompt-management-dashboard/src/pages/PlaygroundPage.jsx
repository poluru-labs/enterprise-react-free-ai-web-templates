import { useState } from 'react';
import {
  Button,
  NumberInput,
  Select,
  Slider,
  Spinner,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import playground from '../data/playground.json';
import settings from '../data/settings.json';
import prompts from '../data/prompts.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function PlaygroundPage() {
  const [model, setModel] = useState('gpt-4.1');
  const [systemPrompt, setSystemPrompt] = useState(prompts.items[0].body);
  const [temp, setTemp] = useState(3);
  const [tokens, setTokens] = useState(256);
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);

  function run() {
    setBusy(true);
    window.setTimeout(() => {
      setOutput(playground.completions[model] || playground.completions['gpt-4.1']);
      setBusy(false);
      showToast({
        title: 'Completion ready',
        description: `${model} · ${tokens} token budget · Sravani Poluru`,
        variant: 'success',
      });
    }, 420);
  }

  return (
    <div className="pmt-page">
      <PageHeader
        title="Playground"
        description="Draft against live prompts, inspect citations, and score grounded answers before release."
        crumbs={[BREADCRUMB_ROOT, { label: 'Playground' }]}
        actions={
          <Button size="sm" icon="star" onClick={run}>
            Generate
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="System prompt" subtitle="Templates from the bureau library">
            <div className="pmt-form-stack">
              <Select
                label="Model"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                options={settings.modelOptions}
              />
              <Select
                label="Start from"
                value={prompts.items.find((item) => item.body === systemPrompt)?.id || prompts.items[0].id}
                onChange={(event) => {
                  const next = prompts.items.find((item) => item.id === event.target.value);
                  if (next) setSystemPrompt(next.body);
                }}
                options={prompts.items.map((item) => ({ value: item.id, label: item.name }))}
              />
              <Textarea
                label="System prompt"
                rows={8}
                value={systemPrompt}
                onChange={(event) => setSystemPrompt(event.target.value)}
              />
              <Slider label="Temperature ×0.1" min={0} max={10} value={temp} showValue onChange={(_, value) => setTemp(value)} />
              <NumberInput label="Max tokens" min={32} max={1024} step={32} value={tokens} onChange={(_, value) => setTokens(value)} />
              <div className="pmt-generate">
                <Button icon="star" onClick={run}>Generate</Button>
                {busy ? <Spinner size="sm" showLabel label="Running" /> : null}
              </div>
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection
            title="Completion"
            subtitle={`${model} · mock grounded reply`}
            action={
              <Button
                size="sm"
                variant="secondary"
                icon="copy"
                onClick={() => showToast({ title: 'Copied', description: 'Reply is on the clipboard.', variant: 'info' })}
              >
                Copy
              </Button>
            }
          >
            <p className="pmt-preview" style={{ minHeight: 140 }}>
              {busy ? 'The bureau is drafting…' : (output || 'Run a prompt to see a mock completion.')}
            </p>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="Grounded hits" subtitle="Hybrid retrieval against the live catalog">
            {playground.hits.map((hit) => (
              <div className="pmt-query-hit" key={hit.query}>
                <div>
                  <strong>{hit.query}</strong>
                  <p className="pmt-subtle">{hit.hit} · {hit.citations} citations</p>
                </div>
                <StatusBadge status={hit.score} />
              </div>
            ))}
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
