# AI Chart Builder

Choose the right chart and generate clear data stories.

Modern React template with light/dark themes, SCSS modules, and an AI workspace shell.

**Brand color:** `#29527A`  
**Author:** [Subrahmanyam Poluru](https://polurus.com)

See [`AGENTS.md`](./AGENTS.md) for product features and agent working agreements.

## Screens

| Route | Feature |
| --- | --- |
| `/` | Overview with metrics and shortcuts |
| `/recommend` | Ranked chart types from goal and data shape |
| `/annotations` | Suggested callouts with editable text |
| `/palettes` | Color-vision simulation and 3:1 contrast checks |
| `/exports` | Export presets with SVG and preset JSON download |
| `/chat` | Chart chat against the mock AI API |
| `/agents` | Viz agents catalog |
| `/settings` | Theme and workspace settings |

The recommender, annotation suggestions, and palette checks are rule-based and run
fully in the browser.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```
