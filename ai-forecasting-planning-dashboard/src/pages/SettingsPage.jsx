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
    <div className="fpl-page">
      <PageHeader
        title="Settings"
        description="Calendars, publish rules, and alerts. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="fpl-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Org name" defaultValue="Poluru planning org" />
        <Input label="Owner" defaultValue="Avery Poluru" />
        <Select
          label="Fiscal calendar"
          options={[
            { label: '4-4-5 retail', value: '445' },
            { label: 'Monthly', value: 'monthly' },
          ]}
          defaultValue="445"
        />
        <Textarea
          label="Notes"
          defaultValue="Publish lock 48h before S&OP. Overrides require Marcus Poluru on DC SKUs."
        />
        <NumberInput label="Default horizon (weeks)" defaultValue={13} min={4} max={52} />
        <Slider label="Default confidence (P)" defaultValue={80} min={50} max={95} showValue />
        <RadioGroup
          label="Export format"
          name="export"
          defaultValue="csv"
          options={[
            { label: 'CSV', value: 'csv' },
            { label: 'Parquet', value: 'parquet' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Require scenario sign-off before publish" defaultChecked />
        <Switch label="Email Sofia Poluru on publish lock" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
