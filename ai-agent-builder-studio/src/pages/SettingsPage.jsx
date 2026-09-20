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
    <div className="abs-page">
      <PageHeader
        title="Settings"
        description="Workspace, access, and defaults. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="abs-form"
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
        <Textarea label="Notes" defaultValue="Quiet hours 22:00–06:00. Changes go through Sofia Poluru." />
        <NumberInput label="Retention days" defaultValue={30} min={7} max={365} />
        <Slider label="Canary percent" defaultValue={10} min={0} max={50} showValue />
        <RadioGroup
          label="Default env"
          name="env"
          defaultValue="canary"
          options={[
            { label: 'Preview', value: 'preview' },
            { label: 'Canary', value: 'canary' },
            { label: 'Production', value: 'prod' },
          ]}
        />
        <Checkbox label="Require eval gate" defaultChecked />
        <Switch label="Email Avery Poluru on failed deploys" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
