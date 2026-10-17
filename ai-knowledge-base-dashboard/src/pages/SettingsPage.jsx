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
    <div className="knb-page">
      <PageHeader
        title="Settings"
        description="Collections, retention, and alerts. Contact Leila Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="knb-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Knowledge base name" defaultValue="Poluru product KB" />
        <Input label="Owner" defaultValue="Leila Poluru" />
        <Select
          label="Default collection"
          options={[
            { label: 'Product', value: 'product' },
            { label: 'Support', value: 'support' },
            { label: 'Legal', value: 'legal' },
          ]}
          defaultValue="product"
        />
        <Textarea
          label="Notes"
          defaultValue="Citations required on publish. Stale pages notify Jonah Poluru at 90 days."
        />
        <NumberInput label="Freshness review (days)" defaultValue={90} min={30} max={365} />
        <Slider label="Min cite coverage (%)" defaultValue={95} min={80} max={100} showValue />
        <RadioGroup
          label="Export format"
          name="export"
          defaultValue="md"
          options={[
            { label: 'Markdown', value: 'md' },
            { label: 'HTML', value: 'html' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Block publish without verified citation" defaultChecked />
        <Switch label="Email Elena Poluru daily gap summary" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
