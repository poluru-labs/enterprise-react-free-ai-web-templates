export const RUN_STATUS = {
  Succeeded: 'success',
  Running: 'brand',
  Failed: 'danger',
  Queued: 'neutral',
};

export const ARTIFACT_STATUS = {
  Sealed: 'success',
  Drift: 'warning',
  Missing: 'danger',
  Draft: 'info',
};

export const ENV_STATUS = {
  Pinned: 'success',
  Drift: 'warning',
  Deprecated: 'danger',
  Candidate: 'neutral',
};

export const REPRO_STATUS = {
  Verified: 'success',
  InProgress: 'brand',
  Blocked: 'danger',
  Pending: 'warning',
};
