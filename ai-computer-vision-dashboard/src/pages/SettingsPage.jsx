import { useState } from 'react';
import { Button, Switch, showToast } from '@poluru-labs/enterprise-design-system-react';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

export default function SettingsPage() {
  const [channels, setChannels] = useState(() =>
    Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])),
  );

  return (
    <div className="cvd-page">
      <PageHeader
        title="Workspace settings"
        description="Sightline tenant, on-call rotation, and alert channels for vision ops."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button size="sm" onClick={() => showToast({ title: 'Settings saved', variant: 'success' })}>
            Save changes
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Workspace" subtitle="Production computer-vision tenant">
            <dl className="cvd-settings-list">
              <div>
                <dt>Name</dt>
                <dd>{settings.workspace.name}</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd className="cvd-mono">{settings.workspace.slug}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{settings.workspace.region}</dd>
              </div>
              <div>
                <dt>Timezone</dt>
                <dd>{settings.workspace.timezone}</dd>
              </div>
              <div>
                <dt>Incident retention</dt>
                <dd>{settings.workspace.retentionDays} days</dd>
              </div>
              <div>
                <dt>Frame retention</dt>
                <dd>{settings.workspace.frameRetentionHours} hours</dd>
              </div>
              <div>
                <dt>Brand color</dt>
                <dd className="cvd-brand-swatch">
                  <i style={{ background: settings.workspace.brandColor }} />
                  {settings.workspace.brandColor}
                </dd>
              </div>
            </dl>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="On-call" subtitle="Who owns cameras, PPE, and gate models">
            <ul className="cvd-note-list">
              {settings.oncall.map((person) => (
                <li key={person.name}>
                  <i className="bi bi-person-badge" />
                  <div>
                    <strong>{person.name}</strong>
                    <p className="mb-0">
                      {person.role} · {person.shift}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Alert channels" subtitle="Toggle destinations. Changes stay in this browser session.">
        <div className="cvd-settings-toggles">
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
  );
}
