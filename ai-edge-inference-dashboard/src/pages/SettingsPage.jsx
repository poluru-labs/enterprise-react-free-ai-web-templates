import {
  Button,
  Checkbox,
  Input,
  NumberInput,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function SettingsPage() {
  return (
    <div className="hco-page">
      <PageHeader
        title="Settings"
        description="Network, retention, and alerts. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="hco-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Network name" defaultValue="North health system" />
        <Input label="Owner" defaultValue="Avery Poluru" />
        <Select
          label="Region"
          options={[
            { label: 'US East', value: 'use1' },
            { label: 'US West', value: 'usw2' },
          ]}
          defaultValue="use1"
        />
        <Textarea
          label="Notes"
          defaultValue="Quiet hours 22:00–06:00. Break-glass pages Sofia Poluru immediately."
        />
        <NumberInput label="Chart retention years" defaultValue={7} min={1} max={25} />
        <Slider label="Coding auto-submit floor" defaultValue={92} min={70} max={100} showValue />
        <RadioGroup
          label="Default attestation"
          name="attest"
          defaultValue="required"
          options={[
            { label: 'Required', value: 'required' },
            { label: 'Optional', value: 'optional' },
            { label: 'Deferred', value: 'deferred' },
          ]}
        />
        <Checkbox label="Require break-glass reason" defaultChecked />
        <Switch label="Email Jonah Poluru on privacy SLA breach" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
