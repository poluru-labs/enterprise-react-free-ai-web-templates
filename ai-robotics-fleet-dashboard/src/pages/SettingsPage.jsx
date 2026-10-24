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
    <div className="flt-page">
      <PageHeader
        title="Settings"
        description="Alert windows, SOC floors, and exports. Contact Victor Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="flt-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Org name" defaultValue="Poluru Logistics" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Victor Poluru" />
        <Select
          label="Default robot model"
          options={[
            { label: 'AMR-400', value: 'amr-400' },
            { label: 'AMR-220', value: 'amr-220' },
            { label: 'Fork-120', value: 'fork-120' },
          ]}
          defaultValue="amr-400"
        />
        <Textarea
          label="Dispatch policy"
          defaultValue="Missions need Rahul Poluru before dispatch. Maintenance needs Jonah Poluru. Battery swaps need Elena Poluru."
        />
        <NumberInput label="Min SOC for dispatch (%)" defaultValue={25} min={100} max={100} step={100} />
        <Slider label="Maintenance alert floor (%)" defaultValue={8} min={1} max={20} showValue />
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
        <Checkbox label="Block dispatch below SOC floor" defaultChecked />
        <Switch label="Email Elena Poluru on low fleet SOC" defaultChecked />
        <Switch label="Notify Jonah Poluru when faults spike" defaultChecked />
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
          label="Dispatch pin"
          length={4}
          type="password"
          onComplete={() => showToast({ title: 'Dispatch pin set', variant: 'success' })}
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
