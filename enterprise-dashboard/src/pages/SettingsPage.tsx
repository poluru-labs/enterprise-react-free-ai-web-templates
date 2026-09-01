import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Select,
  Switch,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import './pages.scss';

export function SettingsPage() {
  const { show } = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoAck, setAutoAck] = useState(false);
  const [capacityDigest, setCapacityDigest] = useState(true);
  const [maintWatch, setMaintWatch] = useState(true);
  const [compactSidebar, setCompactSidebar] = useState(false);

  const handleSave = () => {
    show({ title: 'Settings saved', variant: 'success' });
  };

  return (
    <div className="page">
      <p className="page-lead">
        Notification preferences and operational defaults for your data center workspace.
      </p>

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
            <Input
              label="Ops contact email"
              type="email"
              defaultValue="ops@polurulabs.com"
            />
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
            <Switch
              label="Email critical alerts"
              checked={emailAlerts}
              onChange={(_e, checked) => setEmailAlerts(checked)}
            />
            <Switch
              label="SMS for P1 incidents"
              checked={smsAlerts}
              onChange={(_e, checked) => setSmsAlerts(checked)}
            />
            <Switch
              label="Auto-acknowledge info alerts"
              checked={autoAck}
              onChange={(_e, checked) => setAutoAck(checked)}
            />
            <Switch
              label="Weekly capacity digest"
              checked={capacityDigest}
              onChange={(_e, checked) => setCapacityDigest(checked)}
            />
            <Switch
              label="Maintenance window watchers"
              checked={maintWatch}
              onChange={(_e, checked) => setMaintWatch(checked)}
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
              label="Prefer collapsed sidebar"
              checked={compactSidebar}
              onChange={(_e, checked) => setCompactSidebar(checked)}
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
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
        <Button variant="tertiary">Cancel</Button>
      </div>
    </div>
  );
}
