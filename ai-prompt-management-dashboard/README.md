# Prompt Bureau

React prompt-management workspace for Poluru Cloud. Corporate navy **`#162E93`** with supporting `#122678`, `#3A52B0`, `#E8ECF8`, and canvas `#F3F5FA`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

**Prompt Bureau** — prompt control plane. Signed in as **Sravani Poluru**, prompt lead (`sravani.poluru@polurulabs.example`).

The sticky header is two rows, not a single dark command bar: a full-bleed navy mast (letter **P** mark, product name, `v12 live` chip, theme, notifications, account) plus a light paper tray (`#fff` / `#d5dced`) with an underlined navy search, live ticker chips, ⌘K, and **New prompt**.

## Run

Requires Node.js 20+.

```bash
cd ai-prompt-management-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5187 · preview: http://127.0.0.1:4187

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Vitest unit tests |

## Routes

Base path: `/prompt-management`

| Path | Page |
| --- | --- |
| `/prompt-management/overview` | KPIs, playground volume, health, live prompts, editor load |
| `/prompt-management/library` | Filterable catalog with pagination |
| `/prompt-management/library/:id` | Prompt detail — versions, score, owner, body |
| `/prompt-management/versions` | Family tree and version table |
| `/prompt-management/playground` | Model select, system prompt, mock completion, grounded hits |
| `/prompt-management/releases` | Draft → eval → canary → publish |
| `/prompt-management/evaluations` | Eval suites, pass rates, failing cases |
| `/prompt-management/experiments` | A/B prompt tests |
| `/prompt-management/search` | Workspace search from the navbar |
| `/prompt-management/settings` | Workspace, digest, PIN, file upload |

## Structure

```
src/
  App.jsx, main.jsx, App.css
  constants/navigation.js
  data/*.json
  hooks/useCommandPalette.js
  lib/format.js, search.js, status.js
  components/layout/DashboardLayout.jsx, DashboardNavbar.jsx, DashboardSidebar.jsx
  components/charts/, components/widgets/
  pages/*.jsx
  test/setup.js
```

## Stack

React 18, Vite 5, React Router, Bootstrap 5 + Bootstrap Icons, Plus Jakarta Sans,
`@poluru-labs/enterprise-design-system-react`. Demo people include **Sravani Poluru**,
Lakshmi, Venkata, Meera, Hana, Arjun, Priya, Nikhil, and Ramesh Poluru. Dates sit
around 24–30 Aug 2026.
