# ai-document-assistant — dashboard agent

Implement the product **only inside** `ai-document-assistant/`. This app uses the **TypeScript + Vite + SCSS modules** starter (not the JSX EDS template stack).

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-document-assistant` |
| Product title | **Document Assistant** |
| Desk name | **DocDesk** |
| Brand | **`#005A9C`** (light theme) |
| Fonts | Roboto + Lato in `index.html` |

## Domain

Enterprise **document operations**: library inventory, reusable templates, review/approval queue, playbooks for drafting, and an assistant chat grounded in workspace docs. Use assignee names ending with **Poluru** in mock copy. Avoid generic “AI platform” marketing in UI labels.

## Required features

| Area | Route | Purpose |
|------|--------|---------|
| Overview | `/` | Document KPIs, shortcuts into library and review |
| Documents | `/documents` | Searchable library (status, owner, type) |
| Templates | `/templates` | Reusable doc templates and versions |
| Reviews | `/reviews` | Approval queue and priorities |
| Assistant | `/chat` | Document Q&A (existing chat module) |
| Playbooks | `/agents` | Drafting playbooks (existing agents catalog) |
| Settings | `/settings` | Workspace preferences |

Include a **footer** in the shell: Created by [Subrahmanyam Poluru](https://polurus.com) · link to `@poluru-labs/enterprise-design-system-react` on npm when you add that dependency; until then cite the starter stack in README.

## Git commits (required — exactly 5)

Stage **only** paths under `ai-document-assistant/`. Never commit `node_modules/` or `.env`.

| # | Scope | Example message |
|---|--------|-----------------|
| 1 | `AGENTS.md`, brand tokens `#005A9C`, `index.html`, favicon, env defaults, layout identity | `feat(document-assistant): add AGENTS spec and DocDesk brand shell` |
| 2 | `features/documents` + types/mock data | `feat(document-assistant): add document library feature` |
| 3 | `features/templates` + `features/reviews` | `feat(document-assistant): add templates and review queue` |
| 4 | Dashboard, routes, nav, playbooks/chat copy, footer | `feat(document-assistant): wire navigation and document ops overview` |
| 5 | `README.md`, polish, `npm run build` | `chore(document-assistant): document runbook and confirm production build` |

Do **not** finish with fewer than five commits for a full implementation pass.

## Verification

```bash
cd ai-document-assistant
npm install
npm run build
```

Fix typecheck and build errors before commit 5.
