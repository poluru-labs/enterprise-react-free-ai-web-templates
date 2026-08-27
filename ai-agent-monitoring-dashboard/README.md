# AgentPulse Agent Monitoring Dashboard

AgentPulse is a frontend dashboard for monitoring AI agent operations. It provides a realistic, data-driven interface for exploring agent activity, task execution, traces, tool calls, failures, handoffs, memory health, evaluations, guardrails, and cost.

The project is intentionally self-contained: the screens use local JSON fixtures and can be adapted to a production API without adding a backend to this repository.

## Features

- Overview of agent health, volume, latency, failures, and spend
- Agent fleet and task monitoring
- Trace and tool-call inspection
- Loop detection, failure analysis, and human handoff tracking
- Memory health, evaluations, and guardrail reporting
- Cost and token usage views
- Search and workspace settings screens
- Light theme powered by the Enterprise Design System

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run Locally

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal. The dashboard is available at:

```text
/agent-monitoring/overview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the app for production. |
| `npm run preview` | Preview the production build locally. |

## Routes

All dashboard routes use the `/agent-monitoring` base path.

| Route | View |
| --- | --- |
| `/agent-monitoring/overview` | Operations overview |
| `/agent-monitoring/agents` | Agent fleet |
| `/agent-monitoring/tasks` | Task activity |
| `/agent-monitoring/traces` | Execution traces |
| `/agent-monitoring/tool-calls` | Tool-call performance |
| `/agent-monitoring/loops` | Loop detection |
| `/agent-monitoring/failures` | Failure analysis |
| `/agent-monitoring/handoffs` | Human handoffs |
| `/agent-monitoring/memory-health` | Memory and retrieval health |
| `/agent-monitoring/evaluations` | Evaluation results |
| `/agent-monitoring/guardrails` | Guardrail events |
| `/agent-monitoring/cost` | Cost and token usage |
| `/agent-monitoring/search` | Workspace search |
| `/agent-monitoring/settings` | Dashboard settings |

## Project Structure

```text
src/
  components/   Reusable layout, chart, and widget components
  constants/    Navigation and app-level constants
  data/         Local JSON fixtures used by the dashboard
  lib/          Formatting and status helpers
  pages/        Route-level dashboard screens
```

To connect the dashboard to live data, replace the fixtures in `src/data/` with API calls at the page or widget boundary, keeping the existing component data shapes where possible.

## Tech Stack

- React 18
- Vite
- React Router
- Bootstrap and Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`