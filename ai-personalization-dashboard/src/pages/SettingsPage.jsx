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
    <div className="per-page">
      <PageHeader
        title="Settings"
        description="Policies, holdouts, and alerts. Contact Avery Poluru for org-wide changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="per-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Org name" defaultValue="Poluru Product org" />
        <Input label="Desk owner" defaultValue="Avery Poluru" />
        <Select
          label="Default holdout"
          options={[
            { label: '5% random', value: '5' },
            { label: '10% random', value: '10' },
            { label: 'Matched geo', value: 'geo' },
          ]}
          defaultValue="5"
        />
        <Textarea
          label="Publish policy"
          defaultValue="Journeys require Rahul Poluru sign-off. Recommendation slots need Maya Poluru before prod."
        />
        <NumberInput label="Min segment size" defaultValue={500} min={100} max={50000} />
        <Slider label="Churn alert threshold (%)" defaultValue={12} min={5} max={25} showValue />
        <RadioGroup
          label="Digest format"
          name="digest"
          defaultValue="pdf"
          options={[
            { label: 'PDF', value: 'pdf' },
            { label: 'Slack summary', value: 'slack' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Block publish without holdout" defaultChecked />
        <Switch label="Email Elena Poluru on churn spike" defaultChecked />
        <Switch label="Notify Kavya Poluru on segment refresh" defaultChecked />
        <div>
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </div>
  );
}
