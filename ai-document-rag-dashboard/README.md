# Contextly · AI Document RAG Dashboard

Contextly is a frontend dashboard for document ingestion, retrieval, and question answering. It is a self-contained Vite template: screens read local JSON fixtures so you can explore the knowledge base, connectors, collections, search playground, conversations, and evaluations without a backend.

Theme color is **`#0F766E`**. Paper canvas (`#F7F4EE`) with a teal brand and light sidebar. Signed in as **Maya Poluru**, Admin.

Built with Vite, React, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

- Author: Subrahmanyam Poluru
- Email: mail.polurus@gmail.com
- Website: [polurus.com](https://polurus.com)

## Features

- Teal document mark, workspace header, live index ticker, search, ⌘K, notifications, and account menu
- Command palette (`⌘K` / `Ctrl+K`) for navigation and upload
- Overview of indexed documents, query volume, source mix, and retrieval health
- Knowledge base with source/status filters and upload action
- Connector cards for Drive, Notion, SharePoint, and uploads
- Collections, search playground with citations, conversation review, and faithfulness evals
- Settings for retrieval models and team access
- SVG area, bar, donut, and sparkline charts
- Light theme powered by the Enterprise Design System

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run locally

```bash
cd ai-document-rag-dashboard
npm install
npm run dev
```

Vite prints the local development URL. The dashboard starts at:

```text
/document-rag/overview
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Vitest unit tests |

## Routes

All dashboard routes use the `/document-rag` base path.

| Route | View |
| --- | --- |
| `/document-rag/overview` | Index health, query volume, source mix |
| `/document-rag/knowledge-base` | Indexed documents, filters, upload |
| `/document-rag/sources` | Connectors and crawl health |
| `/document-rag/collections` | Topic clusters |
| `/document-rag/search` | Retrieval playground and citations |
| `/document-rag/conversations` | Live answer review |
| `/document-rag/evaluations` | Faithfulness, citation coverage, drift |
| `/document-rag/settings` | Models and team access |

## File structure

```text
src/
  App.jsx, main.jsx, App.css
  components/
    layout/     Shell, sidebar, header
    charts/     Area, bar, donut, sparkline
    widgets/    Cards, tables, filters, page header
  constants/    Navigation and signed-in user
  data/         Local JSON fixtures
  hooks/        Command palette
  lib/          Format, status, and search helpers
  pages/        Route-level screens
  test/         Vitest setup
```

Reusable UI lives under `components/`, route screens under `pages/`, fixtures under `data/`, and pure helpers under `lib/`. To connect live data, replace the fixtures in `src/data/` with API calls at the page or widget boundary and keep the existing component shapes.

## Stack

- React 18
- Vite
- React Router
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
- Vitest
