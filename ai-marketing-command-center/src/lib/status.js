export const STATUS_TONE = {
  production: 'success',
  published: 'success',
  passed: 'success',
  passing: 'success',
  ok: 'success',
  healthy: 'success',
  resolved: 'success',
  live: 'success',
  sending: 'success',
  converting: 'success',
  running: 'success',
  streaming: 'success',
  succeeded: 'success',
  fresh: 'success',
  enabled: 'success',
  approved: 'success',
  granted: 'success',
  active: 'success',
  compliant: 'success',
  review: 'warning',
  needs_review: 'warning',
  in_review: 'warning',
  pending: 'warning',
  warn: 'warning',
  watch: 'warning',
  delayed: 'warning',
  stale: 'warning',
  queued: 'warning',
  scheduled: 'warning',
  draft: 'warning',
  exception: 'warning',
  error: 'danger',
  failed: 'danger',
  failing: 'danger',
  critical: 'danger',
  rejected: 'danger',
  denied: 'danger',
  expired: 'danger',
  breached: 'danger',
  paused: 'neutral',
  disabled: 'neutral',
  retired: 'neutral',
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
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'failing') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'delayed') {
    return 'warning';
  }
  if (key === 'low' || key === 'ok' || key === 'fresh') return 'info';
  if (key === 'resolved' || key === 'passed' || key === 'passing') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error' || key === 'failed') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch' || key === 'delayed') {
    return 'warning';
  }
  return 'success';
}
