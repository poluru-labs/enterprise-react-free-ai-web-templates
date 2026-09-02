import { useState } from 'react';
import { Button, Card, Input, Select, Switch, useTheme, useToast } from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation';
import { PageHeader } from '../components/widgets/PageHeader';
import './pages.scss';

export function SettingsPage() {
  const { show } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoAck, setAutoAck] = useState(false);
  const [capacityDigest, setCapacityDigest] = useState(true);
  const [maintWatch, setMaintWatch] = useState(true);
  const [compactSidebar, setCompactSidebar] = useState(false);

  return (
    <div className="page">
      <PageHeader
        title="Settings"
        description="Notification preferences and operational defaults for your data center workspace."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <div className="settings-grid stagger">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Organization</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Input label="Workspace name" defaultValue="Poluru Data Centers" />
            <Input label="Signed-in operator" defaultValue={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`} readOnly />
            <Select
              label="Primary region"
              defaultValue="us-central"
              options={[
                { label: 'US Central', value: 'us-central' },
                { label: 'US East', value: 'us-east' },
                { label: 'US West', value: 'us-west' },
                { label: 'US South', value: 'us-south' },
              ]}
            />
            <Input label="Ops contact email" type="email" defaultValue="ops@polurulabs.com" />
            <Select
              label="Default landing page"
              defaultValue="overview"
              options={[
                { label: 'Overview', value: 'overview' },
                { label: 'Alerts', value: 'alerts' },
                { label: 'Tickets', value: 'tickets' },
                { label: 'Power & cooling', value: 'power' },
              ]}
            />
          </div>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Alerting</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Switch label="Email critical alerts" checked={emailAlerts} onChange={(_event, checked) => setEmailAlerts(checked)} />
            <Switch label="SMS for P1 incidents" checked={smsAlerts} onChange={(_event, checked) => setSmsAlerts(checked)} />
            <Switch
              label="Auto-acknowledge info alerts"
              checked={autoAck}
              onChange={(_event, checked) => setAutoAck(checked)}
            />
            <Switch
              label="Weekly capacity digest"
              checked={capacityDigest}
              onChange={(_event, checked) => setCapacityDigest(checked)}
            />
            <Switch
              label="Maintenance window watchers"
              checked={maintWatch}
              onChange={(_event, checked) => setMaintWatch(checked)}
            />
          </div>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Display</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Switch
              label="Dark theme"
              checked={theme === 'dark'}
              onChange={() => toggleTheme()}
            />
            <Switch
              label="Prefer collapsed sidebar"
              checked={compactSidebar}
              onChange={(_event, checked) => setCompactSidebar(checked)}
            />
            <Select
              label="Temperature units"
              defaultValue="c"
              options={[
                { label: 'Celsius', value: 'c' },
                { label: 'Fahrenheit', value: 'f' },
              ]}
            />
            <Select
              label="Power units"
              defaultValue="kw"
              options={[
                { label: 'Kilowatts', value: 'kw' },
                { label: 'Megawatts', value: 'mw' },
              ]}
            />
          </div>
        </Card>
      </div>

      <div className="settings-actions">
        <Button variant="primary" onClick={() => show({ title: 'Settings saved', variant: 'success' })}>
          Save changes
        </Button>
        <Button variant="tertiary">Cancel</Button>
      </div>
    </div>
  );
}
