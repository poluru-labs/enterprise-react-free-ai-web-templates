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
  const [weekend, setWeekend] = useState(true);
  const [compact, setCompact] = useState(false);
  const [hours, setHours] = useState('extended');
  const [pin, setPin] = useState('');
  const [name, setName] = useState(settings.workspace.name);
  const [digestAt, setDigestAt] = useState('08:00');
  const [channels, setChannels] = useState(() =>
    Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])),
  );

  return (
    <div className="desk-page">
      <PageHeader
        title="Settings"
        description="Routing, hours, and team access for the Relay support desk."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button
            size="sm"
            icon="save"
            onClick={() =>
              showToast({
                title: 'Saved',
                description: `Desk digest lands at ${digestAt}.`,
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
          <ChartSection title="Workspace" subtitle="Production Relay tenant">
            <div className="desk-form-stack">
              <Input label="Desk name" value={name} onChange={(event) => setName(event.target.value)} />
              <Input label="Lead email" defaultValue={SIGNED_IN_USER.email} />
              <RadioGroup
                label="Coverage"
                orientation="horizontal"
                value={hours}
                onChange={(_, value) => setHours(value)}
                options={[
                  { value: 'extended', label: '08:00–22:00 CT' },
                  { value: 'always', label: '24 / 7' },
                ]}
              />
              <Switch
                label="Morning digest to Meera Poluru"
                checked={digest}
                onChange={(_, checked) => setDigest(checked)}
              />
              {digest ? <TimePicker label="Digest time" value={digestAt} onChange={(_, value) => setDigestAt(value)} /> : null}
              <Switch
                label="Weekend coverage on health accounts"
                checked={weekend}
                onChange={(_, checked) => setWeekend(checked)}
              />
              <Checkbox label="Compact ticket tables" checked={compact} onChange={(_, checked) => setCompact(checked)} />
              <PinInput label="Rotate desk PIN" length={4} type="password" value={pin} onChange={setPin} />
              <FileUpload label="Upload desk mark" accept="image/*" />
            </div>
            <dl className="desk-settings-list mt-3">
              <div>
                <dt>Slug</dt>
                <dd className="desk-mono">{settings.workspace.slug}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{settings.workspace.region}</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{settings.workspace.hours}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd className="desk-brand-swatch">
                  <i style={{ background: settings.workspace.brandColor }} />
                  {settings.workspace.brandColor}
                </dd>
              </div>
            </dl>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Team" subtitle="People with a seat on this desk">
            {settings.team.map((member) => (
              <div key={member.name} className="desk-member">
                <div className="desk-model-cell">
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
              onClick={() => showToast({ title: 'Invite sent', description: 'Rohan already has a seat.', variant: 'info' })}
            >
              Invite
            </Button>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="API keys" subtitle="Rotate from Settings · never commit live keys">
            <ul className="desk-note-list">
              {settings.keys.map((key) => (
                <li key={key.id}>
                  <i className="bi bi-key" />
                  <div>
                    <strong className="desk-mono">{key.label}</strong>
                    <p className="mb-0">{key.owner} · {key.scope}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection title="Alert routing" subtitle="P1 pages Meera. Changes stay in this browser session.">
            <div className="desk-settings-toggles">
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
