# ai-knowledge-base — dashboard agent

Implement the product **only inside** `ai-knowledge-base/`. This app uses the **modern TypeScript + Vite + SCSS modules** starter (feature-first layout, not the JSX EDS template stack).

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-knowledge-base` |
| Product title | **Knowledge Base** |
| Desk name | **KbDesk** |
| Brand | **`#E00000`** (light theme) |
| Fonts | Roboto + Lato in `index.html` |

## Domain

Enterprise **knowledge operations**: published articles, category taxonomy, maintenance queue for stale content, deflection-oriented assistant chat, and playbooks for authoring workflows. Use assignee names ending with **Poluru** in mock copy. Avoid generic “AI platform” marketing in UI labels.

## Required features

| Area | Route | Purpose |
|------|--------|---------|
| Overview | `/` | Article KPIs, shortcuts into library and maintenance |
| Articles | `/articles` | Searchable article library (status, category, owner) |
| Categories | `/categories` | Taxonomy and article counts |
| Maintenance | `/maintenance` | Stale / refresh queue |
| Assistant | `/chat` | Knowledge Q&A (existing chat module) |
| Playbooks | `/agents` | Authoring playbooks (existing agents catalog) |
| Settings | `/settings` | Workspace preferences |

Include a **footer** in the shell: Created by [Subrahmanyam Poluru](https://polurus.com) · [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

## Git commits (required — exactly 5)

Stage **only** paths under `ai-knowledge-base/`. Never commit `node_modules/` or `.env`.

| # | Scope | Example message |
|---|--------|-----------------|
| 1 | `AGENTS.md`, brand tokens `#E00000`, `index.html`, favicon, env defaults, layout identity | `feat(knowledge-base): add AGENTS spec and KbDesk brand shell` |
| 2 | `features/articles` + types/mock data | `feat(knowledge-base): add article library feature` |
| 3 | `features/categories` + `features/maintenance` | `feat(knowledge-base): add categories and maintenance queue` |
| 4 | Dashboard, routes, nav, playbooks/chat copy, footer | `feat(knowledge-base): wire navigation and knowledge ops overview` |
| 5 | `README.md`, polish, `npm run build` | `chore(knowledge-base): document runbook and confirm production build` |

Do **not** finish with fewer than five commits for a full implementation pass.

## Verification

```bash
cd ai-knowledge-base
npm install
npm run build
```

Fix typecheck and build errors before commit 5.
