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
| `npm test` | Vitest unit tests |

## Routes

| Path | Page |
| --- | --- |
| `/ml-training/overview` | Live jobs, GPU heat, coaching |
| `/ml-training/runs` | Filterable training jobs |
| `/ml-training/runs/:id` | Run workspace |
| `/ml-training/experiments` | Experiment cards |
| `/ml-training/datasets` | Lineage tree and quality |
| `/ml-training/models` | Registry |
| `/ml-training/clusters` | Regional GPU capacity |
| `/ml-training/checkpoints` | Epoch checkpoints |
| `/ml-training/settings` | Profile, alerts, CLI |

## Stack

- React 18
- Vite
- React Router 6
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
