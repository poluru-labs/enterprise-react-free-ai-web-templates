import { useState } from 'react';
import {
  Button,
  Card,
  DescriptionList,
  FileUpload,
  List,
  Select,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const REPORTS = [
  { id: 'vpat', label: 'VPAT export', owner: 'Jonah Poluru' },
  { id: 'exec', label: 'Executive summary', owner: 'Nina Poluru' },
  { id: 'contrast', label: 'Contrast failure pack', owner: 'Maya Poluru' },
];

export default function ReportsPage() {
  const [format, setFormat] = useState('pdf');

  return (
    <div className="acc-page">
      <PageHeader
        title="Reports"
        description="VPAT, executive summaries, and contrast packs for stakeholders."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reports' }]}
        actions={
          <Button
            size="sm"
            icon="download"
            onClick={() => showToast({ title: 'Report queued', description: 'Nina Poluru', variant: 'success' })}
          >
            Generate
          </Button>
        }
      />

      <div className="acc-stat-grid acc-stat-grid-3">
        {REPORTS.map((row) => (
          <Card key={row.id} className="acc-card">
            <h3>{row.label}</h3>
            <p className="acc-copy">Owner {row.owner}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => showToast({ title: `${row.label} queued`, variant: 'info' })}
            >
              Queue
            </Button>
          </Card>
        ))}
      </div>

      <section className="acc-panel">
        <Select
          label="Export format"
          value={format}
          onChange={setFormat}
          options={[
            { label: 'PDF', value: 'pdf' },
            { label: 'CSV', value: 'csv' },
            { label: 'JSON', value: 'json' },
          ]}
        />
        <DescriptionList
          compact
          items={[
            { term: 'Profile', description: 'WCAG 2.2 AA' },
            { term: 'Window', description: 'Last 30 days' },
            { term: 'Sign-off', description: 'Nina Poluru' },
          ]}
        />
        <List
          items={[
            { primary: 'Include open findings only', secondary: '47 rows' },
            { primary: 'Attach contrast screenshots', secondary: 'Maya Poluru' },
            { primary: 'Email Jonah Poluru when ready', secondary: 'Compliance archive' },
          ]}
        />
        <FileUpload
          label="Attach remediation evidence"
          accept=".pdf,image/png,image/jpeg"
          hint="Optional pack for audit trail."
          onChange={({ files }) => {
            const file = files?.[0];
            showToast({
              title: file ? `${file.name} attached` : 'File attached',
              variant: 'success',
            });
          }}
        />
      </section>
    </div>
  );
}
