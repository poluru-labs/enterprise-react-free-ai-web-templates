import { useMemo, useState } from 'react';
import { Select } from '@poluru-labs/enterprise-design-system-react';
import guardrails from '../data/guardrails.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber, formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const ACTION_OPTIONS = [
  { label: 'All actions', value: 'all' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Redacted', value: 'redacted' },
  { label: 'Warned', value: 'warned' },
];

export default function GuardrailsPage() {
  const [policyId, setPolicyId] = useState('all');
  const [action, setAction] = useState('all');

  const events = useMemo(() => {
    return guardrails.events.filter((event) => {
      const matchesPolicy = policyId === 'all' || event.policy === policyId;
      const matchesAction = action === 'all' || event.action === action;
      return matchesPolicy && matchesAction;
    });
  }, [policyId, action]);

  return (
    <div className="amd-page">
      <PageHeader
        title="Guardrails"
        description="Policy hits, blocks, redactions, and prompt-injection defenses across the fleet."
        crumbs={[BREADCRUMB_ROOT, { label: 'Guardrails' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard
            label="Policy events"
            value={formatNumber(guardrails.summary.eventsToday)}
            hint="Hits of any severity"
            icon="bi-shield-check"
            tone="brand"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Blocks today"
            value={formatNumber(guardrails.summary.blocksToday)}
            hint={`${formatPercent(guardrails.summary.blockRate)} of tasks`}
            icon="bi-slash-circle"
            tone="danger"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Top policy"
            value="Restricted"
            hint="Legal, finance, prod deploys"
            icon="bi-lock"
            tone="warning"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="False positives"
            value={guardrails.summary.falsePositives}
            hint="Operator-marked today"
            icon="bi-flag"
            tone="info"
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {guardrails.policies.map((policy) => (
          <div className="col-12 col-md-6 col-xl-4" key={policy.id}>
            <button
              type="button"
              className={`amd-reason-card ${policyId === policy.id ? 'is-active' : ''}`}
              onClick={() => setPolicyId(policyId === policy.id ? 'all' : policy.id)}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>{policy.name}</span>
                <SeverityBadge severity={policy.severity} />
              </div>
              <strong>{policy.blocks}</strong>
              <p>
                {policy.hits} hits · {policy.status}
              </p>
              <span className="amd-reason-bar" style={{ background: policy.color, width: `${Math.min(100, policy.hits)}%` }} />
            </button>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="Guardrail volume" subtitle="Blocks versus warned-but-allowed over 7 days">
            <AreaChart labels={guardrails.trend.labels} series={guardrails.trend.series} />
          </ChartSection>
        </div>
      </div>

      <FilterBar
        onReset={() => {
          setPolicyId('all');
          setAction('all');
        }}
      >
        <Select
          label="Action"
          options={ACTION_OPTIONS}
          value={action}
          onChange={(event) => setAction(event.target.value)}
        />
      </FilterBar>

      <ChartSection
        title={`${events.length} events`}
        subtitle={
          policyId === 'all'
            ? 'Click a policy card to isolate it'
            : guardrails.policies.find((item) => item.id === policyId)?.description
        }
      >
        <DataTable
          rows={events}
          rowClassName={(row) => (row.action === 'blocked' && row.severity === 'critical' ? 'is-severe' : '')}
          columns={[
            { key: 'id', label: 'Event', className: 'amd-mono' },
            {
              key: 'policy',
              label: 'Policy',
              render: (value) => value.replace(/_/g, ' '),
            },
            { key: 'agentName', label: 'Agent' },
            { key: 'taskId', label: 'Task', className: 'amd-mono' },
            {
              key: 'action',
              label: 'Action',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'severity',
              label: 'Severity',
              render: (value) => <SeverityBadge severity={value} />,
            },
            { key: 'detail', label: 'Detail' },
            {
              key: 'occurredAt',
              label: 'When',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
