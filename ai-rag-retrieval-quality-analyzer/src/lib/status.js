export const QUERY_STATUS = {
  Healthy: 'success',
  Degraded: 'warning',
  Failed: 'danger',
  Sampling: 'info',
};

export const KPI_STATUS = {
  OnTarget: 'success',
  Watch: 'warning',
  Below: 'danger',
  Draft: 'neutral',
};

export const CORPUS_STATUS = {
  Indexed: 'success',
  Stale: 'warning',
  Gap: 'danger',
  Queued: 'brand',
};

export const REVIEW_STATUS = {
  Open: 'warning',
  Approved: 'success',
  Rejected: 'danger',
  Escalated: 'brand',
};
