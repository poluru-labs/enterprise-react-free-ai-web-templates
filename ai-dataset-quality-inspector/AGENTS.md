# ai-dataset-quality-inspector — dashboard agent

Implement the dashboard **only inside** `ai-dataset-quality-inspector/`. Shared design rules live in [`../AGENTS.md`](../AGENTS.md); follow both documents.

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-dataset-quality-inspector` |
| Product title | **Dataset Quality Inspector** |
| Domain | Schema checks, anomaly counts, validation rules, and release readiness scores. |

## Per-directory prompt (verbatim)

```text
create a stunning dashoard for ai-dataset-quality-inspector directory use theme colors as #640D5F use light theme

fake names ending with Poluru, keep simple sidebar no ai content, use googel fonts Roboto, Lato

max use all components from @poluru-labs/enterprise-design-system-react clean neat design

add footer section author name Created by Subrahmanyam Poluru link to polurus.com and Built with @poluru-labs/enterprise-design-system-react with npm link
```

## Dashboard content

Use **SideNav** with 4–6 flat nav items tailored to **Dataset Quality Inspector**. Build overview metrics, a primary data view (`DataTable` / `List`), activity (`Timeline` or `Stepper`), and lightweight filters (`Search`, `Select`, `SegmentedControl`). Use mock data and assignees whose names end with **Poluru**.

Meet the parent checklist: **≥12 distinct** `@poluru-labs/enterprise-design-system-react` components, light theme, **`#640D5F`** brand tokens, Roboto + Lato in `index.html`, required **footer** links.

## Git commits (required — minimum 3)

When you implement or refresh this dashboard, end with **at least three separate commits**. Stage paths under `ai-dataset-quality-inspector/` only; never commit `node_modules/`.

| Commit | Scope | Example message |
|--------|--------|-----------------|
| 1 | `index.html` fonts/meta, brand CSS tokens, providers, shell layout (`SideNav`, `Toolbar`) | `feat(dataset-quality-inspector): add dashboard shell and purple light theme` |
| 2 | Domain sections, mock data, design-system components | `feat(dataset-quality-inspector): add dataset quality inspector overview and data views` |
| 3 | Footer credits, polish, `npm run build` fixes | `chore(dataset-quality-inspector): add footer credits and confirm production build` |

You may split into more than three commits if clearer; do **not** finish with fewer than three. Use imperative conventional commit subjects.

## Verification

From `ai-dataset-quality-inspector/`:

```bash
npm install
npm run build
```

Fix any build errors before the final commit.
