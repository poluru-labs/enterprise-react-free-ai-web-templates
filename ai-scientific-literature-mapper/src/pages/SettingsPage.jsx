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
    <div className="lit-page">
      <PageHeader
        title="Settings"
        description="Import rules, cluster policy, and notifications. Contact Leela Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="lit-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Library name" defaultValue="Poluru Research Library" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Nina Poluru" />
        <Select
          label="Curation task SLA (days)"
          options={[
            { label: '14', value: '14' },
            { label: '7', value: '7' },
            { label: '3', value: '3' },
          ]}
          defaultValue="7"
        />
        <Textarea
          label="Curation policy"
          defaultValue="Cluster merges need Maya Poluru. Broken DOI fixes need Nina Poluru. Citation disputes need Jonah Poluru."
        />
        <NumberInput label="Min mapping completeness (%)" defaultValue={90} min={0} max={100} step={5} />
        <Slider label="Max open tasks per curator" defaultValue={8} min={1} max={30} step={1} showValue />
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
        <Checkbox label="Auto-open curation when mapping below threshold" defaultChecked />
        <Switch label="Email Maya Poluru when cluster drift exceeds limit" defaultChecked />
        <Switch label="Notify Priya Poluru when open tasks exceed max" defaultChecked />
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
