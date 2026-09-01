import { useMemo, useState } from 'react';
import { ProgressBar, Select } from '@poluru-labs/enterprise-design-system-react';
import automation from '../data/automation.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber, formatPercent } from '../lib/format.js';
import { statusLabel } from '../lib/status.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const TYPE_OPTIONS = [
  { label: 'All types', value: 'all' },
  { label: 'Regex', value: 'regex' },
  { label: 'Classifier', value: 'classifier' },
  { label: 'Hash match', value: 'hash_match' },
];

export default function AutomationPage() {
  const [type, setType] = useState('all');

  const rows = useMemo(
    () => automation.rules.filter((rule) => type === 'all' || rule.type === type),
    [type],
  );

  return (
    <div className="cmb-page">
      <PageHeader
        title="Automation"
        description="Regex packs, classifiers, and hash matches that take the first pass before a human."
        crumbs={[BREADCRUMB_ROOT, { label: 'Automation' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Rules" value={automation.summary.rules} icon="bi-cpu" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Hits today" value={formatNumber(automation.summary.hitsToday)} icon="bi-lightning" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Auto actions" value={formatNumber(automation.summary.autoActions)} icon="bi-check2-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Shadow share" value={`${automation.summary.shadowShare}%`} hint="Not yet enforcing" icon="bi-eye" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {automation.rules.slice(0, 4).map((rule) => (
          <div className="col-12 col-md-6 col-xl-3" key={rule.id}>
            <article className="cmb-rule-card">
              <header>
                <span className="cmb-subtle">{statusLabel(rule.type)}</span>
                <StatusBadge status={rule.status} />
              </header>
              <h3>{rule.name}</h3>
              <p>
                {formatNumber(rule.hitsToday)} hits · {formatNumber(rule.actions)} actions
              </p>
              <ProgressBar label="Precision" value={rule.precision} showValue />
            </article>
          </div>
        ))}
      </div>

      <FilterBar onReset={() => setType('all')}>
        <Select label="Type" options={TYPE_OPTIONS} value={type} onChange={(event) => setType(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} rules`} subtitle="Hit counts from the last 24 hours">
        <DataTable
          rows={rows}
          columns={[
            { key: 'id', label: 'Rule', className: 'cmb-mono' },
            { key: 'name', label: 'Name' },
            {
              key: 'type',
              label: 'Type',
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'policy', label: 'Policy' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'hitsToday',
              label: 'Hits',
              render: (value) => formatNumber(value),
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (value) => formatNumber(value),
            },
            {
              key: 'precision',
              label: 'Precision',
              render: (value) => formatPercent(value),
            },
            { key: 'owner', label: 'Owner' },
            {
              key: 'updatedAt',
              label: 'Updated',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
