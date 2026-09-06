# Charter · AI Governance & Compliance Dashboard

Charter is a frontend dashboard for model inventories, residual risk, policies, and approvals. It is a self-contained Vite template: screens read local JSON fixtures so you can explore the register, risk bands, policy library, change requests, audits, exceptions, and controls without a backend.

Theme color is **`#B0CDE6`**. Full-width sticky header, square corners, and a simple sidebar. Signed in as **Kavya Poluru**, Chief compliance officer.

Built with Vite, React, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

- Author: Subrahmanyam Poluru
- Email: mail.polurus@gmail.com
- Website: [polurus.com](https://polurus.com)

## Features

- Full-width sticky header in `#B0CDE6` with live ticker, search, ⌘K, notifications, and account menu
- Command palette (`⌘K` / `Ctrl+K`) for navigation and submit-for-approval
- Simple sidebar: Overview, Inventory, Risk, Policies, Approvals, Audits, Exceptions, Controls, Settings
- Model inventory with risk filters, pagination, and per-system detail
- Residual risk bands, heatmap, and control coverage
- Policy library with attestation, approval queue with evidence upload, audits, and exceptions
- SVG area, bar, donut, and sparkline charts
- Light theme powered by the Enterprise Design System

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run locally

```bash
cd ai-governance-compliance-dashboard
npm install
npm run dev
```

Vite prints the local development URL (default http://127.0.0.1:5191). The dashboard starts at:

```text
/governance/overview
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Vitest unit tests |

## Routes

All dashboard routes use the `/governance` base path.

| Route | View |
| --- | --- |
| `/governance/overview` | Inventory health, reviews, open approvals |
| `/governance/inventory` | Registered systems and filters |
| `/governance/inventory/:id` | System record, coverage, activity |
| `/governance/risk` | Residual risk bands and heatmap |
| `/governance/policies` | Policy library and attestation |
| `/governance/approvals` | Change requests and decisions |
| `/governance/audits` | Walkthroughs and findings |
| `/governance/exceptions` | Time-boxed waivers |
| `/governance/controls` | Mapped controls and enablement |
| `/governance/settings` | Workspace, team, and alerts |

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
  lib/          Format, status, inventory, and search helpers
  pages/        Route-level screens
  test/         Vitest setup
```

Reusable UI lives under `components/`, route screens under `pages/`, fixtures under `data/`, and pure helpers under `lib/`. To connect live data, replace the fixtures in `src/data/` with API calls at the page or widget boundary and keep the existing component shapes.

## Stack

- React 18
- Vite
- React Router
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
- Vitest
