# Relay · AI support desk

React helpdesk dashboard for tickets, SLA clocks, macros, and copilot drafts. Warm cream header (`#FFF7ED`) with a 6px orange accent and brand `#EA580C`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

Signed in as **Meera Poluru**, support lead (`meera.poluru@polurulabs.example`).

## Run

Requires Node.js 20+.

```bash
cd ai-support-helpdesk-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5189  
Preview: http://127.0.0.1:4189

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (5189) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (4189) |
| `npm test` | Vitest unit tests |

## Theme

- Brand orange `#EA580C`
- Supporting `#C2410C`, `#FDBA74`, `#FFF7ED`
- Canvas `#FFFBF5`
- CSS prefix `desk-`
- Font: Plus Jakarta Sans

Header signature: cream bar, ticket-stub / headset mark, three SLA countdown rings (P1 12m · P2 1h 4m · P3 4h), queue density dots + “47 open”, compact search, Assign next, and an agent-presence strip (“8 agents online”).

## Routes

Base path: `/helpdesk`

| Path | Page |
| --- | --- |
| `/helpdesk/overview` | KPIs, volume, queue mix, live tickets |
| `/helpdesk/inbox` | Working queue with filters and drawer |
| `/helpdesk/tickets` | Full ticket catalog |
| `/helpdesk/tickets/:id` | Thread, macros, AI draft, reply composer |
| `/helpdesk/customers` | Customer accounts |
| `/helpdesk/macros` | Canned replies |
| `/helpdesk/knowledge` | Copilot source articles |
| `/helpdesk/sla` | Policies and breaches |
| `/helpdesk/agents` | Load and occupancy |
| `/helpdesk/analytics` | CSAT, volume, deflection |
| `/helpdesk/search` | Cross-entity search |
| `/helpdesk/settings` | Routing, hours, team |

## Structure

```
src/
  App.jsx
  main.jsx
  App.css
  constants/navigation.js
  data/*.json
  hooks/useCommandPalette.js
  lib/format.js, search.js, status.js, tickets.js
  components/layout/
  components/charts/
  components/widgets/
  pages/
  test/setup.js
```
