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
    <div className="rq-page">
      <PageHeader
        title="Settings"
        description="Sampling rates, KPI targets, and review policy. Contact Leela Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="rq-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Program name" defaultValue="Poluru Retrieval Quality" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Nina Poluru" />
        <Select
          label="Default review SLA (days)"
          options={[
            { label: '7', value: '7' },
            { label: '3', value: '3' },
            { label: '1', value: '1' },
          ]}
          defaultValue="3"
        />
        <Textarea
          label="Review policy"
          defaultValue="Escalations need Nina Poluru. Corpus gaps need Maya Poluru. KPI target changes need Jonah Poluru."
        />
        <NumberInput label="Min precision@5 target" defaultValue={0.8} min={0} max={1} step={0.05} />
        <Slider label="Max open reviews per reviewer" defaultValue={8} min={1} max={30} step={1} showValue />
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
        <Checkbox label="Auto-queue failed queries for review" defaultChecked />
        <Switch label="Email Maya Poluru when corpus goes stale" defaultChecked />
        <Switch label="Notify Priya Poluru when open reviews exceed max" defaultChecked />
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
          onComplete={() => showToast({ title: 'Signing pin set', variant: 'success' })}
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
