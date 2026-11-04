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
    <div className="bench-page">
      <PageHeader
        title="Settings"
        description="Latency floors, suite SLAs, and lab exports. Contact Leela Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="bench-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Org name" defaultValue="Poluru Benchmark Lab" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Nina Poluru" />
        <Select
          label="Suite completion SLA (minutes)"
          options={[
            { label: '28', value: '28' },
            { label: '14', value: '14' },
            { label: '7', value: '7' },
          ]}
          defaultValue="28"
        />
        <Textarea
          label="Export policy"
          defaultValue="Suite publish needs Priya Poluru. Host retirement needs Nina Poluru. Regression overrides need Jonah Poluru."
        />
        <NumberInput label="Max p99 latency (ms) before alert" defaultValue={35} min={5} max={500} step={5} />
        <Slider label="Min throughput floor (rps)" defaultValue={4000} min={500} max={15000} step={500} showValue />
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
        <Checkbox label="Block suite ship below throughput floor" defaultChecked />
        <Switch label="Email Maya Poluru on host maintenance" defaultChecked />
        <Switch label="Notify Priya Poluru when regression Δ exceeds threshold" defaultChecked />
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
