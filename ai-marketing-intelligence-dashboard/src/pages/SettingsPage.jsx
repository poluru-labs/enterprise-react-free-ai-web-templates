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
    <div className="mid-page">
      <PageHeader
        title="Settings"
        description="Brand rules, exports, and alerts. Contact Avery Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="mid-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Org name" defaultValue="Poluru Growth org" />
        <Input label="Desk owner" defaultValue="Avery Poluru" />
        <Select
          label="Default attribution model"
          options={[
            { label: 'Data-driven', value: 'data' },
            { label: 'Linear', value: 'linear' },
            { label: 'First touch', value: 'first' },
          ]}
          defaultValue="data"
        />
        <Textarea
          label="Launch notes"
          defaultValue="UTM guardrails block campaigns with missing source tags. Priya Poluru approves hero copy."
        />
        <NumberInput label="ROAS alert threshold" defaultValue={3} min={1} max={10} step={0.1} />
        <Slider label="Weekly digest day" defaultValue={5} min={1} max={5} showValue />
        <RadioGroup
          label="Export format"
          name="export"
          defaultValue="pdf"
          options={[
            { label: 'PDF digest', value: 'pdf' },
            { label: 'CSV metrics', value: 'csv' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Require attribution sign-off before QBR" defaultChecked />
        <Switch label="Email Elena Poluru on budget drift" defaultChecked />
        <Switch label="Notify Rahul Poluru on model change" defaultChecked />
        <div>
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </div>
  );
}
