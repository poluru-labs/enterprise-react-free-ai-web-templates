import { useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  FileUpload,
  Input,
  PinInput,
  RadioGroup,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

export default function SettingsPage() {
  const [digest, setDigest] = useState(true);
  const [redact, setRedact] = useState(true);
  const [compact, setCompact] = useState(false);
  const [env, setEnv] = useState('production');
  const [pin, setPin] = useState('');
  const [name, setName] = useState(settings.workspace.name);
  const [digestAt, setDigestAt] = useState('09:00');
  const [channels, setChannels] = useState(() =>
    Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])),
  );

  return (
    <div className="llm-page">
      <PageHeader
        title="Workspace settings"
        description="Keys, alerts, and team access for the Poluru LLM Ops control plane."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button size="sm" icon="save" onClick={() => showToast({ title: 'Saved', description: `Workspace defaults update at ${digestAt}.`, variant: 'success' })}>
            Save changes
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Workspace" subtitle="Production LLM ops tenant">
            <div className="llm-form-stack">
              <Input label="Workspace name" value={name} onChange={(event) => setName(event.target.value)} />
              <Input label="Alert email" defaultValue={SIGNED_IN_USER.email} />
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
            </div>
            <dl className="llm-settings-list mt-3">
              <div>
                <dt>Slug</dt>
                <dd className="llm-mono">{settings.workspace.slug}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{settings.workspace.region}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd className="llm-brand-swatch">
                  <i style={{ background: settings.workspace.brandColor }} />
                  {settings.workspace.brandColor}
                </dd>
              </div>
            </dl>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Team access" subtitle="People with access to this workspace">
            {settings.team.map((member) => (
              <div key={member.name} className="llm-member">
                <div className="llm-model-cell">
                  <Avatar name={member.name} size="sm" />
                  <strong>{member.name}</strong>
                </div>
                <span>{member.role}</span>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              icon="user"
              onClick={() => showToast({ title: 'Invite sent', description: 'Meera Poluru can join as viewer.', variant: 'info' })}
            >
              Invite
            </Button>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="API keys" subtitle="Rotate from Settings · never commit live keys">
            <ul className="llm-note-list">
              {settings.keys.map((key) => (
                <li key={key.id}>
                  <i className="bi bi-key" />
                  <div>
                    <strong className="llm-mono">{key.label}</strong>
                    <p className="mb-0">{key.owner} · {key.scope}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection title="Alert routing" subtitle="Toggle destinations. Changes stay in this browser session.">
            <div className="llm-settings-toggles">
              {settings.channels.map((channel) => (
                <Switch
                  key={channel.id}
                  label={channel.label}
                  checked={channels[channel.id]}
                  onChange={(_, checked) => {
                    setChannels((current) => ({ ...current, [channel.id]: checked }));
                    showToast({
                      title: checked ? 'Channel enabled' : 'Channel muted',
                      description: channel.label,
                      variant: 'info',
                    });
                  }}
                />
              ))}
            </div>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
