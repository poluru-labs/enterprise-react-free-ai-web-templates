# ai-semantic-search — dashboard agent

Implement the product **only inside** `ai-semantic-search/`. This app uses the **modern TypeScript + Vite + SCSS modules** starter (feature-first layout).

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-semantic-search` |
| Product title | **Semantic Search** |
| Desk name | **SearchDesk** |
| Brand | **`#FF5A22`** (light theme) |
| Fonts | Roboto + Lato in `index.html` |

## Domain

Enterprise **semantic search ops**: query logs, index coverage, ranking experiments, evaluation queues, assistant for search debugging, and tuning playbooks. Use assignee names ending with **Poluru** in mock copy. Avoid generic “AI platform” marketing in UI labels.

## Required features

| Area | Route | Purpose |
|------|--------|---------|
| Overview | `/` | Search KPIs and shortcuts |
| Queries | `/queries` | Query log (latency, hits) |
| Indexes | `/indexes` | Corpus / index inventory |
| Rankings | `/rankings` | Ranking metrics and experiments |
| Evaluations | `/evaluations` | Human eval queue |
| Assistant | `/chat` | Search debugging chat |
| Playbooks | `/agents` | Tuning playbooks |
| Settings | `/settings` | Workspace preferences |

Footer: Created by [Subrahmanyam Poluru](https://polurus.com) · [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

## Git commits (required — exactly 5)

Stage **only** paths under `ai-semantic-search/`. Never commit `node_modules/` or `.env`.

| # | Scope | Example message |
|---|--------|-----------------|
| 1 | `AGENTS.md`, brand `#FF5A22`, shell identity | `feat(semantic-search): add AGENTS spec and SearchDesk brand shell` |
| 2 | `features/queries` + types/mock | `feat(semantic-search): add query log feature` |
| 3 | `features/indexes` + `features/rankings` | `feat(semantic-search): add indexes and rankings views` |
| 4 | `features/evaluations`, nav, dashboard, footer | `feat(semantic-search): add eval queue and wire navigation` |
| 5 | `README.md`, `npm run build` | `chore(semantic-search): document runbook and confirm production build` |

## Verification

```bash
cd ai-semantic-search
npm install
npm run build
```
