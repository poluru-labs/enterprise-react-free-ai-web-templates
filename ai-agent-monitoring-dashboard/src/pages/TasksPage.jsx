import { useMemo, useState } from 'react';
import {
  Button,
  DateRangePicker,
  DescriptionList,
  Drawer,
  Search,
  Select,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import tasksData from '../data/tasks.json';
import agentsData from '../data/agents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatDuration, inDateRange } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  PriorityBadge,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Running', value: 'running' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed', value: 'failed' },
  { label: 'Queued', value: 'queued' },
  { label: 'Handed off', value: 'handed_off' },
];

const AGENT_OPTIONS = [
  { label: 'All agents', value: 'all' },
  ...agentsData.agents.map((agent) => ({ label: agent.name, value: agent.name })),
];

export default function TasksPage() {
  const [status, setStatus] = useState('all');
  const [agent, setAgent] = useState('all');
  const [query, setQuery] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    return tasksData.tasks.filter((task) => {
      const matchesStatus = status === 'all' || task.status === status;
      const matchesAgent = agent === 'all' || task.agentName === agent;
      const haystack = `${task.id} ${task.title} ${task.agentName}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      const matchesDate = !start && !end ? true : inDateRange(task.startedAt, start, end);
      return matchesStatus && matchesAgent && matchesQuery && matchesDate;
    });
  }, [status, agent, query, start, end]);

  return (
    <div className="amd-page">
      <PageHeader
        title="Agent tasks"
        description="Track work that agents started, completed, failed, or handed off."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tasks' }]}
        actions={
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={() => showToast({ title: 'Task export started', variant: 'success' })}
          >
            Export CSV
          </Button>
        }
      />

      <FilterBar
        search={
          <Search
            placeholder="Search task ID, title, or agent"
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
          setStart('');
          setEnd('');
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
        <DateRangePicker
          label="Started between"
          startValue={start || undefined}
          endValue={end || undefined}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </FilterBar>

      <ChartSection
        title={`${rows.length} tasks`}
        subtitle="Click a row to inspect timing, tools, and outcome"
      >
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          columns={[
            { key: 'id', label: 'Task ID', className: 'amd-mono' },
            { key: 'agentName', label: 'Agent' },
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
              key: 'startedAt',
              label: 'Started',
              render: (value) => formatDateTime(value),
            },
            {
              key: 'completedAt',
              label: 'Completed',
              render: (value) => formatDateTime(value),
            },
            {
              key: 'durationMinutes',
              label: 'Duration',
              render: (value) => formatDuration(value),
            },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id || 'Task'}
        size="lg"
        footer={
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <div className="amd-drawer-body">
            <p className="amd-drawer-lead">{selected.title}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <StatusBadge status={selected.status} />
              <PriorityBadge priority={selected.priority} />
            </div>
            <DescriptionList
              items={[
                { term: 'Agent', description: selected.agentName },
                { term: 'Started', description: formatDateTime(selected.startedAt) },
                { term: 'Completed', description: formatDateTime(selected.completedAt) },
                { term: 'Duration', description: formatDuration(selected.durationMinutes) },
                {
                  term: 'Tools used',
                  description: selected.toolsUsed.length ? selected.toolsUsed.join(', ') : 'None yet',
                },
              ]}
            />
            <p className="amd-drawer-copy">{selected.summary}</p>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
