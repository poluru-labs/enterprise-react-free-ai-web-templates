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
    <div className="eod-page">
      <PageHeader
        title="Settings"
        description="Tariffs, alerts, and access. Contact Avery Poluru for org changes."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
      />

      <form
        className="eod-form"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({ title: 'Settings saved', variant: 'success' });
        }}
      >
        <Input label="Portfolio name" defaultValue="Poluru energy portfolio" />
        <Input label="Owner" defaultValue="Avery Poluru" />
        <Select
          label="Utility region"
          options={[
            { label: 'ERCOT', value: 'ercot' },
            { label: 'PJM', value: 'pjm' },
          ]}
          defaultValue="ercot"
        />
        <Textarea
          label="Notes"
          defaultValue="On-peak 14:00–20:00. Spike pages go to Sofia Poluru."
        />
        <NumberInput label="Carbon budget tCO₂e / month" defaultValue={1200} min={100} max={5000} />
        <Slider label="Peak shave target" defaultValue={12} min={0} max={30} showValue />
        <RadioGroup
          label="Tariff model"
          name="tariff"
          defaultValue="tou"
          options={[
            { label: 'Time of use', value: 'tou' },
            { label: 'Flat', value: 'flat' },
            { label: 'Demand charge', value: 'demand' },
          ]}
        />
        <Checkbox label="Auto-enroll demand response" defaultChecked />
        <Switch label="Email Elena Poluru on carbon budget breach" defaultChecked />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
