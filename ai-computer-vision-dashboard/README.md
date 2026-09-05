# Sightline · Computer Vision Ops

Sightline is a production-quality React dashboard for computer vision operations. It is a self-contained Vite template: screens read local JSON fixtures so you can explore cameras, models, detections, datasets, annotations, incidents, and quality without a backend.

The control room uses a dark teal top bar (`#042F2E` → `#0F766E`) over a light content area. Theme color is **#0F766E**.

Signed-in operator: **Maya Poluru**, Vision ops lead.

## Screenshot
<img width="3360" height="3646" alt="image" src="https://github.com/user-attachments/assets/43173d0e-16de-415a-be43-5c70bfc2aa75" />


## Features

- Dark teal control-room header with iris mark, live telemetry chips, search, time range, refresh, notifications, and avatar menu
- Command palette (`⌘K` / `Ctrl+K`) via EDS Modal + Search
- Camera fleet, detections, incidents, models, datasets, annotation queue, and quality/drift views
- SVG area, bar, donut, and sparkline charts
- Equal-height Bootstrap cards and stat tiles
- Light teal sidebar with teal active navigation
- Workspace settings for on-call and alert channels

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run Locally

```bash
npm install
npm run dev
```

Vite prints the local URL. Open:

```text
/computer-vision/overview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm test` | Run the Vitest suite once. |
| `npm run build` | Build the app for production. |
| `npm run preview` | Preview the production build locally. |

## Routes

All dashboard routes use the `/computer-vision` base path.

| Route | View |
| --- | --- |
| `/computer-vision/overview` | Live cameras, inferences, mAP, GPU, incidents |
| `/computer-vision/cameras` | Filterable fleet + equal-height camera cards |
| `/computer-vision/models` | yolov8-warehouse, pose-safety, anpr-gate, defect-pcb |
| `/computer-vision/detections` | Forklift, PPE, person, plate, defect events |
| `/computer-vision/datasets` | night-shift-aug, defect-v3, ppe-q3 |
| `/computer-vision/annotations` | Frame review queue |
| `/computer-vision/incidents` | Safety misses and stream outages |
| `/computer-vision/quality` | Precision, recall, confusion, drift |
| `/computer-vision/search` | Workspace search |
| `/computer-vision/settings` | Workspace, on-call, alert channels |

## Project Structure

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

CSS class prefix: `cvd-`. Replace fixtures in `src/data/` with API calls when you wire a live vision stack.

## Tech Stack

- React 18
- Vite
- React Router
- Vitest + Testing Library
- Bootstrap and Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
