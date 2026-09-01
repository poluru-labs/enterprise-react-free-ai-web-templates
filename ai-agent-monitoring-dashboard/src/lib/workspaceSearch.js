import agentsData from '../data/agents.json';
import tasksData from '../data/tasks.json';
import tracesData from '../data/traces.json';
import toolCalls from '../data/toolCalls.json';
import guardrails from '../data/guardrails.json';
import failures from '../data/failures.json';
import incidents from '../data/incidents.json';
import { BASE_PATH } from '../constants/navigation.js';
import { searchRecords } from './search.js';

export function searchWorkspace(query) {
  const needle = String(query || '').trim();
  if (!needle) return [];

  const agents = searchRecords(agentsData.agents, needle, ['name', 'role', 'model', 'owner', 'status']).map(
    (agent) => ({
      id: agent.id,
      kind: 'Agent',
      title: agent.name,
      detail: `${agent.role} · ${agent.model}`,
      status: agent.status,
      href: `${BASE_PATH}/agents`,
    }),
  );

  const tasks = searchRecords(tasksData.tasks, needle, ['id', 'title', 'agentName', 'status']).map((task) => ({
    id: task.id,
    kind: 'Task',
    title: task.title,
    detail: `${task.id} · ${task.agentName}`,
    status: task.status,
    href: `${BASE_PATH}/tasks`,
  }));

  const traces = searchRecords(tracesData.traces, needle, ['id', 'taskId', 'agentName', 'outcome', 'status']).map(
    (trace) => ({
      id: trace.id,
      kind: 'Trace',
      title: trace.id,
      detail: `${trace.agentName} · ${trace.outcome}`,
      status: trace.status,
      href: `${BASE_PATH}/traces`,
    }),
  );

  const tools = searchRecords(toolCalls.tools, needle, ['name', 'ownerAgent', 'status']).map((tool) => ({
    id: tool.id,
    kind: 'Tool',
    title: tool.name,
    detail: tool.ownerAgent,
    status: tool.status,
    href: `${BASE_PATH}/tool-calls`,
  }));

  const policies = searchRecords(guardrails.events, needle, ['id', 'policy', 'agentName', 'detail', 'action']).map(
    (event) => ({
      id: event.id,
      kind: 'Guardrail',
      title: event.policy.replace(/_/g, ' '),
      detail: `${event.id} · ${event.agentName}`,
      status: event.action,
      href: `${BASE_PATH}/guardrails`,
    }),
  );

  const failLogs = searchRecords(failures.logs, needle, ['id', 'agentName', 'message', 'reason']).map((row) => ({
    id: row.id,
    kind: 'Failure',
    title: row.message,
    detail: `${row.id} · ${row.agentName}`,
    status: row.reason,
    href: `${BASE_PATH}/failures`,
  }));

  const incidentHits = searchRecords(incidents.items, needle, ['id', 'title', 'agent', 'summary', 'status']).map(
    (item) => ({
      id: item.id,
      kind: 'Incident',
      title: item.title,
      detail: `${item.id} · ${item.agent}`,
      status: item.status,
      href: `${BASE_PATH}/incidents`,
    }),
  );

  return [...agents, ...tasks, ...traces, ...tools, ...policies, ...failLogs, ...incidentHits];
}
