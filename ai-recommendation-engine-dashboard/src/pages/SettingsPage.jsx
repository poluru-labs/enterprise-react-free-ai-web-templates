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
    <div className="rec-page">
      <PageHeader
        title="Settings"
        description="Serving windows, guardrail floors, and exports. Contact Avery Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="rec-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Org name" defaultValue="Poluru Retail" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Avery Poluru" />
        <Select
          label="Default model"
          options={[
            { label: 'Ranker v4', value: 'ranker-v4' },
            { label: 'Two-tower', value: 'two-tower' },
            { label: 'Session bandit', value: 'bandit' },
          ]}
          defaultValue="ranker-v4"
        />
        <Textarea
          label="Publish policy"
          defaultValue="Slots need Maya Poluru before production. Experiments need Rahul Poluru. Coverage changes need Kavya Poluru."
        />
        <NumberInput label="Min impressions" defaultValue={1000} min={100} max={100000} step={100} />
        <Slider label="Guardrail floor (%)" defaultValue={8} min={1} max={20} showValue />
        <TimePicker
          label="Serving window opens"
          value={windowStart}
          hint="Nina Poluru pauses sends outside this window."
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
        <Checkbox label="Block publish without a holdout" defaultChecked />
        <Switch label="Email Elena Poluru on a conversion dip" defaultChecked />
        <Switch label="Notify Kavya Poluru when coverage drops" defaultChecked />
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
          label="Publish pin"
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
