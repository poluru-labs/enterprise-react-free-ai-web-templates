import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  CodeSnippet,
  FileUpload,
  Input,
  PinInput,
  RadioGroup,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { currentUser, webhookSnippet } from '../data';

const team = [
  { name: 'Subrahmanyam Poluru', role: 'Owner' },
  { name: 'Kavya Poluru', role: 'Editor' },
  { name: 'Harini Poluru', role: 'Viewer' },
  { name: 'Madhav Poluru', role: 'Editor' },
];

export default function SettingsPage() {
  const [digest, setDigest] = useState(true);
  const [redact, setRedact] = useState(true);
  const [compact, setCompact] = useState(false);
  const [env, setEnv] = useState('production');
  const [pin, setPin] = useState('');
  const [name, setName] = useState('Poluru LLM Ops');
  const [digestAt, setDigestAt] = useState('09:00');

  return (
    <div className="llm-settings-grid">
      <Card padded>
        <div className="llm-card-heading" style={{ padding: 0, border: 0 }}>
          <div>
            <h2>Workspace settings</h2>
            <p>Default monitoring preferences</p>
          </div>
        </div>
        <div className="llm-form-stack">
          <Input label="Workspace name" value={name} onChange={(event) => setName(event.target.value)} />
          <Input label="Alert email" defaultValue={currentUser.email} />
          <RadioGroup
            label="Default environment"
            orientation="horizontal"
            value={env}
            onChange={(_, value) => setEnv(value)}
            options={[
              { value: 'production', label: 'Production' },
              { value: 'staging', label: 'Staging' },
            ]}
          />
          <Switch label="Daily digest to Subrahmanyam Poluru" checked={digest} onChange={(_, checked) => setDigest(checked)} />
          {digest ? <TimePicker label="Digest time" value={digestAt} onChange={(_, value) => setDigestAt(value)} /> : null}
          <Switch label="Redact PII in stored traces" checked={redact} onChange={(_, checked) => setRedact(checked)} />
          <Checkbox label="Compact tables" checked={compact} onChange={(_, checked) => setCompact(checked)} />
          <PinInput label="Rotate API PIN" length={4} type="password" value={pin} onChange={setPin} />
          <FileUpload label="Upload logo" accept="image/*" />
          <Button variant="primary" onClick={() => showToast({ title: 'Saved', description: `Workspace defaults update at ${digestAt}.`, variant: 'success' })}>Save changes</Button>
        </div>
      </Card>
      <div className="stack-gap">
        <Card padded>
          <div className="llm-card-heading" style={{ padding: 0, border: 0 }}>
            <div>
              <h2>Team access</h2>
              <p>People with access to this workspace</p>
            </div>
          </div>
          {team.map((member) => (
            <div key={member.name} className="llm-member">
              <div className="llm-model-cell">
                <Avatar name={member.name} size="sm" />
                <strong>{member.name}</strong>
              </div>
              <span>{member.role}</span>
            </div>
          ))}
          <Button variant="secondary" size="sm" icon="user" onClick={() => showToast({ title: 'Invite sent', description: 'Meera Poluru can join as viewer.', variant: 'info' })}>Invite</Button>
        </Card>
        <Card header="Trace ingest">
          <CodeSnippet code={webhookSnippet} language="http" onCopy={() => showToast({ title: 'Copied', description: 'Use Subrahmanyam Poluru’s live key in staging only.', variant: 'info' })} />
        </Card>
      </div>
    </div>
  );
}
