# AI Robotics Fleet Dashboard

FleetPulse — monitor robots, missions, battery levels, telemetry, and maintenance on a light desk powered by `@poluru-labs/enterprise-design-system-react`. Brand accent `#BD114A`, Roboto and Lato via Google Fonts.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5204

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build (port 4204) |

## Routes

- `/fleet/overview` — Fleet snapshot and zone mix
- `/fleet/robots` — Units, zones, and status
- `/fleet/missions` — Routes, tasks, and ETAs
- `/fleet/battery` — SOC bands and charge docks
- `/fleet/telemetry` — Streams, site map, and alerts
- `/fleet/maintenance` — Work orders and shop queue
- `/fleet/settings` — Alert windows, SOC floors, and exports

## Footer

Created by [Subrahmanyam Poluru](https://polurus.com). Built with [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).
