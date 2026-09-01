# ReviewBay Content Safety Dashboard

ReviewBay is a frontend dashboard for content moderation and trust & safety operations. It gives reviewers a realistic, data-driven workspace for queue triage, completed decisions, policy health, appeals, automation rules, trusted flaggers, and agreement analytics.

The project is self-contained: screens read local JSON fixtures dated around 24 August 2026 and can be pointed at a production API later without adding a backend here.

**Product:** ReviewBay · Content Safety  
**Theme:** `#7C3AED` (violet), with `#5B21B6`, `#A78BFA`, and `#4C1D95`  
**Signed-in user:** Nia Poluru, Trust & safety lead  
**CSS prefix:** `cmb-`

## Features

- Light violet queue bar with an SLA ticker, underlined search, Assign next, notifications, theme toggle, and ⌘K command palette
- Overview KPIs, volume trend, category mix, equal-height policy cards, live queue preview, and alerts
- Filterable review queue with Approve / Reject / Escalate actions
- Completed reviews, policy cards, appeals SLA, automation rules, reporter volume, and reviewer analytics
- Workspace settings for on-call and alert channels
- Light and dark themes via the Enterprise Design System

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run locally

```bash
npm install
npm run dev
```

The dashboard is available at:

```text
/content-moderation/overview
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the app for production. |
| `npm run preview` | Preview the production build locally. |
| `npm test` | Run Vitest once (`vitest run`). |

## Routes

All dashboard routes use the `/content-moderation` base path.

| Route | View |
| --- | --- |
| `/content-moderation/overview` | Queue health snapshot |
| `/content-moderation/queue` | Live review queue |
| `/content-moderation/reviews` | Completed decisions |
| `/content-moderation/policies` | Policy cards and enforcement modes |
| `/content-moderation/appeals` | Open appeals and SLA |
| `/content-moderation/automation` | Regex, classifier, and hash-match rules |
| `/content-moderation/reporters` | Trusted flaggers and volume |
| `/content-moderation/analytics` | Reviewer throughput and agreement |
| `/content-moderation/search` | Workspace search |
| `/content-moderation/settings` | Workspace, on-call, and channels |

## Project structure

```text
src/
  App.jsx
  main.jsx
  App.css
  constants/navigation.js
  data/*.json
  hooks/useCommandPalette.js
  lib/format.js
  lib/status.js
  lib/search.js
  components/layout/DashboardLayout.jsx, DashboardNavbar.jsx, DashboardSidebar.jsx
  components/charts/AreaChart.jsx, BarChart.jsx, DonutChart.jsx, Sparkline.jsx
  components/widgets/PageHeader.jsx, StatCard.jsx, ChartSection.jsx, FilterBar.jsx, StatusBadge.jsx, DataTable.jsx
  pages/*.jsx
  test/setup.js
```

To connect the dashboard to live data, replace the fixtures in `src/data/` with API calls at the page or widget boundary, keeping the existing component data shapes where possible.

## Tech stack

- React 18
- Vite
- React Router
- Vitest + Testing Library
- Bootstrap and Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
