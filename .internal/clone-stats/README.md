# Clone traffic analytics (maintainer)

This folder is updated by GitHub Actions (`.github/workflows/clone-traffic-report.yml`). The workflow uses **shell steps only** (no marketplace actions). It stores **aggregate** clone and view traffic from the [GitHub repository traffic API](https://docs.github.com/en/rest/metrics/traffic)—not individual clone events (GitHub does not expose those).

| File | Purpose |
| --- | --- |
| `latest.json` | Most recent API snapshot |
| `history.json` | Merged daily series + one row per automated collection run |

## Privacy

- On a **private** repository, only people with access to the repo can see these files.
- On a **public** repository, this folder is public too. Keep the repo private if you want this data visible only to you and collaborators.

---

## Required secret: `CLONE_STATS_TOKEN`

The traffic API **does not work** with the default Actions `GITHUB_TOKEN`. It also **does not work** with many fine-grained PATs unless they are configured exactly as below.

### Option A — Fine-grained PAT (recommended for org repos)

1. GitHub → your profile **Settings** → **Developer settings** → **Fine-grained personal access tokens** → **Generate new token**.
2. **Resource owner**: **`poluru-labs`** (the organization — **not** your personal account).  
   Wrong owner → `403 Resource not accessible by personal access token`.
3. **Repository access**: **Only select repositories** → `enterprise-react-free-ai-web-templates`.
4. **Repository permissions**:
   - **Administration**: **Read-only** ← required for `/traffic/clones` and `/traffic/views`
   - (Contents/Metadata alone are **not** enough)
5. Generate and copy the token.
6. If the org requires approval: **poluru-labs** org **Settings** → **Personal access tokens** → approve the request.
7. Repo **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - Name: **`CLONE_STATS_TOKEN`**
   - Value: the token

Git **push** uses the workflow’s built-in `github.token`, not this PAT.

### Option B — Classic PAT

1. **Tokens (classic)** → generate with scope **`repo`**.
2. If `poluru-labs` uses SAML SSO: open the token → **Configure SSO** → **Authorize** for **poluru-labs**.
3. Save as repository secret **`CLONE_STATS_TOKEN`** (same as above).

---

## Run

After the secret is set: **Actions** → **Clone traffic report** → **Run workflow**.

Schedule: 1st and 15th of each month (~every 14 days). Edit the `cron` in the workflow file to change it.

### Local test

```bash
export GH_TOKEN=ghp_....   # same PAT as CLONE_STATS_TOKEN
export CLONE_STATS_REPO=poluru-labs/enterprise-react-free-ai-web-templates
node scripts/collect-clone-stats.mjs
```

Never commit tokens to the repository.
