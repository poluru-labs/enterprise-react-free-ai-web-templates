import { useState } from 'react';
import {
  Autocomplete,
  Card,
  Checkbox,
  CodeSnippet,
  Combobox,
  FileUpload,
  Input,
  PinInput,
  RadioGroup,
  Slider,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { clusterOptions, currentUser, ownerOptions, webhookSnippet } from '../data';

export default function Settings() {
  const [digest, setDigest] = useState(true);
  const [preempt, setPreempt] = useState(true);
  const [compact, setCompact] = useState(false);
  const [density, setDensity] = useState('comfortable');
  const [pin, setPin] = useState('');
  const [buffer, setBuffer] = useState(12);
  const [name, setName] = useState(currentUser.name);
  const [owner, setOwner] = useState('Kavya Poluru');
  const [cluster, setCluster] = useState('c_west');

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Workspace</span>
          <h1>Settings</h1>
          <p>Kavya Poluru’s Kiln defaults</p>
        </div>
      </header>
      <div className="grid-2">
        <div className="stack">
          <Card header="Profile">
            <div className="stack">
              <Input label="Display name" value={name} onChange={(event) => setName(event.target.value)} />
              <Autocomplete label="Default owner" value={owner} suggestions={ownerOptions.map((item) => item.label)} onChange={setOwner} />
              <Combobox label="Preferred cluster" value={cluster} options={clusterOptions} onChange={setCluster} />
              <FileUpload label="Avatar" accept="image/*" hint="Square PNG" />
            </div>
          </Card>
          <Card header="Alerts">
            <div className="stack">
              <Switch label="Daily digest to kavya.poluru@polurulabs.example" checked={digest} onChange={(_, checked) => setDigest(checked)} />
              <Switch label="Preempt queued jobs when Harbor needs GPUs" checked={preempt} onChange={(_, checked) => setPreempt(checked)} />
              <Checkbox label="Compact tables on reports" checked={compact} onChange={(_, checked) => setCompact(checked)} />
              <RadioGroup
                label="Density"
                orientation="horizontal"
                value={density}
                onChange={(_, value) => setDensity(value)}
                options={[
                  { value: 'comfortable', label: 'Comfortable' },
                  { value: 'compact', label: 'Compact' },
                ]}
              />
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card header="Security">
            <PinInput label="Workspace PIN" length={4} type="password" value={pin} onChange={setPin} />
            <Slider className="mt-3" label="Queue buffer (minutes)" min={0} max={30} value={buffer} showValue onChange={(_, value) => setBuffer(value)} />
          </Card>
          <Card header="CLI ingest" footer={<span className="note">Use Kavya Poluru’s key in staging only.</span>}>
            <CodeSnippet code={webhookSnippet} language="bash" onCopy={() => showToast({ title: 'Copied', description: 'Kiln submit command is on the clipboard.', variant: 'info' })} />
          </Card>
        </div>
      </div>
    </>
  );
}
