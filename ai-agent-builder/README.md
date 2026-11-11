# AI Agent Builder

Compose tools, prompts, and policies into production agents.

Modern React template with light/dark themes, SCSS modules, and an AI workspace shell.

**Brand color:** `#AE2448`  
**Author:** [Subrahmanyam Poluru](https://polurus.com)

See [`AGENTS.md`](./AGENTS.md) for product features and agent working agreements.

## Screens

| Route | Feature |
| --- | --- |
| `/` | Overview with metrics and shortcuts |
| `/graph` | Visual tool graph with node inspector |
| `/policies` | Tool, domain, and data allowlists with enable toggles |
| `/sandbox` | Scenario test runs with step traces |
| `/deployments` | Version history with review-gated promotion and rollback |
| `/chat` | Test chat against the mock AI API |
| `/agents` | Agent catalog |
| `/settings` | Theme and workspace settings |

All feature data is mocked under `src/features/*/data/`. Replace it with your
agent registry, policy engine, and deployment APIs.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```
