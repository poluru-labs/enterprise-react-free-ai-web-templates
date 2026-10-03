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
    <div className="dpd-page">
      <PageHeader
        title="Settings"
        description="Workspace, retention, and alerts. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="dpd-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Workspace name" defaultValue="North desk" />
        <Input label="Owner" defaultValue="Avery Poluru" />
        <Select
          label="Region"
          options={[
            { label: 'US East', value: 'use1' },
            { label: 'EU West', value: 'euw1' },
          ]}
          defaultValue="use1"
        />
        <Textarea
          label="Notes"
          defaultValue="Quiet hours 22:00–06:00. Exception pages go to Sofia Poluru."
        />
        <NumberInput label="Retention days" defaultValue={30} min={7} max={365} />
        <Slider label="Auto-release floor" defaultValue={95} min={70} max={100} showValue />
        <RadioGroup
          label="Export format"
          name="export"
          defaultValue="json"
          options={[
            { label: 'JSON', value: 'json' },
            { label: 'CSV', value: 'csv' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Require PO over $2,000" defaultChecked />
        <Switch label="Email Avery Poluru on SLA breach" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
