# Prompt Bureau — prompt management

Corporate workspace for versioning, evaluating, and releasing enterprise
prompts. Light canvas with a **full-width sticky header** in brand
**`#162E93`**, plus a **simple sidebar**.

## Run

Requires Node.js 20+.

```bash
cd ai-prompt-management-dashboard
npm install
npm run dev
```

Default dev server: http://localhost:5187

| Route | Page |
| --- | --- |
| `#/overview` | Overview — KPIs, playground volume, health coach |
| `#/library` | Prompt catalog — filters, table, pagination |
| `#/versions` | Family tree, visibility, and editors |
| `#/playground` | Hybrid sandbox and grounded hits |
| `#/releases` | Draft → eval → canary → publish |
| `#/settings` | Evals, holds, and retention |

```bash
npm run build
```

## Stack

React 18, Vite 5, Bootstrap 5, Bootstrap Icons, Plus Jakarta Sans,
`@poluru-labs/enterprise-design-system-react`. Demo people include
**Sravani Poluru**, Lakshmi Poluru, Venkata Poluru, Meera Poluru, Hana Poluru,
Arjun Poluru, Priya Poluru, Nikhil Poluru, and Ramesh Poluru.

Copy and mock data live in `src/data.js`. Layout and brand color live in
`src/App.jsx` and `src/App.css`.
