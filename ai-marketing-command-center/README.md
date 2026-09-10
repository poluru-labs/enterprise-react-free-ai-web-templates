# Marquee · AI Marketing Command Center

Marquee is a frontend dashboard for campaigns, audiences, content performance, and marketing automation. It is a self-contained Vite template: screens read local JSON fixtures so you can explore flights, segments, creative, and journeys without a backend.

Theme color is **`#3E0F8D`**. Full-width sticky header, square corners, and a simple sidebar. Body type is **Open Sans**; titles use **Roboto**. Signed in as **Subbu Poluru**, Head of growth.

Built with Vite, React, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

- Author: Subrahmanyam Poluru
- Email: mail.polurus@gmail.com
- Website: [polurus.com](https://polurus.com)

## Features

- Full-width sticky header in `#3E0F8D` with an audience → campaign → content → automate rail, ROAS meter, search, ⌘K, notifications, and account menu
- Command palette (`⌘K` / `Ctrl+K`) for navigation and campaign launch
- Sidebar: Overview, Campaigns, Audiences, Content, Automation, Settings
- Named flights with spend, ROAS, CTR, and per-channel detail
- Audience segments with reach, fit, and freshness
- Creative performance by impressions, CTR, and dwell
- Triggered journeys for welcome, abandon, and winback
- SVG area, bar, donut, and sparkline charts
- Light theme powered by the Enterprise Design System

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run locally

```bash
cd ai-marketing-command-center
npm install
npm run dev
```

Vite prints the local development URL (default http://127.0.0.1:5193). The dashboard starts at:

```text
/marketing/overview
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Vitest unit tests |

## Routes

All dashboard routes use the `/marketing` base path.

| Route | View |
| --- | --- |
| `/marketing/overview` | Spend, ROAS, and live flights |
| `/marketing/campaigns` | Named flights and owners |
| `/marketing/campaigns/:id` | Flight record, stages, and sends |
| `/marketing/audiences` | Segments and reach |
| `/marketing/content` | Creative performance |
| `/marketing/automation` | Journeys and triggers |
| `/marketing/settings` | Workspace, team, and alerts |

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
  lib/          Format, search, status, campaigns
  pages/        Overview through settings
  test/setup.js
```

## License

MIT © 2026 [Subrahmanyam Poluru](https://polurus.com) / Poluru Labs
