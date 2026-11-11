# AGENTS.md — AI Brand Identity Studio

Guidance for coding agents and contributors working on this template.

## Product

- **Name:** AI Brand Identity Studio
- **Slug:** `ai-brand-identity-studio`
- **Tagline:** Explore voice, naming, and visual direction with guardrails.
- **Brand color:** `#00105B` (no gradients)
- **Themes:** light and dark via `data-theme` + `useTheme`
- **Author footer:** Created by [Subrahmanyam Poluru](https://polurus.com)

## Core features

- Voice guidelines — `features/voice`, route `/voice` (traits, tone by channel, live vocabulary check)
- Naming explorations — `features/naming`, route `/naming` (scored candidates, shortlist/reject)
- Palette lockups — `features/palettes`, route `/palettes` (wordmark previews, WCAG contrast matrix)
- Compliance checks — `features/compliance`, route `/compliance` (logo, color, voice, legal rules per asset)

Brand domain types live in `core/types/brand.ts`; mock data sits in each feature's `data/` folder. Contrast math is in `shared/utils/color.ts`, and status pills use the shared `StatusBadge`.

## Theme tokens

- `--brand` stays `#00105B` in both themes for fills (buttons, active segments, swatches).
- Use `--brand-text` for brand-colored text, borders, and bars. It is `#00105B` in light mode and a light navy tint in dark mode, because the master navy is unreadable on dark surfaces.

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
7. Keep visual brand anchored to `#00105B`

## Architecture rules

- Extend `features/*` for product UX; keep `core` free of React UI
- Colocate `*.module.scss` with components
- Export public APIs from feature `index.ts` files
- Update this file when shipping user-facing capabilities

## Definition of done

- [ ] Light and dark themes verified
- [ ] Footer author link present and correct
- [ ] No gradient backgrounds introduced
- [ ] Brand accent remains `#00105B`
- [ ] `npm run typecheck` and `npm run lint` pass

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
