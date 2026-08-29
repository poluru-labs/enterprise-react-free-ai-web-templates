import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Card,
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
import { modelOptions, promptTemplates } from '../data';

export default function PlaygroundPage() {
  const [model, setModel] = useState('aurora');
  const [prompt, setPrompt] = useState(promptTemplates[0]);
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
    <div className="llm-page-grid llm-page-grid-equal">
      <Card header="Prompt">
        <div className="llm-form-stack">
          <Select label="Model" value={model} onChange={(event) => setModel(event.target.value)} options={modelOptions} />
          <Autocomplete label="Start from a template" value={prompt} suggestions={promptTemplates} onChange={setPrompt} onSelect={setPrompt} />
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
      </Card>
      <Card header="Completion" footer={<Button size="sm" variant="secondary" icon="copy" onClick={() => showToast({ title: 'Copied', description: 'Reply is on the clipboard.', variant: 'info' })}>Copy</Button>}>
        <Meter label="Token budget" value={output ? 94 : 0} max={tokens} showValue />
        <p className="note" style={{ marginTop: 16, minHeight: 120 }}>{busy ? 'Aurora is drafting…' : (output || 'Run a prompt to see Aurora’s draft.')}</p>
      </Card>
    </div>
  );
}
