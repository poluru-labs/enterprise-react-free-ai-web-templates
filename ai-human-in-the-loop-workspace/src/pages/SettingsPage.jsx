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
    <div className="hil-page">
      <PageHeader
        title="Settings"
        description="Projects, export rules, and alerts. Contact Nina Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="hil-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Program name" defaultValue="Poluru labeling program" />
        <Input label="Owner" defaultValue="Nina Poluru" />
        <Select
          label="Default review depth"
          options={[
            { label: 'Single review', value: '1' },
            { label: 'Double blind', value: '2' },
            { label: 'Triple + consensus', value: '3' },
          ]}
          defaultValue="3"
        />
        <Textarea
          label="Notes"
          defaultValue="Export JSONL nightly. Disputes escalate to Elena Poluru after 2h idle."
        />
        <NumberInput label="Consensus quorum" defaultValue={3} min={2} max={5} />
        <Slider label="Min agreement (%)" defaultValue={90} min={70} max={100} showValue />
        <RadioGroup
          label="Export format"
          name="export"
          defaultValue="jsonl"
          options={[
            { label: 'JSONL', value: 'jsonl' },
            { label: 'Parquet', value: 'parquet' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Require calibration pass before export" defaultChecked />
        <Switch label="Email Jonah Poluru on gold failure" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
