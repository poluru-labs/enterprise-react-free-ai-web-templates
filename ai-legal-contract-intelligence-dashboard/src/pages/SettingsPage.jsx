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
    <div className="lci-page">
      <PageHeader
        title="Settings"
        description="Playbooks, retention, and alerts. Contact Adira Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="lci-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Legal program name" defaultValue="Poluru commercial contracts" />
        <Input label="Owner" defaultValue="Adira Poluru" />
        <Select
          label="Default playbook"
          options={[
            { label: 'Commercial MSA', value: 'msa' },
            { label: 'Vendor SOW', value: 'sow' },
            { label: 'NDA / DPA', value: 'nda' },
          ]}
          defaultValue="msa"
        />
        <Textarea
          label="Notes"
          defaultValue="Non-standard indemnity requires Elena Poluru review. Renewals notify Jonah Poluru at 90 days."
        />
        <NumberInput label="Review SLA (days)" defaultValue={7} min={1} max={30} />
        <Slider label="Playbook match threshold (%)" defaultValue={85} min={70} max={100} showValue />
        <RadioGroup
          label="Export format"
          name="export"
          defaultValue="pdf"
          options={[
            { label: 'PDF pack', value: 'pdf' },
            { label: 'DOCX redlines', value: 'docx' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Block execute without signed review" defaultChecked />
        <Switch label="Email Elena Poluru when SLA breached" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
