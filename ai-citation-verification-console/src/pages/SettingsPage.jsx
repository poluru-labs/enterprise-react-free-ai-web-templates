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
    <div className="cite-page">
      <PageHeader
        title="Settings"
        description="Verification floors, publisher SLAs, and exports. Contact Leela Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={<Status label={`${theme === 'light' ? 'Light' : 'Dark'} theme`} variant="info" />}
      />

      <form
        className="cite-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaving(true);
          window.setTimeout(() => {
            setSaving(false);
            showToast({ title: 'Settings saved', variant: 'success' });
          }, 400);
        }}
      >
        <Input label="Org name" defaultValue="Poluru Research Studio" hint="Shown on exports" />
        <Input label="Desk owner" defaultValue="Nina Poluru" />
        <Select
          label="Publisher response SLA (days)"
          options={[
            { label: '28', value: '28' },
            { label: '14', value: '14' },
            { label: '7', value: '7' },
          ]}
          defaultValue="28"
        />
        <Textarea
          label="Export policy"
          defaultValue="Verified export needs Priya Poluru. Publisher hold changes need Nina Poluru. Bulk DOI fixes need Jonah Poluru."
        />
        <NumberInput label="Min confidence to auto-verify (%)" defaultValue={85} min={0} max={100} step={5} />
        <Slider label="Source uptime floor (%)" defaultValue={90} min={50} max={99} showValue />
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
        <Checkbox label="Block export below confidence floor" defaultChecked />
        <Switch label="Email Maya Poluru on escalated queue items" defaultChecked />
        <Switch label="Notify Priya Poluru when broken links spike" defaultChecked />
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
