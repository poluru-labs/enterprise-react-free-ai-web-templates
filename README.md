# Enterprise React Free AI Web Templates

A curated collection of free React templates for AI dashboards, SaaS products, admin panels, and internal tools. Each template is a self-contained Vite app that can be installed, developed, and built independently.

## Templates

| Template | Description |
| --- | --- |
| [AI Agent Monitoring Dashboard](ai-agent-monitoring-dashboard/README.md) | AgentPulse — fleet ops, incidents, traces, guardrails, and cost. Theme `#003161`. Navy command bar. |
| [AI Computer Vision Dashboard](ai-computer-vision-dashboard/README.md) | Sightline — cameras, models, detections, and quality. Theme `#0F766E`. Dark teal control-room header. |
| [AI Content Moderation Dashboard](ai-content-moderation-dashboard/README.md) | ReviewBay — queue, policies, appeals, and automation. Theme `#7C3AED`. Light violet SLA ticker. |
| [AI Document RAG Dashboard](ai-document-rag-dashboard/) | Document ingestion, retrieval, and question answering. |
| [AI LLM Ops Dashboard](ai-llm-ops-dashboard/README.md) | Poluru LLM Ops — traces, playground, evals, and cost. Theme `#F13E93`. |
| [AI ML Training Dashboard](ai-ml-training-dashboard/README.md) | Kiln — training runs, datasets, and GPU clusters. Theme `#DE3E3E`. |
| [AI Model Evaluation Dashboard](ai-model-evaluation-dashboard/README.md) | Prism — eval suites, leaderboards, and human review. Theme `#FF8383`. |
| [AI Prompt Management Dashboard](ai-prompt-management-dashboard/README.md) | Prompt Bureau — library, versions, evals, and releases. Theme `#162E93`. Two-row navy mast + paper tray. |
| [AI SaaS Admin Dashboard](ai-saas-admin-dashboard/README.md) | Nexus — tenants, billing, flags, and audit. Theme `#059669`. Light emerald pill search. |
| [AI Support Helpdesk Dashboard](ai-support-helpdesk-dashboard/README.md) | Relay — inbox, SLA, macros, and copilot drafts. Theme `#EA580C`. Cream SLA countdown header. |
| [Enterprise Dashboard](enterprise-dashboard/README.md) | Poluru DC — facilities, power, capacity, and tickets. Theme `#30AFFF`. Frosted sky glass header. |

## Getting Started

Choose a template, enter its directory, install dependencies, and start the Vite development server:

```bash
cd ai-agent-monitoring-dashboard
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run:

```bash
npm run build
```

Each template has its own `package.json`, so dependencies and scripts are scoped to that app. See the [AI Agent Monitoring Dashboard README](ai-agent-monitoring-dashboard/README.md) for a complete example of the available routes and project structure.
