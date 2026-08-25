import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import handoffs from '../data/handoffs.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber, formatPercent } from '../lib/format.js';
import { HorizontalBarChart } from '../components/charts/BarChart.jsx';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  PriorityBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'Resolved', value: 'resolved' },
];

export default function HandoffsPage() {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    return handoffs.cases.filter((item) => {
      const matchesStatus = status === 'all' || item.status === status;
      const haystack = `${item.id} ${item.agentName} ${item.reason} ${item.assignedHuman}`.toLowerCase();
      return matchesStatus && (!query || haystack.includes(query.toLowerCase()));
    });
  }, [status, query]);

  return (
    <div className="amd-page">
      <PageHeader
        title="Human handoffs"
        description="When agents defer to people: rate, wait time, and open cases."
        crumbs={[BREADCRUMB_ROOT, { label: 'Handoffs' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Total handoffs"
            value={formatNumber(handoffs.kpis.totalHandoffs)}
            hint="Last 24 hours"
            icon="bi-people"
            tone="warning"
            trend="up"
            trendValue="+8"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Handoff rate"
            value={formatPercent(handoffs.kpis.handoffRate)}
            hint="Share of completed tasks"
            icon="bi-signpost-split"
            tone="info"
            trend="up"
            trendValue="+0.8 pts"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Avg resolution time"
            value={`${handoffs.kpis.avgResolutionMinutes}m`}
            hint="Human time to close"
            icon="bi-stopwatch"
            tone="brand"
            trend="down"
            trendValue="-4m"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Open cases"
            value={handoffs.kpis.openCases}
            hint={`${handoffs.kpis.slaBreaches} SLA breaches`}
            icon="bi-inbox"
            tone="danger"
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Handoff reasons" subtitle="Why work left the autonomous path">
            <HorizontalBarChart items={handoffs.reasonBreakdown} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection title="Queue notes" subtitle="Operator load is concentrated on legal and ops">
            <ul className="amd-note-list">
              <li>
                <i className="bi bi-shield-exclamation" />
                Restricted-action handoffs from Quill Legal need counsel within 30 minutes.
              </li>
              <li>
                <i className="bi bi-lightning-charge" />
                Sentinel Ops has a critical pending case tied to the payments canary.
              </li>
              <li>
                <i className="bi bi-person-check" />
                Priya Poluru and Elena Poluru own 5 of the 18 open cases.
              </li>
            </ul>
          </ChartSection>
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search case, agent, or assignee"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setStatus('all');
          setQuery('');
        }}
      >
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </FilterBar>

      <ChartSection title="Handoff cases" subtitle="Current human takeover queue">
        <DataTable
          rows={rows}
          columns={[
            { key: 'id', label: 'Case', className: 'amd-mono' },
            { key: 'agentName', label: 'Agent' },
            { key: 'reason', label: 'Reason' },
            { key: 'assignedHuman', label: 'Assigned human' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'priority',
              label: 'Priority',
              render: (value) => <PriorityBadge priority={value} />,
            },
            {
              key: 'createdAt',
              label: 'Created',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
