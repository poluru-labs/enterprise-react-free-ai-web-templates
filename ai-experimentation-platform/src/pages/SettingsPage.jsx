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
    <div className="lex-page">
      <PageHeader
        title="Settings"
        description="Workspace, traffic limits, and alerts. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="lex-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Workspace name" defaultValue="Poluru experiment program" />
        <Input label="Owner" defaultValue="Avery Poluru" />
        <Select
          label="Default environment"
          options={[
            { label: 'Staging', value: 'staging' },
            { label: 'Production', value: 'prod' },
          ]}
          defaultValue="staging"
        />
        <Textarea
          label="Notes"
          defaultValue="Max 50% traffic on new arms. Promotes require Sofia Poluru after canary."
        />
        <NumberInput label="Max concurrent experiments" defaultValue={20} min={1} max={100} />
        <Slider label="Default canary percent" defaultValue={10} min={1} max={50} showValue />
        <RadioGroup
          label="Analysis engine"
          name="engine"
          defaultValue="frequentist"
          options={[
            { label: 'Frequentist', value: 'frequentist' },
            { label: 'Bayesian', value: 'bayesian' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Auto-pause on guardrail fail" defaultChecked />
        <Switch label="Email Jonah Poluru on analysis complete" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
