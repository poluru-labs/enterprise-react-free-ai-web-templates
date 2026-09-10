import { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Divider,
  FileUpload,
  Input,
  NumberInput,
  RadioGroup,
  Select,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { PageHeader } from '../components/widgets/index.js';

export default function SettingsPage() {
  const [workspace, setWorkspace] = useState(settings.workspace.name);
  const [region, setRegion] = useState(settings.workspace.region);
  const [retention, setRetention] = useState(settings.workspace.retentionDays);
  const [digest, setDigest] = useState('08:00');
  const [channels, setChannels] = useState(settings.channels);
  const [access, setAccess] = useState('owner');

  return (
    <div className="mq-page">
      <PageHeader
        title="Settings"
        description={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <section className="mq-panel mb-3">
            <header className="mq-panel-header">
              <div>
                <h2>Workspace</h2>
                <p>Name, region, and retention for the Marquee desk.</p>
              </div>
            </header>
            <div className="mq-panel-body mq-form-stack">
              <Input label="Workspace name" value={workspace} onChange={(event) => setWorkspace(event.target.value)} />
              <Autocomplete
                label="Region"
                value={region}
                suggestions={['us-east-1', 'us-west-2', 'eu-central-1', 'ap-south-1']}
                onChange={setRegion}
              />
              <NumberInput
                label="Audience retention days"
                value={retention}
                min={7}
                max={365}
                onChange={(_, value) => setRetention(value)}
              />
              <TimePicker label="Daily digest" value={digest} onChange={(_, value) => setDigest(value)} />
              <Select
                label="Primary owner"
                defaultValue="subbu"
                options={settings.ownerOptions}
              />
              <RadioGroup
                label="Default access"
                name="access"
                value={access}
                orientation="horizontal"
                onChange={(_, value) => setAccess(value)}
                options={[
                  { value: 'owner', label: 'Owner only' },
                  { value: 'editors', label: 'Editors' },
                  { value: 'all', label: 'All members' },
                ]}
              />
            </div>
          </section>

          <section className="mq-panel">
            <header className="mq-panel-header">
              <div>
                <h2>Brand pack</h2>
                <p>Attach a creative kit. Files stay in the browser.</p>
              </div>
            </header>
            <div className="mq-panel-body">
              <FileUpload
                label="Creative kit"
                multiple
                hint="ZIP, PNG, or PDF"
                onChange={({ files }) =>
                  showToast({
                    title: 'Attached',
                    description: `${files.length} file${files.length === 1 ? '' : 's'}`,
                    variant: 'info',
                  })
                }
              />
            </div>
          </section>
        </div>

        <div className="col-12 col-xl-5">
          <section className="mq-panel mb-3">
            <header className="mq-panel-header">
              <div>
                <h2>Team</h2>
                <p>Named owners on this workspace.</p>
              </div>
            </header>
            <div className="mq-panel-body">
              {settings.team.map((member) => (
                <div className="mq-control-row" key={member.name}>
                  <div className="mq-inline">
                    <Avatar name={member.name} size="sm" />
                    <div>
                      <strong>{member.name}</strong>
                      <div className="mq-subtle">{member.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mq-panel">
            <header className="mq-panel-header">
              <div>
                <h2>Alerts</h2>
                <p>Where Marquee sends holds and CPC notices.</p>
              </div>
            </header>
            <div className="mq-panel-body">
              {channels.map((channel) => (
                <div className="mq-control-row" key={channel.id}>
                  <span>{channel.label}</span>
                  <Switch
                    checked={channel.enabled}
                    onChange={(_, checked) =>
                      setChannels((current) =>
                        current.map((row) => (row.id === channel.id ? { ...row, enabled: checked } : row)),
                      )
                    }
                  />
                </div>
              ))}
              <Divider label="Brand" />
              <p className="mq-note">Theme color {settings.workspace.brandColor}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
