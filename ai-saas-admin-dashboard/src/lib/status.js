export const STATUS_TONE = {
  active: 'success',
  production: 'success',
  published: 'success',
  passed: 'success',
  paid: 'success',
  current: 'success',
  ok: 'success',
  healthy: 'success',
  resolved: 'success',
  live: 'success',
  enabled: 'success',
  restored: 'success',
  trial: 'warning',
  review: 'warning',
  needs_review: 'warning',
  warn: 'warning',
  watch: 'warning',
  draft: 'warning',
  invited: 'warning',
  pending: 'warning',
  past_due: 'warning',
  dunning: 'warning',
  error: 'danger',
  failed: 'danger',
  critical: 'danger',
  suspended: 'danger',
  overdue: 'danger',
  cancelled: 'danger',
  delinquent: 'danger',
  paused: 'neutral',
  disabled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/[\s-]+/g, '_');
  return STATUS_TONE[key] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'error') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn') return 'warning';
  if (key === 'low' || key === 'ok') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}
