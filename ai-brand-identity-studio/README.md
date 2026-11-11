# AI Brand Identity Studio

Explore voice, naming, and visual direction with guardrails.

Modern React template with light/dark themes, SCSS modules, and an AI workspace shell.

**Brand color:** `#00105B`  
**Author:** [Subrahmanyam Poluru](https://polurus.com)

See [`AGENTS.md`](./AGENTS.md) for product features and agent working agreements.

## Screens

| Route | Feature |
| --- | --- |
| `/` | Overview with metrics and shortcuts |
| `/voice` | Voice traits, tone by channel, and a copy check |
| `/naming` | Name candidates with scores, shortlist, and reject |
| `/palettes` | Wordmark lockups and WCAG contrast matrix |
| `/compliance` | Asset checks by category with resolve actions |
| `/chat` | Brand chat against the mock AI API |
| `/agents` | Brand agents catalog |
| `/settings` | Theme and workspace settings |

All feature data is mocked under `src/features/*/data/`.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```
