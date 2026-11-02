# ai-accessibility-auditor — dashboard agent

Implement the dashboard **only inside** `ds-react/ai-accessibility-auditor/`. Shared design rules live in [`../AGENTS.md`](../AGENTS.md); follow both documents.

## App identity

| Field | Value |
|-------|--------|
| Directory | `ai-accessibility-auditor` |
| Product title | **Accessibility Auditor** |
| Domain | WCAG conformance tracking, page scans, contrast issues, remediation queues, and team ownership — enterprise ops language, **not** AI/copilot marketing |

## Per-directory prompt (verbatim)

```text
create a stunning dashoard for ai-accessibility-auditor directory use theme colors as #640D5F use light theme

fake names ending with Poluru, keep simple sidebar no ai content, use googel fonts Roboto, Lato

max use all components from @poluru-labs/enterprise-design-system-react clean neat design

add footer section author name Created by Subrahmanyam Poluru link to polurus.com and Built with @poluru-labs/enterprise-design-system-react with npm link
```

## Dashboard content (suggested sections)

Use **SideNav** with 4–6 flat items, e.g. Overview, Audits, Findings, Reports, Settings. Example main areas:

1. **Overview** — `Stat`, `Badge`, `ProgressBar` / `Meter` for open issues, pages scanned, compliance score.
2. **Findings** — `DataTable` or `List` with severity `Tag` / `Status`, pages, and assignees (**Poluru** surnames).
3. **Activity** — `Timeline` of scan runs and fixes (static mock data).
4. **Filters** — `Search`, `Select`, `SegmentedControl` (local state only).
5. **Detail** — `Card`, `DescriptionList`, `Accordion` for a sample audit record.

Meet the parent checklist: **≥12 distinct** `@poluru-labs/enterprise-design-system-react` components, light theme, **`#640D5F`** brand tokens, Roboto + Lato in `index.html`, required **footer** links.

## Git commits (required — minimum 3)

When you implement or refresh this dashboard, end with **at least three separate commits**. Stage paths under `ds-react/ai-accessibility-auditor/` only; never commit `node_modules/`.

| Commit | Scope | Example message |
|--------|--------|-----------------|
| 1 | `index.html` fonts/meta, brand CSS tokens, `App.jsx` providers, shell layout (`SideNav`, `Toolbar`, main regions) | `feat(ds-react/accessibility-auditor): add dashboard shell and purple light theme` |
| 2 | Dashboard sections, mock audit data, design-system components (tables, stats, timeline) | `feat(ds-react/accessibility-auditor): add audit overview, findings, and activity views` |
| 3 | `AppFooter`, link targets, spacing polish, `npm run build` fixes | `chore(ds-react/accessibility-auditor): add footer credits and confirm production build` |

You may split into more than three commits if clearer; do **not** squash below three. Write subjects in imperative mood; body optional one line if needed.

## Verification

From `ds-react/ai-accessibility-auditor/`:

```bash
npm install
npm run build
```

Fix any build errors before the final commit.
