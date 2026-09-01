import { useState } from 'react';
import {
  Avatar,
  Button,
  CodeSnippet,
  Input,
  Slider,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

export default function SettingsPage() {
  const [channels, setChannels] = useState(() =>
    Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])),
  );
  const [threshold, setThreshold] = useState(settings.workspace.passThreshold);
  const [webhook, setWebhook] = useState(settings.workspace.webhook);

  return (
    <div className="prism-page">
      <PageHeader
        title="Workspace settings"
        description="Webhook, team, and the pass threshold Meera Poluru enforces."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button
            size="sm"
            icon="save"
            onClick={() =>
              showToast({
                title: 'Settings saved',
                description: `Pass threshold is ${threshold}.`,
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
          <ChartSection title="Workspace" subtitle="Production Prism tenant">
            <dl className="prism-settings-list">
              <div>
                <dt>Name</dt>
                <dd>{settings.workspace.name}</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd className="prism-mono">{settings.workspace.slug}</dd>
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
                <dt>Signed in</dt>
                <dd>{SIGNED_IN_USER.name}</dd>
              </div>
              <div>
                <dt>Brand color</dt>
                <dd className="prism-brand-swatch">
                  <i style={{ background: settings.workspace.brandColor }} />
                  {settings.workspace.brandColor}
                </dd>
              </div>
            </dl>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Thresholds" subtitle="Auto-fail when a suite drops below the gate">
            <Slider
              label="Pass threshold"
              min={70}
              max={100}
              value={threshold}
              showValue
              onChange={(_, value) => setThreshold(value)}
            />
            <p className="prism-note">Lens auto-fails when PO recall drops below this line.</p>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Webhook" subtitle="Staging ingest for Meera Poluru’s key">
            <Input label="Endpoint" value={webhook} onChange={(event) => setWebhook(event.target.value)} />
            <div className="mt-3">
              <CodeSnippet
                code={settings.webhookSnippet}
                language="bash"
                onCopy={() =>
                  showToast({
                    title: 'Copied',
                    description: 'Prism submit command is on the clipboard.',
                    variant: 'info',
                  })
                }
              />
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Team" subtitle="Who owns the live suites">
            <ul className="prism-note-list">
              {settings.team.map((person) => (
                <li key={person.name}>
                  <Avatar name={person.name} size="sm" />
                  <div>
                    <strong>{person.name}</strong>
                    <p className="mb-0">
                      {person.role} · {person.shift}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              className="mt-3"
              size="sm"
              variant="secondary"
              icon="user"
              onClick={() =>
                showToast({
                  title: 'Invite sent',
                  description: 'Rohan Poluru can join as viewer.',
                  variant: 'info',
                })
              }
            >
              Invite
            </Button>
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Alert routing" subtitle="Toggle destinations. Changes stay in this browser session.">
        <div className="prism-settings-toggles">
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
