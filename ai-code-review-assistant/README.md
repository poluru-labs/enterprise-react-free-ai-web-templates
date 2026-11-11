# AI Code Review Assistant

Review diffs for bugs, security, and maintainability.

Modern React template with light/dark themes, SCSS modules, and an AI workspace shell.

**Brand color:** `#DC95FF`  
**Author:** [Subrahmanyam Poluru](https://polurus.com)

See [`AGENTS.md`](./AGENTS.md) for product features and agent working agreements.

## Screens

| Route | Feature |
| --- | --- |
| `/` | Overview with metrics and feature shortcuts |
| `/diffs` | Pull request diff with line comments and severity |
| `/heuristics` | Security and smell scan over pasted code |
| `/patches` | Suggested fixes to accept, dismiss, or copy as a diff |
| `/triage` | All findings by severity with merge-blocking status |
| `/chat` | Review chat against the mock AI API |
| `/agents` | Review bots catalog |
| `/settings` | Theme and workspace settings |

The diff, heuristics, patch, and triage screens use mock data and run fully in the
browser.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```
