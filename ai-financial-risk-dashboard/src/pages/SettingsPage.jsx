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
    <div className="frd-page">
      <PageHeader
        title="Settings"
        description="Limits, alerts, and access. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="frd-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Firm name" defaultValue="Poluru Financial" />
        <Input label="Owner" defaultValue="Avery Poluru" />
        <Select
          label="Regime"
          options={[
            { label: 'US retail', value: 'us_retail' },
            { label: 'US commercial', value: 'us_comm' },
          ]}
          defaultValue="us_retail"
        />
        <Textarea
          label="Notes"
          defaultValue="VaR breaches page Sofia Poluru. Explain packs need Jonah Poluru within 24h."
        />
        <NumberInput label="Fraud case SLA (hours)" defaultValue={8} min={1} max={72} />
        <Slider label="Portfolio limit buffer" defaultValue={90} min={70} max={100} showValue />
        <RadioGroup
          label="Explain export format"
          name="export"
          defaultValue="pdf"
          options={[
            { label: 'PDF', value: 'pdf' },
            { label: 'JSON', value: 'json' },
            { label: 'Both', value: 'both' },
          ]}
        />
        <Checkbox label="Require dual control on limit changes" defaultChecked />
        <Switch label="Email Elena Poluru on PSI breach" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
