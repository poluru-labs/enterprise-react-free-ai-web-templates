# Poluru LLM Ops

React operations dashboard for large language models on Poluru Cloud. Theme color is `#F13E93`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

Signed in as **Subrahmanyam Poluru**, platform owner.

## Run

Requires Node.js 20+.

```bash
cd ai-llm-ops-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5185

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Routes

| Path | Page |
| --- | --- |
| `/overview` | Request volume, model health, incidents, ops feed |
| `/models` | Production registry |
| `/models/:id` | Model workspace, traces, rollback |
| `/prompts` | Prompt library, versions, drafts |
| `/traces` | Live traces and inspect drawer |
| `/evaluations` | Eval suites and guardrails |
| `/playground` | Draft against Aurora before you publish |
| `/costs` | Spend, budget, daily usage |
| `/settings` | Alerts, team, ingest key |

## Stack

- React 18
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
