export const STATUS_TONE = {
  passed: 'success',
  pass: 'success',
  live: 'success',
  production: 'success',
  'needs_review': 'warning',
  watch: 'warning',
  running: 'info',
  queued: 'info',
  candidate: 'info',
  tuning: 'info',
  draft: 'info',
  review: 'info',
  failed: 'danger',
  fail: 'danger',
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
  if (key === 'critical' || key === 'high' || key === 'severe') return 'danger';
  if (key === 'medium' || key === 'moderate') return 'warning';
  if (key === 'low') return 'info';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached') return 'danger';
  if (key === 'risk' || key === 'at_risk') return 'warning';
  return 'success';
}
