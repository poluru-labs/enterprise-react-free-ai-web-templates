import { useMemo, useState } from 'react';
import { Badge, CodeSnippet, Search, Select, Stepper } from '@poluru-labs/enterprise-design-system-react';
import tracesData from '../data/traces.json';
import agentsData from '../data/agents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatDateTime, formatLatency, formatNumber } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Running', value: 'running' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed', value: 'failed' },
  { label: 'Looping', value: 'looping' },
  { label: 'Handed off', value: 'handed_off' },
  { label: 'Blocked', value: 'blocked' },
];

const AGENT_OPTIONS = [
  { label: 'All agents', value: 'all' },
  ...agentsData.agents.map((agent) => ({ label: agent.name, value: agent.name })),
];

const roleTone = {
  planner: 'neutral',
  tool: 'brand',
  guardrail: 'warning',
  agent: 'info',
};

export default function TracesPage() {
  const [status, setStatus] = useState('all');
  const [agent, setAgent] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(tracesData.traces[0]?.id);

  const rows = useMemo(() => {
    return tracesData.traces.filter((trace) => {
      const matchesStatus = status === 'all' || trace.status === status;
      const matchesAgent = agent === 'all' || trace.agentName === agent;
      const haystack = `${trace.id} ${trace.taskId} ${trace.agentName} ${trace.outcome}`.toLowerCase();
      return matchesStatus && matchesAgent && (!query || haystack.includes(query.toLowerCase()));
    });
  }, [status, agent, query]);

  const selected = rows.find((row) => row.id === selectedId) || rows[0] || tracesData.traces[0];
  const rawTrace = (selected?.steps || [])
    .map((step) => `[${step.time}] ${step.role.padEnd(10, ' ')} ${step.detail}`)
    .join('\n');

  return (
    <div className="amd-page">
      <PageHeader
        title="Execution traces"
        description="Step-by-step planner, tool, and guardrail spans for every agent task."
        crumbs={[BREADCRUMB_ROOT, { label: 'Traces' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard
            label="Traces today"
            value={formatNumber(tracesData.summary.tracesToday)}
            hint="One per started task"
            icon="bi-diagram-3"
            tone="brand"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Avg steps"
            value={tracesData.summary.avgSteps}
            hint="Planner + tool + guardrail"
            icon="bi-list-ol"
            tone="info"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="p95 latency"
            value={formatLatency(tracesData.summary.p95LatencyMs)}
            hint="End-to-end task time"
            icon="bi-stopwatch"
            tone="warning"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Error rate"
            value={`${tracesData.summary.errorRate}%`}
            hint={`${formatNumber(tracesData.summary.tokensToday)} tokens`}
            icon="bi-exclamation-octagon"
            tone="danger"
          />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search trace, task, agent, or outcome"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setStatus('all');
          setAgent('all');
          setQuery('');
        }}
      >
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
        <Select
          label="Agent"
          options={AGENT_OPTIONS}
          value={agent}
          onChange={(event) => setAgent(event.target.value)}
        />
      </FilterBar>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <ChartSection title={`${rows.length} traces`} subtitle="Select a row to inspect the span timeline">
            <DataTable
              rows={rows}
              onRowClick={(row) => setSelectedId(row.id)}
              rowClassName={(row) =>
                `${row.status === 'failed' || row.status === 'looping' ? 'is-severe' : ''} ${
                  row.id === selected?.id ? 'is-selected' : ''
                }`
              }
              columns={[
                { key: 'id', label: 'Trace', className: 'amd-mono' },
                { key: 'agentName', label: 'Agent' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} pulse={value === 'running' || value === 'looping'} />,
                },
                { key: 'taskId', label: 'Task', className: 'amd-mono' },
                {
                  key: 'durationMs',
                  label: 'Duration',
                  render: (value) => formatLatency(value),
                },
                {
                  key: 'costUsd',
                  label: 'Cost',
                  render: (value) => formatCurrency(value, 2),
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection
            title="Span timeline"
            subtitle={selected ? `${selected.id} · ${selected.model}` : 'Select a trace'}
            action={selected ? <StatusBadge status={selected.status} /> : null}
          >
            {selected ? (
              <div className="amd-trace">
                <p className="amd-drawer-lead">{selected.outcome}</p>
                <div className="amd-trace-meta amd-trace-meta-grid">
                  <div>
                    <span>Started</span>
                    <strong>{formatDateTime(selected.startedAt)}</strong>
                  </div>
                  <div>
                    <span>Tokens</span>
                    <strong>{formatNumber(selected.tokens)}</strong>
                  </div>
                  <div>
                    <span>Cost</span>
                    <strong>{formatCurrency(selected.costUsd, 2)}</strong>
                  </div>
                </div>
                <Stepper
                  orientation="vertical"
                  current={selected.steps.length - 1}
                  steps={selected.steps.map((step) => ({
                    label: step.role,
                    description: `${step.time} · ${step.detail}`,
                  }))}
                />
                <ul className="amd-trace-steps mt-3">
                  {selected.steps.map((step, index) => (
                    <li key={`${step.time}-${index}`}>
                      <Badge label={step.role} variant={roleTone[step.role] || 'neutral'} size="sm" soft />
                      <div>
                        <small>{step.time}</small>
                        <p>{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <CodeSnippet code={rawTrace} language="log" label="Raw spans" />
              </div>
            ) : null}
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
