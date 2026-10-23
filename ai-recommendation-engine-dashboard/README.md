# AI Recommendation Engine Dashboard

Rankline — track recommendations, conversions, experiments, and catalog coverage on a light desk powered by `@poluru-labs/enterprise-design-system-react`.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5189

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Routes

- `/recommend/overview` — Serving snapshot
- `/recommend/recommendations` — Slots, models, and rank
- `/recommend/conversions` — Assisted orders and revenue
- `/recommend/experiments` — Traffic, lift, and guardrails
- `/recommend/catalog` — Coverage by department
- `/recommend/settings` — Windows, floors, and exports
