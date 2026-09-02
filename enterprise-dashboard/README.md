# Poluru DC — Enterprise Dashboard

Data center operations dashboard built with **Vite**, **React 19**, **TypeScript**, **React Router**, and **SCSS**, using [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

## Features

- Frosted-glass header with facility switcher, live PUE + cooling sparkline, slash search, ⌘K command palette, theme toggle, and **Ack critical**
- Nested routes via `Outlet` in `DashboardLayout`
- Equal-height KPI and facility cards
- Live alert acknowledgment shared between the header and Alerts page
- Roboto + Roboto Mono, brand primary `#30AFFF`

## Folder structure

```
src/
  App.tsx
  main.tsx
  constants/navigation.ts
  data/                 typed modules (facilities, alerts, tickets, …)
  hooks/useCommandPalette.ts
  lib/format.ts, search.ts, status.ts
  components/layout/    DashboardLayout, Navbar, Sidebar
  components/widgets/   PageHeader, StatCard, charts wrappers
  components/charts/    Sparkline, AreaChart, BarChart (SVG, no extra deps)
  pages/
  styles/
  test/setup.ts
```

## Unique header

A translucent sky glass bar (`backdrop-filter: blur(16px)`, `color-mix` with `#30AFFF` ~12%), not a navy/violet/emerald/orange strip.

- Left: facility switcher (Chicago ORD-1, Ashburn IAD-2, Dallas DFW-1, San Jose SJC-3, Atlanta ATL-1, Seattle SEA-2, plus All facilities)
- Center: live fleet PUE, cooling sparkline, `12 sites · US`
- Inset search with `/` hint (opens the search modal; Enter goes to `/search?q=`)
- ⌘K command palette for pages, facilities, and tickets
- Right: theme toggle, notifications, Ack critical, avatar **Venkata Poluru** (Facilities lead)

## Routes

| Path | Page |
| --- | --- |
| `/` | Overview — 6 KPI cards, regional health, capacity, alerts, tickets |
| `/facilities` | Facility cards/table |
| `/facilities/:id` | Campus detail — racks, PUE chart, hosts, alerts |
| `/infrastructure` | Host tabs, filter, inspect drawer |
| `/power` | PUE / cooling metrics + 7-day area chart |
| `/capacity` | Fill forecasts & risk cards |
| `/maintenance` | Windows, stepper, timeline |
| `/alerts` | Filters, ack flow, detail drawer |
| `/tickets` | Incident/change tickets + pagination |
| `/search` | Results from `?q=` |
| `/settings` | Org, alerting, display prefs |

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm test` | Run Vitest unit tests |
| `npm run build` | Typecheck + production build (`tsc -b && vite build`) |
| `npm run preview` | Preview production build |
