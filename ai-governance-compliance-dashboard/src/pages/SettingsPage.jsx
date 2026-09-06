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
    <div className="gov-page">
      <PageHeader
        title="Settings"
        description={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <section className="gov-panel mb-3">
            <header className="gov-panel-header">
              <div>
                <h2>Workspace</h2>
                <p>Name, region, and retention for the Charter register.</p>
              </div>
            </header>
            <div className="gov-panel-body gov-form-stack">
              <Input label="Workspace name" value={workspace} onChange={(event) => setWorkspace(event.target.value)} />
              <Autocomplete
                label="Region"
                value={region}
                suggestions={['eu-central-1', 'us-east-1', 'us-west-2', 'ap-south-1']}
                onChange={setRegion}
              />
              <NumberInput
                label="Retention days"
                value={retention}
                min={30}
                max={365}
                onChange={(_, value) => setRetention(value)}
              />
              <TimePicker label="Daily digest" value={digest} onChange={(_, value) => setDigest(value)} />
              <Select
                label="Primary approver"
                defaultValue="kavya"
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

          <section className="gov-panel">
            <header className="gov-panel-header">
              <div>
                <h2>Evidence upload</h2>
                <p>Attach a policy pack. Files stay in the browser.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              <FileUpload
                label="Policy pack"
                multiple
                hint="PDF, DOCX, or zip"
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
          <section className="gov-panel mb-3">
            <header className="gov-panel-header">
              <div>
                <h2>Team</h2>
                <p>Named owners on this workspace.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              {settings.team.map((member) => (
                <div className="gov-control-row" key={member.name}>
                  <div className="gov-inline">
                    <Avatar name={member.name} size="sm" />
                    <div>
                      <strong>{member.name}</strong>
                      <div className="gov-subtle">{member.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="gov-panel">
            <header className="gov-panel-header">
              <div>
                <h2>Alerts</h2>
                <p>Where Charter sends expiry and review notices.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              {channels.map((channel) => (
                <div className="gov-control-row" key={channel.id}>
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
              <p className="gov-note">Theme color {settings.workspace.brandColor}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
