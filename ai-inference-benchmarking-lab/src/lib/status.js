export const RUN_STATUS = {
  Complete: 'success',
  Running: 'brand',
  Failed: 'danger',
  Queued: 'warning',
};

export const METRIC_STATUS = {
  Healthy: 'success',
  Watch: 'warning',
  Regressed: 'danger',
  Baseline: 'neutral',
};

export const HARDWARE_STATUS = {
  Online: 'success',
  Maintenance: 'warning',
  Provisioning: 'info',
  Retired: 'neutral',
};

export const SUITE_STATUS = {
  Active: 'success',
  Draft: 'info',
  Paused: 'warning',
  Deprecated: 'neutral',
};
