import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  MenuItem,
  Meter,
  NumberInput,
  Select,
  Slider,
  Spinner,
  SplitButton,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import promptData from '../data/prompts.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { modelOptions } from '../lib/models.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

export default function PlaygroundPage() {
  const [model, setModel] = useState('aurora');
  const [prompt, setPrompt] = useState(promptData.templates[0]);
  const [temp, setTemp] = useState(3);
  const [tokens, setTokens] = useState(256);
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);

  function run(save) {
    setBusy(true);
    window.setTimeout(() => {
      setOutput('Meera Poluru — Harbor legal is 80% through the redline pack. We can still close $184k this quarter if we book 15 minutes before 17:00. Subrahmanyam Poluru will stay on the thread.');
      setBusy(false);
      showToast({
        title: save ? 'Saved to library' : 'Completion ready',
        description: save ? 'Draft kept under Aurora Chat.' : 'Aurora Chat · 94 tokens',
        variant: 'success',
      });
    }, 420);
  }

  useEffect(() => {
    const generate = () => run(false);
    window.addEventListener('llm:run-playground', generate);
    return () => window.removeEventListener('llm:run-playground', generate);
  }, []);

  return (
    <div className="llm-page">
      <PageHeader
        title="Playground"
        description="Draft against Aurora before you publish. Generate from the header command palette too."
        crumbs={[BREADCRUMB_ROOT, { label: 'Playground' }]}
        actions={
          <Button size="sm" icon="star" onClick={() => run(false)}>
            Generate
          </Button>
        }
      />

      <div className="row g-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="Prompt" subtitle="Templates from the Poluru library">
            <div className="llm-form-stack">
              <Select label="Model" value={model} onChange={(event) => setModel(event.target.value)} options={modelOptions} />
              <Autocomplete label="Start from a template" value={prompt} suggestions={promptData.templates} onChange={setPrompt} onSelect={setPrompt} />
              <Textarea label="Instructions" rows={8} value={prompt} onChange={(event) => setPrompt(event.target.value)} />
              <Slider label="Temperature ×0.1" min={0} max={10} value={temp} showValue onChange={(_, value) => setTemp(value)} />
              <NumberInput label="Max tokens" min={32} max={1024} step={32} value={tokens} onChange={(_, value) => setTokens(value)} />
              <div className="llm-generate">
                <SplitButton label="Generate" onClick={() => run(false)} onSelect={({ value }) => run(value === 'save')}>
                  <MenuItem value="save" label="Generate and save" />
                  <MenuItem value="copy" label="Generate only" />
                </SplitButton>
                {busy ? <Spinner size="sm" showLabel label="Running" /> : null}
              </div>
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection
            title="Completion"
            subtitle="Aurora Chat · us-east-1"
            action={
              <Button size="sm" variant="secondary" icon="copy" onClick={() => showToast({ title: 'Copied', description: 'Reply is on the clipboard.', variant: 'info' })}>
                Copy
              </Button>
            }
          >
            <Meter label="Token budget" value={output ? 94 : 0} max={tokens} showValue />
            <p className="llm-note" style={{ marginTop: 16, minHeight: 120 }}>
              {busy ? 'Aurora is drafting…' : (output || 'Run a prompt to see Aurora’s draft.')}
            </p>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
