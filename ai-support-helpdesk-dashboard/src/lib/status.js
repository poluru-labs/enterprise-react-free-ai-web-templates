export const STATUS_TONE = {
  production: 'success',
  published: 'success',
  passed: 'success',
  ok: 'success',
  healthy: 'success',
  resolved: 'success',
  live: 'success',
  enabled: 'success',
  online: 'success',
  open: 'info',
  waiting: 'warning',
  pending: 'warning',
  review: 'warning',
  needs_review: 'warning',
  warn: 'warning',
  watch: 'warning',
  draft: 'warning',
  error: 'danger',
  failed: 'danger',
  critical: 'danger',
  breached: 'danger',
  breach: 'danger',
  paused: 'neutral',
  disabled: 'neutral',
  offline: 'neutral',
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
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'p1') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'p2') return 'warning';
  if (key === 'low' || key === 'ok' || key === 'p3') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}
