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

### Required: `CLONE_STATS_TOKEN` (GitHub Actions)

Traffic endpoints return **403 Resource not accessible by integration** for the default `GITHUB_TOKEN`. You must store a **Personal Access Token** as a repo secret (never commit it to git).

#### 1. Create a token (pick one)

**Classic PAT (simplest)**  
GitHub → **Settings** (your profile) → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**:

- Note: `clone-traffic-report`
- Expiration: 90 days or custom (set a calendar reminder to rotate)
- Scopes: **`repo`** (full control of private repositories)

**Fine-grained PAT**  
**Developer settings** → **Fine-grained tokens** → **Generate**:

- Resource owner: `poluru-labs`
- Repository access: **Only** `enterprise-react-free-ai-web-templates`
- Permissions:
  - **Contents**: Read and write (needed so the same token can push JSON commits)
  - **Metadata**: Read-only

Traffic metrics still require a **user** token; fine-grained with Contents + Metadata is usually enough for `/traffic/clones`.

#### 2. Save it as a repository secret (not `.env` in the repo)

1. Open **`poluru-labs/enterprise-react-free-ai-web-templates`** on GitHub.
2. **Settings** → **Secrets and variables** → **Actions**.
3. **New repository secret**
   - Name: **`CLONE_STATS_TOKEN`** (exact spelling)
   - Value: paste the PAT → **Add secret**.

The workflow already uses:

`secrets.CLONE_STATS_TOKEN || github.token`

After the secret exists, re-run **Actions → Clone traffic report → Run workflow**.

#### 3. Do not

- Put the PAT in `.env`, `vite.config`, or any committed file.
- Use **Variables** for the token unless your org treats them as non-secret (secrets are encrypted; use secrets).

#### 4. Optional: run locally

```bash
export GH_TOKEN=ghp_....   # same PAT value, only on your machine
export CLONE_STATS_REPO=poluru-labs/enterprise-react-free-ai-web-templates
node scripts/collect-clone-stats.mjs
```
