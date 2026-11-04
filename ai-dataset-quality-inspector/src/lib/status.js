export const SCHEMA_STATUS = {
  Passing: 'success',
  Warning: 'warning',
  Failing: 'danger',
  Skipped: 'neutral',
};

export const ANOMALY_STATUS = {
  New: 'warning',
  Investigating: 'brand',
  Resolved: 'success',
  Accepted: 'neutral',
};

export const RULE_STATUS = {
  Active: 'success',
  Draft: 'info',
  Deprecated: 'neutral',
  Blocked: 'danger',
};

export const RELEASE_STATUS = {
  Ready: 'success',
  'At risk': 'warning',
  Blocked: 'danger',
  Shipped: 'neutral',
};
