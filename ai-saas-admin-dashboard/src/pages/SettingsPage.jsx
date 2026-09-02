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
  const [dunning, setDunning] = useState(true);
  const [compact, setCompact] = useState(false);
  const [env, setEnv] = useState('production');
  const [pin, setPin] = useState('');
  const [name, setName] = useState(settings.workspace.name);
  const [digestAt, setDigestAt] = useState('08:30');
  const [channels, setChannels] = useState(() =>
    Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])),
  );

  return (
    <div className="nx-page">
      <PageHeader
        title="Workspace settings"
        description="Alerts, branding, and team access for the Nexus SaaS control plane."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button
            size="sm"
            icon="save"
            onClick={() =>
              showToast({
                title: 'Saved',
                description: `Workspace defaults update at ${digestAt}.`,
                variant: 'success',
              })
            }
          >
            Save changes
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Workspace" subtitle="Production Nexus tenant">
            <div className="nx-form-stack">
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
              <Switch
                label="Daily digest to Lakshmi Poluru"
                checked={digest}
                onChange={(_, checked) => setDigest(checked)}
              />
              {digest ? <TimePicker label="Digest time" value={digestAt} onChange={(_, value) => setDigestAt(value)} /> : null}
              <Switch
                label="Page on failed invoices"
                checked={dunning}
                onChange={(_, checked) => setDunning(checked)}
              />
              <Checkbox label="Compact tables" checked={compact} onChange={(_, checked) => setCompact(checked)} />
              <PinInput label="Rotate billing PIN" length={4} type="password" value={pin} onChange={setPin} />
              <FileUpload label="Upload logo" accept="image/*" />
            </div>
            <dl className="nx-settings-list mt-3">
              <div>
                <dt>Slug</dt>
                <dd className="nx-mono">{settings.workspace.slug}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{settings.workspace.region}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd className="nx-brand-swatch">
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
              <div key={member.name} className="nx-member">
                <div className="nx-model-cell">
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
              onClick={() => window.dispatchEvent(new Event('nx:invite'))}
            >
              Invite
            </Button>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="Alert routing" subtitle="Toggle destinations. Changes stay in this browser session.">
            <div className="nx-settings-toggles">
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
