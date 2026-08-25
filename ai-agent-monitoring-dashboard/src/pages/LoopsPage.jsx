import { useState } from 'react';
import { Alert, Badge, Button, CodeSnippet, showToast } from '@poluru-labs/enterprise-design-system-react';
import loopsData from '../data/loops.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  SeverityBadge,
  StatusBadge,
} from '../components/widgets/index.js';

export default function LoopsPage() {
  const [selectedId, setSelectedId] = useState(loopsData.loops[0]?.id);
  const selected = loopsData.loops.find((item) => item.id === selectedId) || loopsData.loops[0];
  const trace = (selected?.trace || [])
    .map((step) => `[${step.time}] ${step.role.padEnd(8, ' ')} ${step.detail}`)
    .join('\n');

  return (
    <div className="amd-page">
      <PageHeader
        title="Loop detection"
        description="Catch repeated planner steps and runaway tool cycles before they burn budget."
        crumbs={[BREADCRUMB_ROOT, { label: 'Loop Detection' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Active loops</span>
            <strong>{loopsData.summary.activeLoops}</strong>
          </article>
        </div>
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat tone-danger">
            <span>Severe</span>
            <strong>{loopsData.summary.severeLoops}</strong>
          </article>
        </div>
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Avg loop score</span>
            <strong>{loopsData.summary.avgLoopScore}</strong>
          </article>
        </div>
        <div className="col-6 col-xl-3">
          <article className="amd-mini-stat">
            <span>Mitigated today</span>
            <strong>{loopsData.summary.mitigatedToday}</strong>
          </article>
        </div>
      </div>

      <Alert
        variant="danger"
        title="Sentinel Ops is repeating canary health checks"
        message="LOOP-2204 has a score of 92 with 14 identical planner steps. Auto-pause is armed after 16 repeats."
      />

      <div className="row g-3 mt-1">
        <div className="col-12 col-xl-7">
          <ChartSection title="Suspected loops" subtitle="Select a row to inspect the execution trace">
            <DataTable
              rows={loopsData.loops}
              onRowClick={(row) => setSelectedId(row.id)}
              rowClassName={(row) =>
                `${row.severity === 'severe' ? 'is-severe' : ''} ${row.id === selectedId ? 'is-selected' : ''}`
              }
              columns={[
                { key: 'id', label: 'Loop', className: 'amd-mono' },
                { key: 'agentName', label: 'Agent' },
                {
                  key: 'loopScore',
                  label: 'Score',
                  render: (value, row) => (
                    <span className={`amd-score ${row.severity === 'severe' ? 'is-hot' : ''}`}>{value}</span>
                  ),
                },
                { key: 'repeatedStepCount', label: 'Repeats' },
                {
                  key: 'firstDetected',
                  label: 'First detected',
                  render: (value) => formatDateTime(value),
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} pulse={value === 'active'} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection
            title="Execution trace"
            subtitle={selected ? `${selected.id} · ${selected.pattern}` : 'Select a loop'}
            action={selected ? <SeverityBadge severity={selected.severity} /> : null}
          >
            {selected ? (
              <div className="amd-trace">
                <div className="amd-trace-meta">
                  <div>
                    <span>Agent</span>
                    <strong>{selected.agentName}</strong>
                  </div>
                  <div>
                    <span>Repeated step</span>
                    <strong className="amd-mono">{selected.repeatedStep}</strong>
                  </div>
                  <div>
                    <span>Task</span>
                    <strong className="amd-mono">{selected.taskId}</strong>
                  </div>
                </div>
                <ul className="amd-trace-steps">
                  {selected.trace.map((step, index) => (
                    <li key={`${step.time}-${index}`}>
                      <Badge label={step.role} variant={step.role === 'tool' ? 'brand' : 'neutral'} size="sm" soft />
                      <div>
                        <small>{step.time}</small>
                        <p>{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <CodeSnippet code={trace} language="log" label="Raw trace" />
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      showToast({
                        title: `${selected.agentName} paused`,
                        description: `${selected.id} is held until an operator resumes it.`,
                        variant: 'warning',
                      })
                    }
                  >
                    Pause agent
                  </Button>
                </div>
              </div>
            ) : null}
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
