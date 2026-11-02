export const DATASET_STATUS = {
  Current: 'success',
  Staged: 'warning',
  Quarantined: 'danger',
  Archived: 'neutral',
};

export const LINEAGE_STATUS = {
  Linked: 'success',
  Partial: 'warning',
  Broken: 'danger',
  Unknown: 'neutral',
};

export const CUSTODY_STATUS = {
  Open: 'warning',
  'In transit': 'brand',
  Sealed: 'success',
  Disputed: 'danger',
};

export const AUDIT_STATUS = {
  Recorded: 'success',
  Pending: 'warning',
  Redacted: 'neutral',
  Escalated: 'danger',
};
