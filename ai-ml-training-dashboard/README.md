# Kiln Training

React ML training dashboard for Poluru Cloud. Theme color is `#DE3E3E`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

Signed in as **Kavya Poluru**, training lead.

## Run

Requires Node.js 20+.

```bash
cd ai-ml-training-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5184

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Routes

| Hash | Page |
| --- | --- |
| `#/overview` | Live jobs, GPU heat, coaching |
| `#/runs` | Filterable training jobs |
| `#/run/:id` | Run workspace |
| `#/experiments` | Experiment cards |
| `#/datasets` | Lineage tree and quality |
| `#/models` | Registry |
| `#/clusters` | Regional GPU capacity |
| `#/settings` | Profile, alerts, CLI |

## Stack

- React 18
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
