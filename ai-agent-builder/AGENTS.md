# AGENTS.md — AI Agent Builder

Guidance for coding agents and contributors working on this template.

## Product

- **Name:** AI Agent Builder
- **Slug:** `ai-agent-builder`
- **Tagline:** Compose tools, prompts, and policies into production agents.
- **Brand color:** `#AE2448` (no gradients)
- **Themes:** light and dark via `data-theme` + `useTheme`
- **Author footer:** Created by [Subrahmanyam Poluru](https://polurus.com)

## Core features

- Visual tool graph — `features/tool-graph`, route `/graph`
- Policy and allowlists — `features/policies`, route `/policies`
- Sandbox test runs — `features/sandbox`, route `/sandbox`
- Versioned deployments — `features/deployments`, route `/deployments` (promotion requires reviewer approval)

Builder domain types live in `core/types/builder.ts`; mock data sits in each feature's `data/` folder. Status pills use the shared `StatusBadge` component.

## Template capabilities

- Feature-based React structure (`app` / `core` / `features` / `shared`)
- SCSS modules with shared design tokens
- Chat + agents routes with mock AI API fallback
- Theme toggle persisted in `localStorage`
- Accessible layout shell with mobile nav

## Industry practices

1. Keep provider secrets on the server — only `VITE_*` public config in the browser
2. Prefer streaming chat with abort/cancel when wiring a real gateway
3. Sanitize any model-rendered HTML/markdown before mounting
4. Log traces/tokens on the backend; avoid raw PII in client logs
5. Version prompts/agents; gate production changes behind review
6. Support light and dark themes without gradient backgrounds
7. Keep visual brand anchored to `#AE2448`

## Architecture rules

- Extend `features/*` for product UX; keep `core` free of React UI
- Colocate `*.module.scss` with components
- Export public APIs from feature `index.ts` files
- Update this file when shipping user-facing capabilities

## Definition of done

- [ ] Light and dark themes verified
- [ ] Footer author link present and correct
- [ ] No gradient backgrounds introduced
- [ ] Brand accent remains `#AE2448`
- [ ] `npm run typecheck` and `npm run lint` pass

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
