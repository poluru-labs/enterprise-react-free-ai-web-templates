# Conduit · AI Data Pipeline Dashboard

Conduit is a frontend dashboard for monitoring ingestion, transformations, data quality, and lineage. It is a self-contained Vite template: screens read local JSON fixtures so you can explore sources, Spark/dbt jobs, quality checks, and a source-to-serving graph without a backend.

Theme color is **`#D45060`**. Full-width sticky header, square corners, and a simple sidebar. Body type is **Open Sans**; titles use **Roboto**. Signed in as **Subbu Poluru**, Head of data platform.

Built with Vite, React, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

- Author: Subrahmanyam Poluru
- Email: mail.polurus@gmail.com
- Website: [polurus.com](https://polurus.com)

## Features

- Full-width sticky header in `#D45060` with an ingest → transform → quality → lineage rail, throughput meter, search, ⌘K, notifications, and account menu
- Command palette (`⌘K` / `Ctrl+K`) for navigation and job replay
- Sidebar: Overview, Ingestion, Transformations, Quality, Lineage, Pipelines, Settings
- Named pipelines with lag, SLA, quality score, and per-lane detail
- Quality checks for freshness, nulls, uniqueness, and privacy
- Lineage graph from sources through serving, with neighbor inspection
- SVG area, bar, donut, and sparkline charts
- Light theme powered by the Enterprise Design System

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run locally

```bash
cd ai-data-pipeline-dashboard
npm install
npm run dev
```

Vite prints the local development URL (default http://127.0.0.1:5192). The dashboard starts at:

```text
/data-pipeline/overview
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Vitest unit tests |

## Routes

All dashboard routes use the `/data-pipeline` base path.

| Route | View |
| --- | --- |
| `/data-pipeline/overview` | Volume, failing jobs, quality mix |
| `/data-pipeline/ingestion` | Sources and landing jobs |
| `/data-pipeline/transformations` | Spark, dbt, Flink, and Python jobs |
| `/data-pipeline/quality` | Checks, freshness, and null rates |
| `/data-pipeline/lineage` | Upstream and downstream graph |
| `/data-pipeline/pipelines` | Named lanes and owners |
| `/data-pipeline/pipelines/:id` | Lane record, stages, and runs |
| `/data-pipeline/settings` | Workspace, team, and alerts |

## File structure

```text
src/
  App.jsx, main.jsx, App.css
  components/
    layout/     Shell, full-width header, simple sidebar
    charts/     Area, bar, donut, sparkline
    widgets/    Cards, tables, filters, page header
  constants/    Navigation and signed-in user
  data/         Local JSON fixtures
  hooks/        Command palette
  lib/          Format, search, status
  pages/        Overview through settings
  test/setup.js
```

## License

MIT © 2026 [Subrahmanyam Poluru](https://polurus.com) / Poluru Labs
