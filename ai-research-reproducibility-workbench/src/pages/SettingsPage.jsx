import { useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  NumberInput,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Status,
  Switch,
  Textarea,
  TimePicker,
  setDensity,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function SettingsPage() {
  const { theme } = useTheme();
  const [digest, setDigest] = useState('pdf');
  const [windowStart, setWindowStart] = useState('08:00');
  const [compact, setCompact] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <div className="repro-page">
      <PageHeader
        title="Settings"
        description="Retention, parity thresholds, and notifications. Contact Leela Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="repro-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Lab name" defaultValue="Poluru Research Repro" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Nina Poluru" />
        <Select
          label="Repro verification SLA (days)"
          options={[
            { label: '14', value: '14' },
            { label: '7', value: '7' },
            { label: '3', value: '3' },
          ]}
          defaultValue="7"
        />
        <Textarea
          label="Repro policy"
          defaultValue="Environment pins need Maya Poluru. Artifact seal breaks need Nina Poluru. Gold study sign-off needs Jonah Poluru."
        />
        <NumberInput label="Max metric delta for verify (%)" defaultValue={1} min={0} max={10} step={0.1} />
        <Slider label="Max open reproductions per reviewer" defaultValue={6} min={1} max={20} step={1} showValue />
        <TimePicker
          label="Quiet hours start"
          value={windowStart}
          hint="Nina Poluru pauses alerts outside this window."
          onChange={(_, value) => setWindowStart(value)}
        />
        <RadioGroup label="Digest format" name="digest" value={digest} onChange={(_, value) => setDigest(value)}>
          <Radio label="PDF" value="pdf" />
          <Radio label="Slack summary" value="slack" />
          <Radio label="Both" value="both" />
        </RadioGroup>
        <Checkbox label="Block repro verify when artifact hash fails" defaultChecked />
        <Switch label="Email Maya Poluru when environment drifts" defaultChecked />
        <Switch label="Notify Priya Poluru when open repros exceed max" defaultChecked />
        <Switch
          label="Compact density"
          checked={compact}
          onChange={(_, checked) => {
            setCompact(checked);
            setDensity(checked ? 'compact' : 'comfortable');
            showToast({
              title: checked ? 'Compact density on' : 'Comfortable density on',
              variant: 'info',
            });
          }}
        />
        <PinInput
          label="Vault signing pin"
          length={4}
          type="password"
          onComplete={() => showToast({ title: 'Vault pin set', variant: 'success' })}
        />
        <div>
          <Button type="submit" icon="save" loading={saving}>
            Save settings
          </Button>
        </div>
      </form>
    </div>
  );
}
