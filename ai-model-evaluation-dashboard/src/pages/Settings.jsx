import { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
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
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { currentUser, modelOptions, ownerOptions, team, webhookSnippet } from '../data';

export default function Settings() {
  const [digest, setDigest] = useState(true);
  const [autoFail, setAutoFail] = useState(true);
  const [compact, setCompact] = useState(false);
  const [density, setDensity] = useState('comfortable');
  const [pin, setPin] = useState('');
  const [threshold, setThreshold] = useState(90);
  const [name, setName] = useState(currentUser.name);
  const [owner, setOwner] = useState('Meera Poluru');
  const [model, setModel] = useState('aurora');
  const [digestAt, setDigestAt] = useState('09:00');

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Workspace</span>
          <h1>Settings</h1>
          <p>Meera Poluru’s Prism defaults</p>
        </div>
      </header>
      <div className="grid-2">
        <div className="stack">
          <Card header="Profile">
            <div className="stack">
              <Input label="Display name" value={name} onChange={(event) => setName(event.target.value)} />
              <Autocomplete label="Default owner" value={owner} suggestions={ownerOptions.map((item) => item.label)} onChange={setOwner} />
              <Combobox label="Preferred model" value={model} options={modelOptions} onChange={setModel} />
              <FileUpload label="Avatar" accept="image/*" hint="Square PNG" />
            </div>
          </Card>
          <Card header="Alerts">
            <div className="stack">
              <Switch label="Daily digest to meera.poluru@polurulabs.example" checked={digest} onChange={(_, checked) => setDigest(checked)} />
              {digest ? <TimePicker label="Digest time" value={digestAt} onChange={(_, value) => setDigestAt(value)} /> : null}
              <Switch label="Auto-fail Lens when PO recall drops below threshold" checked={autoFail} onChange={(_, checked) => setAutoFail(checked)} />
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
              <Button onClick={() => showToast({ title: 'Saved', description: `Workspace defaults update at ${digestAt}.`, variant: 'success' })}>Save changes</Button>
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card header="Security">
            <PinInput label="Workspace PIN" length={4} type="password" value={pin} onChange={setPin} />
            <Slider className="mt-3" label="Pass threshold" min={70} max={100} value={threshold} showValue onChange={(_, value) => setThreshold(value)} />
          </Card>
          <Card header="Team">
            {team.map((member) => (
              <div key={member.name} className="member">
                <div className="row">
                  <Avatar name={member.name} size="sm" />
                  <strong>{member.name}</strong>
                </div>
                <span className="muted">{member.role}</span>
              </div>
            ))}
            <Button size="sm" variant="secondary" icon="user" onClick={() => showToast({ title: 'Invite sent', description: 'Rohan Poluru can join as viewer.', variant: 'info' })}>Invite</Button>
          </Card>
          <Card header="CLI ingest" footer={<span className="note">Use Meera Poluru’s key in staging only.</span>}>
            <CodeSnippet code={webhookSnippet} language="bash" onCopy={() => showToast({ title: 'Copied', description: 'Prism submit command is on the clipboard.', variant: 'info' })} />
          </Card>
        </div>
      </div>
    </>
  );
}
