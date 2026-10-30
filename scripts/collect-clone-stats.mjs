#!/usr/bin/env node
/**
 * Fetches repository clone (and view) traffic from the GitHub REST API and
 * merges snapshots into .internal/clone-stats/history.json.
 *
 * Requires a token with push access to the repo (GITHUB_TOKEN in Actions, or
 * CLONE_STATS_TOKEN / GH_TOKEN locally).
 *
 * @see https://docs.github.com/en/rest/metrics/traffic
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const API_VERSION = '2022-11-28';
const OUT_DIR = path.join(process.cwd(), '.internal', 'clone-stats');
const HISTORY_PATH = path.join(OUT_DIR, 'history.json');
const LATEST_PATH = path.join(OUT_DIR, 'latest.json');

function resolveToken() {
  const token =
    process.env.CLONE_STATS_TOKEN ||
    process.env.GH_TOKEN ||
    process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      'Missing API token. Set CLONE_STATS_TOKEN, GH_TOKEN, or GITHUB_TOKEN.',
    );
  }
  return token;
}

function resolveRepo() {
  const envRepo = process.env.GITHUB_REPOSITORY;
  if (envRepo?.includes('/')) {
    const [owner, repo] = envRepo.split('/');
    return { owner, repo, slug: envRepo };
  }
  const remote = process.env.CLONE_STATS_REPO;
  if (remote?.includes('/')) {
    const [owner, repo] = remote.split('/');
    return { owner, repo, slug: remote };
  }
  throw new Error(
    'Could not resolve repository. Set GITHUB_REPOSITORY (Actions) or CLONE_STATS_REPO=owner/repo.',
  );
}

async function ghGet(token, url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': API_VERSION,
      'User-Agent': 'enterprise-react-templates-clone-stats',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub API ${response.status} ${response.statusText} for ${url}\n${body}`,
    );
  }

  return response.json();
}

function mergeDaily(existing = [], incoming = []) {
  const byTs = new Map(existing.map((row) => [row.timestamp, row]));
  for (const row of incoming) {
    byTs.set(row.timestamp, row);
  }
  return [...byTs.values()].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  );
}

async function loadHistory() {
  if (!existsSync(HISTORY_PATH)) {
    return {
      schemaVersion: 1,
      repository: null,
      firstCollectedAt: null,
      lastCollectedAt: null,
      reports: [],
      clonesDaily: [],
      viewsDaily: [],
    };
  }
  const raw = await readFile(HISTORY_PATH, 'utf8');
  return JSON.parse(raw);
}

async function main() {
  const token = resolveToken();
  const { owner, repo, slug } = resolveRepo();
  const base = `https://api.github.com/repos/${owner}/${repo}/traffic`;

  const [clonesPayload, viewsPayload] = await Promise.all([
    ghGet(token, `${base}/clones?per=day`),
    ghGet(token, `${base}/views?per=day`),
  ]);

  const collectedAt = new Date().toISOString();

  const snapshot = {
    collectedAt,
    repository: slug,
    api: {
      clones: 'GET /repos/{owner}/{repo}/traffic/clones?per=day',
      views: 'GET /repos/{owner}/{repo}/traffic/views?per=day',
      note: 'GitHub returns at most the last 14 days per request.',
    },
    clones: {
      count: clonesPayload.count ?? 0,
      uniques: clonesPayload.uniques ?? 0,
      daily: clonesPayload.clones ?? [],
    },
    views: {
      count: viewsPayload.count ?? 0,
      uniques: viewsPayload.uniques ?? 0,
      daily: viewsPayload.views ?? [],
    },
  };

  await mkdir(OUT_DIR, { recursive: true });

  const history = await loadHistory();
  history.repository = slug;
  history.lastCollectedAt = collectedAt;
  if (!history.firstCollectedAt) {
    history.firstCollectedAt = collectedAt;
  }

  history.reports.push({
    collectedAt,
    clonesTotal: snapshot.clones.count,
    clonesUniques: snapshot.clones.uniques,
    viewsTotal: snapshot.views.count,
    viewsUniques: snapshot.views.uniques,
    dailyCloneDays: snapshot.clones.daily.length,
    dailyViewDays: snapshot.views.daily.length,
  });

  history.clonesDaily = mergeDaily(history.clonesDaily, snapshot.clones.daily);
  history.viewsDaily = mergeDaily(history.viewsDaily, snapshot.views.daily);

  await writeFile(HISTORY_PATH, `${JSON.stringify(history, null, 2)}\n`, 'utf8');
  await writeFile(LATEST_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${path.relative(process.cwd(), HISTORY_PATH)}`);
  console.log(`Wrote ${path.relative(process.cwd(), LATEST_PATH)}`);
  console.log(
    `Snapshot: clones ${snapshot.clones.count} (${snapshot.clones.uniques} uniques), views ${snapshot.views.count} (${snapshot.views.uniques} uniques)`,
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
