# Nexus · SaaS control plane

React admin dashboard for multi-tenant SaaS on Poluru Cloud. Light floating emerald header (`#059669`) on canvas `#F4FBF7`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

Signed in as **Lakshmi Poluru**, platform admin.

## Run

Requires Node.js 20+.

```bash
cd ai-saas-admin-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5188

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5188) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (port 4188) |
| `npm test` | Vitest unit tests |

## Theme

- Brand emerald `#059669`
- Supporting `#047857`, `#10B981`, `#D1FAE5`
- Canvas `#F4FBF7`
- Font: Plus Jakarta Sans
- CSS prefix: `nx-`

The header is a cream floating bar with a 3px emerald gradient rule, a mint pill search in the center, a Platform / Billing / Security switcher, and a thin KPI ribbon (MRR, churn, seats, failed invoices) under the search.

## Routes

Base path: `/saas-admin`

| Path | Page |
| --- | --- |
| `/saas-admin/overview` | MRR, tenants, seats, plan mix, tenant health |
| `/saas-admin/tenants` | Tenant table, status filters, suspend / restore |
| `/saas-admin/tenants/:id` | Tenant workspace: plan, seats, usage, invoices, flags |
| `/saas-admin/users` | Users table and invite modal |
| `/saas-admin/plans` | Equal-height Starter / Team / Scale / Enterprise cards |
| `/saas-admin/usage` | Usage by tenant, token and API bars |
| `/saas-admin/billing` | Invoices, dunning, MRR trend |
| `/saas-admin/flags` | Feature flags with switch toggles |
| `/saas-admin/audit` | Security event log |
| `/saas-admin/search` | Cross-search tenants, users, invoices |
| `/saas-admin/settings` | Workspace, alerts, team |

## Structure

```
src/
  App.jsx, main.jsx, App.css
  constants/navigation.js
  data/*.json
  hooks/useCommandPalette.js
  lib/format.js, search.js, status.js
  components/layout/
  components/charts/
  components/widgets/
  pages/
  test/setup.js
```

## Stack

- React 18
- React Router 6
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
- Vitest + Testing Library
