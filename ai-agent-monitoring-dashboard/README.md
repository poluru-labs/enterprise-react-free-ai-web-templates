# AgentPulse Agent Monitoring Dashboard

AgentPulse is a frontend dashboard for monitoring AI agent operations. It provides a realistic, data-driven interface for exploring agent activity, task execution, traces, tool calls, failures, handoffs, incidents, memory health, evaluations, guardrails, and cost.

The project is intentionally self-contained: the screens use local JSON fixtures and can be adapted to a production API without adding a backend to this repository.

Theme color is `#003161`. Signed in as **Avery Poluru**, ops lead.

## Screenshot
<img width="3360" height="5030" alt="image" src="https://github.com/user-attachments/assets/8e2628ac-75bb-4f1a-b4a9-20857f54f287" />


## Features

- Navy command-bar header with live SLO, alert, spend, and latency chips
- Command palette (`⌘K`) and workspace search
- Overview of agent health, SLOs, watch cards, volume, latency, failures, and spend
- Agent fleet, task monitoring, and incident playbooks
- Trace and tool-call inspection
- Loop detection, failure analysis, and human handoff tracking
- Memory health, evaluations, and guardrail reporting
- Cost and token usage views
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
| `npm test` | Run Vitest unit tests. |

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
| `/agent-monitoring/incidents` | Reliability incidents and playbooks |
| `/agent-monitoring/memory-health` | Memory and retrieval health |
| `/agent-monitoring/evaluations` | Evaluation results |
| `/agent-monitoring/guardrails` | Guardrail events |
| `/agent-monitoring/cost` | Cost and token usage |
| `/agent-monitoring/search` | Workspace search |
| `/agent-monitoring/settings` | Dashboard settings |

## Project Structure

```text
src/
  components/   Layout, chart, and widget components
    layout/     Shell, navy command bar, sidebar
    charts/     Area, bar, donut, sparkline
    widgets/    Shared cards, tables, filters
  constants/    Navigation and app-level constants
  data/         Local JSON fixtures used by the dashboard
  hooks/        Command palette and shared hooks
  lib/          Formatting, status, and search helpers
  pages/        Route-level dashboard screens
  test/         Vitest setup
```

This follows the usual React app layout: keep reusable UI under `components/`, route screens under `pages/`, fixtures under `data/`, and pure helpers under `lib/`.

To connect the dashboard to live data, replace the fixtures in `src/data/` with API calls at the page or widget boundary, keeping the existing component data shapes where possible.

## Tech Stack

- React 18
- Vite
- React Router
- Bootstrap and Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
- Vitest
