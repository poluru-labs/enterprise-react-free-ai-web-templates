import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import agentsData from '../data/agents.json';
import tasksData from '../data/tasks.json';
import toolCalls from '../data/toolCalls.json';
import tracesData from '../data/traces.json';
import guardrails from '../data/guardrails.json';
import failures from '../data/failures.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    const agents = agentsData.agents
      .filter((agent) => `${agent.name} ${agent.role} ${agent.model} ${agent.owner}`.toLowerCase().includes(query))
      .map((agent) => ({
        id: agent.id,
        kind: 'Agent',
        title: agent.name,
        detail: `${agent.role} · ${agent.model}`,
        status: agent.status,
        href: `${BASE_PATH}/agents`,
      }));
    const tasks = tasksData.tasks
      .filter((task) => `${task.id} ${task.title} ${task.agentName}`.toLowerCase().includes(query))
      .map((task) => ({
        id: task.id,
        kind: 'Task',
        title: task.title,
        detail: `${task.id} · ${task.agentName}`,
        status: task.status,
        href: `${BASE_PATH}/tasks`,
      }));
    const traces = tracesData.traces
      .filter((trace) => `${trace.id} ${trace.taskId} ${trace.agentName} ${trace.outcome}`.toLowerCase().includes(query))
      .map((trace) => ({
        id: trace.id,
        kind: 'Trace',
        title: trace.id,
        detail: `${trace.agentName} · ${trace.outcome}`,
        status: trace.status,
        href: `${BASE_PATH}/traces`,
      }));
    const tools = toolCalls.tools
      .filter((tool) => `${tool.name} ${tool.ownerAgent}`.toLowerCase().includes(query))
      .map((tool) => ({
        id: tool.id,
        kind: 'Tool',
        title: tool.name,
        detail: tool.ownerAgent,
        status: tool.status,
        href: `${BASE_PATH}/tool-calls`,
      }));
    const policies = guardrails.events
      .filter((event) => `${event.id} ${event.policy} ${event.agentName} ${event.detail}`.toLowerCase().includes(query))
      .map((event) => ({
        id: event.id,
        kind: 'Guardrail',
        title: event.policy.replace(/_/g, ' '),
        detail: `${event.id} · ${event.agentName}`,
        status: event.action,
        href: `${BASE_PATH}/guardrails`,
      }));
    const failLogs = failures.logs
      .filter((row) => `${row.id} ${row.agentName} ${row.message} ${row.reason}`.toLowerCase().includes(query))
      .map((row) => ({
        id: row.id,
        kind: 'Failure',
        title: row.message,
        detail: `${row.id} · ${row.agentName}`,
        status: row.reason,
        href: `${BASE_PATH}/failures`,
      }));
    return [...agents, ...tasks, ...traces, ...tools, ...policies, ...failLogs];
  }, [query]);

  return (
    <div className="amd-page">
      <PageHeader
        title={query ? `Results for “${params.get('q')}”` : 'Search'}
        description="Looks across agents, tasks, traces, tools, guardrails, and failures."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <ChartSection
        title={`${results.length} matches`}
        subtitle={query ? 'Click a result to open the related page' : 'Use the header search and press Enter'}
      >
        {results.length ? (
          <ul className="amd-search-results">
            {results.map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link to={item.href} className="amd-search-hit">
                  <div>
                    <small>{item.kind}</small>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="amd-drawer-copy">
            {query ? 'No matches in the mock dataset.' : 'Type a query in the header and press Enter.'}
          </p>
        )}
      </ChartSection>
    </div>
  );
}
