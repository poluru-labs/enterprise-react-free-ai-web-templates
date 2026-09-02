export const STATUS_TONE: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  production: 'success',
  published: 'success',
  passed: 'success',
  ok: 'success',
  healthy: 'success',
  resolved: 'success',
  live: 'success',
  enabled: 'success',
  operational: 'success',
  review: 'warning',
  needs_review: 'warning',
  warn: 'warning',
  watch: 'warning',
  draft: 'warning',
  hot: 'warning',
  degraded: 'warning',
  in_progress: 'warning',
  'in-progress': 'warning',
  error: 'danger',
  failed: 'danger',
  critical: 'danger',
  paused: 'neutral',
  disabled: 'neutral',
  maintenance: 'info',
  scheduled: 'info',
  completed: 'success',
  open: 'info',
};

export function statusTone(status?: string | null) {
  if (!status) return 'neutral';
  const key = String(status)
    .toLowerCase()
    .replace(/[\s-]+/g, '_');
  return STATUS_TONE[key] || STATUS_TONE[String(status).toLowerCase()] || 'neutral';
}

export function statusLabel(status?: string | null) {
  if (!status) return 'Unknown';
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function severityTone(severity?: string | null) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'p1') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'warning' || key === 'p2') {
    return 'warning';
  }
  if (key === 'low' || key === 'ok' || key === 'info' || key === 'p3') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status?: string | null) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}
