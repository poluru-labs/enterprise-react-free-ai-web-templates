# Download Enterprise React Free AI Web Templates

Free, production-shaped React templates for AI dashboards, ops consoles, and admin workspaces. Each folder is a self-contained Vite app: install it, run it, and restyle it independently.

Maintained by [Poluru Labs](https://polurus.com). Source: [github.com/poluru-labs/enterprise-react-free-ai-web-templates](https://github.com/poluru-labs/enterprise-react-free-ai-web-templates).

## Templates

| Template | Product | What it covers | Brand | Local demo |
| --- | --- | --- | --- | --- |
| [Agent monitoring](ai-agent-monitoring-dashboard/README.md) | AgentPulse | Fleet ops, incidents, traces, guardrails, and cost | `#003161` | [localhost:5173/agent-monitoring/overview](http://localhost:5173/agent-monitoring/overview) |
| [Computer vision](ai-computer-vision-dashboard/README.md) | Sightline | Cameras, models, detections, and quality | `#0F766E` | [localhost:5173/computer-vision/overview](http://localhost:5173/computer-vision/overview) |
| [Content moderation](ai-content-moderation-dashboard/README.md) | ReviewBay | Queue, policies, appeals, and automation | `#7C3AED` | [localhost:5173/content-moderation/overview](http://localhost:5173/content-moderation/overview) |
| [Data pipeline](ai-data-pipeline-dashboard/README.md) | Conduit | Ingestion, transformations, quality, and lineage | `#D45060` | [localhost:5192/data-pipeline/overview](http://localhost:5192/data-pipeline/overview) |
| [Marketing command](ai-marketing-command-center/README.md) | Marquee | Campaigns, audiences, content, and automation | `#3E0F8D` | [localhost:5193/marketing/overview](http://localhost:5193/marketing/overview) |
| [Document RAG](ai-document-rag-dashboard/README.md) | Contextly | Ingestion, retrieval, citations, and evals | `#0F766E` | [localhost:5173/document-rag/overview](http://localhost:5173/document-rag/overview) |
| [Governance](ai-governance-compliance-dashboard/README.md) | Charter | Inventories, risk, policies, and approvals | `#B0CDE6` | [localhost:5191/governance/overview](http://localhost:5191/governance/overview) |
| [LLM ops](ai-llm-ops-dashboard/README.md) | Poluru LLM Ops | Traces, playground, evals, and cost | `#4338CA` | [localhost:5185/llm-ops/overview](http://localhost:5185/llm-ops/overview) |
| [ML training](ai-ml-training-dashboard/README.md) | Kiln | Training runs, datasets, and GPU clusters | `#DE3E3E` | [localhost:5184/ml-training/overview](http://localhost:5184/ml-training/overview) |
| [Model evaluation](ai-model-evaluation-dashboard/README.md) | Prism | Eval suites, leaderboards, and human review | `#FF8383` | [localhost:5186](http://localhost:5186) |
| [Prompt management](ai-prompt-management-dashboard/README.md) | Prompt Bureau | Library, versions, evals, and releases | `#162E93` | [localhost:5187/prompt-management/overview](http://localhost:5187/prompt-management/overview) |
| [SaaS admin](ai-saas-admin-dashboard/README.md) | Nexus | Tenants, billing, flags, and audit | `#059669` | [localhost:5188/saas-admin/overview](http://localhost:5188/saas-admin/overview) |
| [Support helpdesk](ai-support-helpdesk-dashboard/README.md) | Relay | Inbox, SLA, macros, and copilot drafts | `#EA580C` | [localhost:5189](http://localhost:5189) |
| [Synthetic data studio](ai-synthetic-data-studio/README.md) | Poluru Synth Studio | Synthetic datasets, differential privacy, quality & TSTR evals | `#05339C` | [localhost:5194/synthetic-data/overview](http://localhost:5194/synthetic-data/overview) |
| [Voice operations](ai-voice-operations-dashboard/README.md) | — | Analyze calls, transcriptions, sentiment, and escalations | — | README stub only |
| [Enterprise dashboard](enterprise-dashboard/README.md) | Poluru DC | Facilities, power, capacity, and tickets | `#30AFFF` | [localhost:5173](http://localhost:5173) |
| [Security operations](ai-security-operations-center/README.md) | — | Prompt injection, data leaks, jailbreaks, and threats | — | README stub only |

Marquee uses port **5193**. AgentPulse, Sightline, ReviewBay, Contextly, and Poluru DC use Vite’s default port **5173**. Start those one at a time, or pass `--port` when you run `npm run dev`. Prism uses hash routes (`#/overview`). `ai-security-operations-center` and `ai-voice-operations-dashboard` currently have README stubs only — no Vite app yet.

Browse source for any template:

`https://github.com/poluru-labs/enterprise-react-free-ai-web-templates/tree/main/<folder-name>`

## Getting started

Requires Node.js 20+ (Node 18 works on several of the older templates).

```bash
git clone https://github.com/poluru-labs/enterprise-react-free-ai-web-templates.git
cd enterprise-react-free-ai-web-templates/ai-agent-monitoring-dashboard
npm install
npm run dev
```

Replace the folder name with any template from the table. Open the local demo URL for that app. Production build:

```bash
npm run build
```

Each template has its own `package.json`, so dependencies and scripts stay scoped to that app.

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm test` | Vitest unit tests (where the template includes them) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Stack

Most templates share:

- React 18 + React Router 6 (Poluru DC uses React 19, Router 7, and TypeScript)
- Vite
- Bootstrap 5 + Bootstrap Icons (Poluru DC uses SCSS instead of Bootstrap)
- [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)
- Vitest + Testing Library + jsdom

Copy and mock data live in each app’s `src/data/`. Layout and brand color live in `src` CSS/SCSS and the header/shell components.

Typical layout:

```
src/
  App.jsx (or App.tsx)
  main.jsx
  components/layout/     header, sidebar, shell
  components/widgets/    page header, stat cards, tables
  components/charts/     SVG sparklines and charts
  data/                  JSON fixtures
  pages/ or views/
  test/setup.js
```

## License

MIT © 2026 [Subrahmanyam Poluru](https://polurus.com) / Poluru Labs
