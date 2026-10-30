# Clone traffic analytics (maintainer)

This folder is updated by GitHub Actions (`.github/workflows/clone-traffic-report.yml`). The workflow uses **shell steps only** (no `actions/checkout` / `actions/setup-node`) so it complies with org policies that restrict third-party actions. It stores **aggregate** clone and view traffic from the [GitHub repository traffic API](https://docs.github.com/en/rest/metrics/traffic)—not individual clone events (GitHub does not expose those).

| File | Purpose |
| --- | --- |
| `latest.json` | Most recent API snapshot |
| `history.json` | Merged daily series + one row per automated collection run |

## Privacy

- On a **private** repository, only people with access to the repo can see these files.
- On a **public** repository, this folder is public too. Keep the repo private if you want this data visible only to you and collaborators.

## Local run

```bash
export GH_TOKEN=ghp_...   # classic PAT with `repo` scope, or fine-grained with Contents read + Metadata
export CLONE_STATS_REPO=owner/repo   # optional outside Actions; Actions sets GITHUB_REPOSITORY
node scripts/collect-clone-stats.mjs
```

If the default `GITHUB_TOKEN` in Actions cannot read traffic (some org policies block it), add a repository secret **`CLONE_STATS_TOKEN`** with a PAT that has push access to this repo.
