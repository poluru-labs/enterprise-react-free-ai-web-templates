# Poluru LLM Ops

React operations dashboard for large language models on Poluru Cloud. Dark indigo ops console (`#1E1B4B`) with indigo `#4338CA` / cyan `#0891B2` brand. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

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
| `npm test` | Vitest unit tests |

## Routes

Base path: `/llm-ops`

| Path | Page |
| --- | --- |
| `/llm-ops/overview` | Request volume, model health, incidents |
| `/llm-ops/models` | Production registry |
| `/llm-ops/models/:id` | Model workspace, tokens, cost |
| `/llm-ops/prompts` | Prompt library, versions, drafts |
| `/llm-ops/traces` | Live traces and inspect drawer |
| `/llm-ops/evaluations` | Eval suites and score trend |
| `/llm-ops/playground` | Draft against Aurora before you publish |
| `/llm-ops/costs` | Spend, budget, daily usage |
| `/llm-ops/incidents` | Watch and resolved pages |
| `/llm-ops/guardrails` | PII, jailbreak, groundedness |
| `/llm-ops/settings` | Keys, alerts, team |

## Stack

- React 18
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
