# Prism Eval

React model evaluation dashboard for Poluru Cloud. Theme color is `#FF8383`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

Signed in as **Meera Poluru**, evaluation lead.

## Run

Requires Node.js 20+.

```bash
cd ai-model-evaluation-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5186

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Routes

| Hash | Page |
| --- | --- |
| `#/overview` | Pass rate, quality index, alerts |
| `#/leaderboard` | Ranked models and quality index |
| `#/suites` | Eval packs and gold datasets |
| `#/suite/:id` | Suite workspace |
| `#/runs` | Filterable evaluation jobs |
| `#/run/:id` | Run workspace |
| `#/compare` | Side-by-side model deltas |
| `#/review` | Human disagreement queue |
| `#/settings` | Profile, alerts, CLI |

## Stack

- React 18
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
