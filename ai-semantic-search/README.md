# Enterprise AI Starter

Industry-standard React boilerplate for enterprise AI applications.

**Stack:** React 19 · TypeScript · Vite · React Router · SCSS (modules + 7-1)

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

## Folder structure

```text
src/
├── app/                 # App shell: providers, router, layouts
├── core/                # Cross-cutting: config, API, constants, domain types
├── features/            # Feature modules (dashboard, chat, agents, settings)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── index.ts
├── shared/              # Reusable UI, hooks, utils
├── styles/              # Global SCSS (abstracts → base → main)
│   ├── abstracts/       # tokens, mixins, functions
│   └── base/            # reset, typography
├── assets/
├── main.tsx
└── vite-env.d.ts
```

### Conventions

- **Feature-first:** keep domain UI, hooks, and pages colocated under `features/`
- **Core vs shared:** `core` owns infra/config/API; `shared` owns reusable presentation
- **Path alias:** import with `@/` (configured in Vite + TypeScript)
- **Styles:** global tokens in `styles/abstracts`; component styles as `*.module.scss`

## AI surface area

| Area | Location | Notes |
| --- | --- | --- |
| Env config | `src/core/config/env.ts` | Typed `VITE_*` values |
| HTTP client | `src/core/api/client.ts` | Timeout, JSON, `ApiError` |
| AI API | `src/core/api/ai.ts` | Chat + agents (mock fallback) |
| Domain types | `src/core/types/ai.ts` | Messages, agents, completions |
| Chat UX | `src/features/chat` | Conversation UI + `useChat` |
| Agents UX | `src/features/agents` | Agent catalog |

Wire `VITE_API_BASE_URL` to your AI gateway. Keep provider secrets on the server — never in the browser bundle.

## Environment

See `.env.example`:

- `VITE_APP_NAME` / `VITE_APP_ENV`
- `VITE_API_BASE_URL` / `VITE_API_TIMEOUT_MS`
- `VITE_AI_DEFAULT_MODEL` / `VITE_AI_STREAMING_ENABLED`

## Extend next

1. Add auth/session provider in `src/app/providers`
2. Replace mock responses in `src/core/api/ai.ts`
3. Add streaming helpers under `features/chat`
4. Introduce data fetching (TanStack Query) and form libs as needed
5. Add design-system primitives under `shared/components`
