import { useState } from 'react';
import {
  Autocomplete,
  Button,
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
import clusters from '../data/clusters.json';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

const clusterOptions = clusters.items.map((item) => ({ value: item.id, label: item.name }));

export default function SettingsPage() {
  const [channels, setChannels] = useState(() =>
    Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])),
  );
  const [compact, setCompact] = useState(false);
  const [density, setDensity] = useState('comfortable');
  const [pin, setPin] = useState('');
  const [buffer, setBuffer] = useState(settings.workspace.queueBufferMinutes);
  const [name, setName] = useState(SIGNED_IN_USER.name);
  const [owner, setOwner] = useState('Kavya Poluru');
  const [cluster, setCluster] = useState('c_west');

  return (
    <div className="kiln-page">
      <PageHeader
        title="Settings"
        description="Kavya Poluru’s Kiln defaults, team, and CLI ingest"
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button size="sm" icon="save" onClick={() => showToast({ title: 'Settings saved', variant: 'success' })}>
            Save changes
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Workspace" subtitle="Production GPU training tenant">
            <dl className="kiln-settings-list">
              <div>
                <dt>Name</dt>
                <dd>{settings.workspace.name}</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd className="kiln-mono">{settings.workspace.slug}</dd>
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
                <dt>Artifact retention</dt>
                <dd>{settings.workspace.retentionDays} days</dd>
              </div>
              <div>
                <dt>Brand color</dt>
                <dd className="kiln-brand-swatch">
                  <i style={{ background: settings.workspace.brandColor }} />
                  {settings.workspace.brandColor}
                </dd>
              </div>
            </dl>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Team" subtitle="Who owns the foundry this week">
            <ul className="kiln-note-list">
              {settings.team.map((person) => (
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

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="Profile" subtitle="Display name and default cluster">
            <div className="kiln-stack">
              <Input label="Display name" value={name} onChange={(event) => setName(event.target.value)} />
              <Autocomplete
                label="Default owner"
                value={owner}
                suggestions={settings.owners.map((item) => item.label)}
                onChange={setOwner}
              />
              <Combobox label="Preferred cluster" value={cluster} options={clusterOptions} onChange={setCluster} />
              <FileUpload label="Avatar" accept="image/*" hint="Square PNG" />
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection title="Preferences" subtitle="Alerts, density, and queue buffer">
            <div className="kiln-settings-toggles">
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
              <Checkbox
                label="Compact tables on reports"
                checked={compact}
                onChange={(_, checked) => setCompact(checked)}
              />
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
              <PinInput label="Workspace PIN" length={4} type="password" value={pin} onChange={setPin} />
              <Slider
                label="Queue buffer (minutes)"
                min={0}
                max={30}
                value={buffer}
                showValue
                onChange={(_, value) => setBuffer(value)}
              />
            </div>
          </ChartSection>
        </div>
      </div>

      <ChartSection title="CLI ingest" subtitle="Use Kavya Poluru’s key in staging only.">
        <CodeSnippet
          code={settings.webhookSnippet}
          language="bash"
          onCopy={() =>
            showToast({
              title: 'Copied',
              description: 'Kiln submit command is on the clipboard.',
              variant: 'info',
            })
          }
        />
      </ChartSection>
    </div>
  );
}
