# ai-research-reproducibility-workbench — dashboard agent

Implement the dashboard **only inside** `ds-react/ai-research-reproducibility-workbench/`. Shared design rules live in [`../AGENTS.md`](../AGENTS.md); follow both documents.

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-research-reproducibility-workbench` |
| Product title | **Research Reproducibility Workbench** |
| Domain | Experiment runs, artifacts, environment pins, and reproduction status tracking. |

## Per-directory prompt (verbatim)

```text
create a stunning dashoard for ai-research-reproducibility-workbench directory use theme colors as #4E1F6E use light theme

fake names ending with Poluru, keep simple sidebar no ai content, use googel fonts Roboto, Lato

max use all components from @poluru-labs/enterprise-design-system-react clean neat design

add footer section author name Created by Subrahmanyam Poluru link to polurus.com and Built with @poluru-labs/enterprise-design-system-react with npm link
```

## Dashboard content

Use **SideNav** with 4–6 flat nav items tailored to **Research Reproducibility Workbench**. Build overview metrics, a primary data view (`DataTable` / `List`), activity (`Timeline` or `Stepper`), and lightweight filters (`Search`, `Select`, `SegmentedControl`). Use mock data and assignees whose names end with **Poluru**.

Meet the parent checklist: **≥12 distinct** `@poluru-labs/enterprise-design-system-react` components, light theme, **`#4E1F6E`** brand tokens, Roboto + Lato in `index.html`, required **footer** links.

## Git commits (required — minimum 3)

When you implement or refresh this dashboard, end with **at least three separate commits**. Stage paths under `ds-react/ai-research-reproducibility-workbench/` only; never commit `node_modules/`.

| Commit | Scope | Example message |
|--------|--------|-----------------|
| 1 | `index.html` fonts/meta, brand CSS tokens, providers, shell layout (`SideNav`, `Toolbar`) | `feat(ds-react/research-reproducibility-workbench): add dashboard shell and purple light theme` |
| 2 | Domain sections, mock data, design-system components | `feat(ds-react/research-reproducibility-workbench): add research reproducibility workbench overview and data views` |
| 3 | Footer credits, polish, `npm run build` fixes | `chore(ds-react/research-reproducibility-workbench): add footer credits and confirm production build` |

You may split into more than three commits if clearer; do **not** finish with fewer than three. Use imperative conventional commit subjects.

## Verification

From `ds-react/ai-research-reproducibility-workbench/`:

```bash
npm install
npm run build
```

Fix any build errors before the final commit.
