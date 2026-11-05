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
    <div className="priv-page">
      <PageHeader
        title="Settings"
        description="k-thresholds, consent renewals, and export policy. Contact Leela Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="priv-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Org name" defaultValue="Poluru Privacy Program" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Nina Poluru" />
        <Select
          label="Default k-threshold"
          options={[
            { label: '50', value: '50' },
            { label: '25', value: '25' },
            { label: '100', value: '100' },
          ]}
          defaultValue="50"
        />
        <Textarea
          label="Export policy"
          defaultValue="Aggregate exports need Maya Poluru. Raw row access needs Nina Poluru. Board packs need Jonah Poluru."
        />
        <NumberInput label="Min subjects for publish" defaultValue={50} min={0} max={500} step={5} />
        <Slider label="Max flagged access events / day" defaultValue={10} min={1} max={50} step={1} showValue />
        <TimePicker
          label="Quiet hours start"
          value={windowStart}
          hint="Nina Poluru pauses alerts outside this window."
          onChange={(_, value) => setWindowStart(value)}
        />
        <RadioGroup
          label="Digest format"
          name="digest"
          value={digest}
          onChange={(_, value) => setDigest(value)}
        >
          <Radio label="PDF" value="pdf" />
          <Radio label="Slack summary" value="slack" />
          <Radio label="Both" value="both" />
        </RadioGroup>
        <Checkbox label="Suppress metrics below k-threshold" defaultChecked />
        <Switch label="Email Maya Poluru when catalog review is due" defaultChecked />
        <Switch label="Notify Priya Poluru when flagged access exceeds max" defaultChecked />
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
          label="Export signing pin"
          length={4}
          type="password"
          onComplete={() => showToast({ title: 'Publish pin set', variant: 'success' })}
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
