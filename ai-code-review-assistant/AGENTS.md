# AGENTS.md — AI Code Review Assistant

Guidance for coding agents and contributors working on this template.

## Product

- **Name:** AI Code Review Assistant
- **Slug:** `ai-code-review-assistant`
- **Tagline:** Review diffs for bugs, security, and maintainability.
- **Brand color:** `#DC95FF` (no gradients)
- **Themes:** light and dark via `data-theme` + `useTheme`
- **Author footer:** Created by [Subrahmanyam Poluru](https://polurus.com)

## Core features

- Diff-aware commentary — `features/diffs`, route `/diffs` (line-anchored threads with severity, resolve/reopen, and a per-line composer)
- Security and smell heuristics — `features/heuristics`, route `/heuristics` (toggleable regex rules in `lib/rules.ts`; critical and high hits block merge)
- Suggested patches — `features/patches`, route `/patches` (before/after diffs, accept/dismiss/undo, copy as unified diff)
- Severity triage — `features/triage`, route `/triage` (severity filter chips, status per finding, blocked-PR summary)

Review domain types live in `core/types/review.ts`. Shared pieces: `DiffView` (line diff table with clickable new-line numbers and inline rows), `SeverityBadge`, `StatusBadge`, and `diffLines` / `toUnifiedPatch` / `severityRank` in `shared/utils/diff.ts`.

Heuristics are a fast pre-filter, not a replacement for model review: keep rules line-based, add a sample hit to `SAMPLE_SOURCE` for each new rule, and never put a real-looking provider key in sample code.

## Theme tokens

- `--brand` stays `#DC95FF` in both themes for fills (primary buttons, user chat bubbles, comment counts).
- Lilac is too light for text on white (2.15:1). Use `--brand-text` for brand-colored text, focus rings, lines, and borders: `#7E22B0` in light mode, `#DC95FF` in dark mode.
- Text placed on a `--brand` fill uses `--brand-on` (`#2A0D3A`), never white.

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
7. Keep visual brand anchored to `#DC95FF`

## Architecture rules

- Extend `features/*` for product UX; keep `core` free of React UI
- Colocate `*.module.scss` with components
- Export public APIs from feature `index.ts` files
- Update this file when shipping user-facing capabilities

## Definition of done

- [ ] Light and dark themes verified
- [ ] Footer author link present and correct
- [ ] No gradient backgrounds introduced
- [ ] Brand accent remains `#DC95FF`
- [ ] `npm run typecheck` and `npm run lint` pass

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
