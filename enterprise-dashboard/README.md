# Poluru DC — Enterprise Dashboard

Data center operations dashboard built with **Vite**, **React**, **React Router**, and **SCSS**, using [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

## Features

- Full-height sticky sidebar with collapse
- Global search modal (facilities, hosts, alerts, tickets)
- Notifications drawer + account menu
- Light theme with brand primary `#30AFFF`
- Light page and panel animations
- Roboto + Roboto Mono (Google Fonts)

### Routes

| Path | Page |
| --- | --- |
| `/` | Overview — KPIs, quick actions, capacity, alerts, activity, tickets |
| `/facilities` | Facility cards/table + detail drawer |
| `/infrastructure` | Host tabs, filter, inspect drawer |
| `/power` | PUE / cooling metrics |
| `/capacity` | Fill forecasts & risk |
| `/maintenance` | Windows, stepper, timeline |
| `/alerts` | Filters, ack flow, detail drawer |
| `/tickets` | Incident/change tickets + pagination |
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
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
