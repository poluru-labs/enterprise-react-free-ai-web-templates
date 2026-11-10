# Document Assistant (DocDesk)

TypeScript enterprise workspace for **document library**, **templates**, **review queue**, **assistant chat**, and **drafting playbooks**. Brand color **`#005A9C`**, Roboto and Lato.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript project build |

## Routes

| Path | Feature |
| --- | --- |
| `/` | Overview KPIs |
| `/documents` | Document library |
| `/templates` | Template catalog |
| `/reviews` | Review queue |
| `/chat` | Document assistant |
| `/agents` | Playbooks |
| `/settings` | Workspace settings |

## Agent notes

See **`AGENTS.md`** for identity, required features, brand tokens, and the **five-commit** implementation checklist.

Footer credits: [Subrahmanyam Poluru](https://polurus.com) · [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)
