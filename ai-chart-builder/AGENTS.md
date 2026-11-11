# AGENTS.md — AI Chart Builder

Guidance for coding agents and contributors working on this template.

## Product

- **Name:** AI Chart Builder
- **Slug:** `ai-chart-builder`
- **Tagline:** Choose the right chart and generate clear data stories.
- **Brand color:** `#29527A` (no gradients)
- **Themes:** light and dark via `data-theme` + `useTheme`
- **Author footer:** Created by [Subrahmanyam Poluru](https://polurus.com)

## Core features

- Chart-type recommender — `features/recommender`, route `/recommend` (rules in `lib/recommend.ts`)
- Annotation helpers — `features/annotations`, route `/annotations` (peak, low, biggest change, target crossing in `lib/suggest.ts`)
- Accessible palettes — `features/palettes`, route `/palettes` (protanopia, deuteranopia, tritanopia simulation; 3:1 non-text contrast on light and dark)
- Export presets — `features/exports`, route `/exports` (size, scale, background, alt text; SVG and preset JSON download)

Chart domain types live in `core/types/chart.ts`. Shared pieces: `MiniChart` (SVG previews), `StatusBadge`, and color math in `shared/utils/color.ts`.

## Theme tokens

- `--brand` stays `#29527A` in both themes for fills (buttons, active segments, rank badges).
- Use `--brand-text` for brand-colored text, lines, and borders. It is `#29527A` in light mode and a lighter tint in dark mode so it stays readable on dark surfaces.
- The default series palette (`#29527A, #C8590F, #4A9FD0, #B8890B, #8E8E8E`) stays distinct under all three simulated color-vision deficiencies; re-check on `/palettes` before changing it.

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
7. Keep visual brand anchored to `#29527A`

## Architecture rules

- Extend `features/*` for product UX; keep `core` free of React UI
- Colocate `*.module.scss` with components
- Export public APIs from feature `index.ts` files
- Update this file when shipping user-facing capabilities

## Definition of done

- [ ] Light and dark themes verified
- [ ] Footer author link present and correct
- [ ] No gradient backgrounds introduced
- [ ] Brand accent remains `#29527A`
- [ ] `npm run typecheck` and `npm run lint` pass

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
