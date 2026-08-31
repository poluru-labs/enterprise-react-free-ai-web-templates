import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  CodeSnippet,
  DatePicker,
  Divider,
  Icon,
  Link,
  NumberInput,
  PinInput,
  Slider,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';

const samplePolicy = `{
  "owner": "Sravani Poluru",
  "citations": true,
  "canary": 0.1
}`;

export default function Settings() {
  const [hybrid, setHybrid] = useState(true);
  const [aclFreeze, setAclFreeze] = useState(true);
  const [chunkSize, setChunkSize] = useState(512);
  const [overlap, setOverlap] = useState(64);
  const [stripNav, setStripNav] = useState(true);
  const [purgeDate, setPurgeDate] = useState('2026-12-31');
  const [pin, setPin] = useState('');

  return (
    <>
      <section className="page-head">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Settings</h1>
          <p className="summary">Govern evals, canaries, and retention for Sravani Poluru’s prompt workspace.</p>
        </div>
      </section>

      <section className="stack">
        <Card elevated>
          <div className="card-body setting">
            <div>
              <h3>Hybrid retrieval in playground</h3>
              <p>Blend dense embeddings with BM25 and require citations on answers.</p>
            </div>
            <Switch label="Enabled" checked={hybrid} onChange={(_, checked) => setHybrid(checked)} />
          </div>
        </Card>
        <Card elevated>
          <div className="card-body setting">
            <div>
              <h3>Hold on review</h3>
              <p>Pause production routing when Venkata Poluru flags a prompt for access review.</p>
            </div>
            <Switch label="Enabled" checked={aclFreeze} onChange={(_, checked) => setAclFreeze(checked)} />
          </div>
        </Card>
        <Card elevated>
          <div className="card-body">
            <h3>Eval defaults</h3>
            <p className="meta">Applied to new prompt versions.</p>
            <Slider label="Sample size" min={50} max={500} step={25} value={chunkSize} showValue onChange={(_, value) => setChunkSize(value)} />
            <NumberInput label="Pass threshold" value={overlap} min={50} max={100} step={1} onChange={(_, value) => setOverlap(value)} />
            <Checkbox label="Fail the version if citations drop below 80%" checked={stripNav} onChange={(_, checked) => setStripNav(checked)} />
          </div>
        </Card>
        <Card elevated>
          <div className="card-body">
            <h3>Retention</h3>
            <DatePicker label="Purge drafts after" hint="Soft-deleted versions stay until this date" value={purgeDate} onChange={setPurgeDate} />
            <CodeSnippet code={samplePolicy} language="json" label="Release policy" />
            <Divider spacing="md" label="Admin" />
            <PinInput label="Confirm destructive actions" length={4} value={pin} onChange={setPin} />
            <p className="meta lock-note">
              <Icon name="lock" size="sm" decorative /> PIN is held by Sravani Poluru ·{' '}
              <Link href="https://polurulabs.com" external>Workspace docs</Link>
            </p>
            <div className="gap-top">
              <Button size="sm" onClick={() => showToast({ title: 'Settings saved', description: 'Eval defaults and retention updated for Sravani Poluru.', variant: 'success' })}>
                Save settings
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
