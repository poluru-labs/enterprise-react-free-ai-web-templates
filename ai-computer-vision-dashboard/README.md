# AI Computer Vision Dashboard

A compact React dashboard starter for computer vision operations. The current screen provides a responsive shell with Overview, Analytics, and Settings navigation, a notification affordance, and three metric slots ready to connect to vision model data.

This template is intentionally frontend-only. Its metrics currently use placeholders, so it is suitable as a starting point for connecting image, video, or model telemetry APIs.

## Features

- Responsive Bootstrap-based dashboard layout
- Light theme through the Enterprise Design System
- Sidebar navigation for Overview, Analytics, and Settings
- Notification control in the main header
- Three responsive metric cards for computer vision KPIs
- Vite development and production workflows

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the app for production. |
| `npm run preview` | Preview the production build locally. |

## Project Structure

```text
src/
  App.jsx     Main dashboard layout and placeholder metrics
  App.css     Application styles
  main.jsx    React entry point
```

## Extending the Dashboard

Replace the placeholder values in `src/App.jsx` with metrics such as inference volume, average latency, detection confidence, model throughput, or error rate. Add charts and API integrations as the Analytics and Settings navigation items become functional.

## Tech Stack

- React 18
- Vite
- Bootstrap and Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`