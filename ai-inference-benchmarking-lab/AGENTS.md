# ai-inference-benchmarking-lab — dashboard agent

Implement the dashboard **only inside** `ai-inference-benchmarking-lab/`. Shared design rules live in [`../AGENTS.md`](../AGENTS.md); follow both documents.

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-inference-benchmarking-lab` |
| Product title | **Inference Benchmarking Lab** |
| Domain | Run history, latency/throughput stats, hardware profiles, and benchmark suites — lab ops, not “AI platform” copy. |

## Per-directory prompt (verbatim)

```text
create a stunning dashoard for ai-inference-benchmarking-lab directory use theme colors as #170C79 use light theme

fake names ending with Poluru, keep simple sidebar no ai content, use googel fonts Roboto, Lato

max use all components from @poluru-labs/enterprise-design-system-react clean neat design

add footer section author name Created by Subrahmanyam Poluru link to polurus.com and Built with @poluru-labs/enterprise-design-system-react with npm link
```

## Dashboard content

Use **SideNav** with 4–6 flat nav items tailored to **Inference Benchmarking Lab**. Build overview metrics, a primary data view (`DataTable` / `List`), activity (`Timeline` or `Stepper`), and lightweight filters (`Search`, `Select`, `SegmentedControl`). Use mock data and assignees whose names end with **Poluru**.

Meet the parent checklist: **≥12 distinct** `@poluru-labs/enterprise-design-system-react` components, light theme, **`#170C79`** brand tokens, Roboto + Lato in `index.html`, required **footer** links.

## Git commits (required — minimum 3)

When you implement or refresh this dashboard, end with **at least three separate commits**. Stage paths under `ai-inference-benchmarking-lab/` only; never commit `node_modules/`.

| Commit | Scope | Example message |
|--------|--------|-----------------|
| 1 | `index.html` fonts/meta, brand CSS tokens, providers, shell layout (`SideNav`, `Toolbar`) | `feat(inference-benchmarking-lab): add dashboard shell and indigo light theme` |
| 2 | Domain sections, mock data, design-system components | `feat(inference-benchmarking-lab): add inference benchmarking lab overview and data views` |
| 3 | Footer credits, polish, `npm run build` fixes | `chore(inference-benchmarking-lab): add footer credits and confirm production build` |

You may split into more than three commits if clearer; do **not** finish with fewer than three. Use imperative conventional commit subjects.

## Verification

From `ai-inference-benchmarking-lab/`:

```bash
npm install
npm run build
```

Fix any build errors before the final commit.
