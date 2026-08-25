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
    <div className="amd-page">
      <PageHeader
        title="Workspace settings"
        description="Mock workspace, brand, retention, and alert routing for this template."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button
            size="sm"
            onClick={() => showToast({ title: 'Settings saved', variant: 'success' })}
          >
            Save changes
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Workspace" subtitle="Production monitoring tenant">
            <dl className="amd-settings-list">
              <div>
                <dt>Name</dt>
                <dd>{settings.workspace.name}</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd className="amd-mono">{settings.workspace.slug}</dd>
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
                <dt>Trace retention</dt>
                <dd>{settings.workspace.retentionDays} days</dd>
              </div>
              <div>
                <dt>Daily LLM budget</dt>
                <dd>${settings.workspace.dailyBudgetUsd.toLocaleString('en-US')}</dd>
              </div>
              <div>
                <dt>Brand color</dt>
                <dd className="amd-brand-swatch">
                  <i style={{ background: settings.workspace.brandColor }} />
                  {settings.workspace.brandColor}
                </dd>
              </div>
            </dl>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="On-call" subtitle="Who owns the live queue">
            <ul className="amd-note-list">
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

      <ChartSection title="Alert routing" subtitle="Toggle destinations. Changes stay in this browser session.">
        <div className="amd-settings-toggles">
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
