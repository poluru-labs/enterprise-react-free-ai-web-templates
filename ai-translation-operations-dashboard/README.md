# AI Translation Operations Dashboard

LocalePulse — track translations, language coverage, terminology, and reviews on a light operations desk powered by `@poluru-labs/enterprise-design-system-react`. Brand accent `#E11A45`, **Lato** via Google Fonts.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5206

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build (port 4206) |

## Routes

- `/translate/overview` — Operations snapshot and locale mix
- `/translate/translations` — Jobs, locales, and publish status
- `/translate/coverage` — Language completion and gaps
- `/translate/terminology` — Glossary and conflicts
- `/translate/reviews` — Linguist QA queue
- `/translate/settings` — MT policy, floors, and exports

## Footer

Created by [Subrahmanyam Poluru](https://polurus.com). Built with [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).
