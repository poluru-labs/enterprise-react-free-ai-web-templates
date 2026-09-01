export const STATUS_TONE = {
  ready: 'success',
  indexing: 'warning',
  stale: 'danger',
  synced: 'success',
  connected: 'success',
  disconnected: 'danger',
  healthy: 'success',
  degraded: 'warning',
  offline: 'danger',
  paused: 'neutral',
  live: 'success',
  needs_review: 'warning',
  resolved: 'success',
  excellent: 'success',
  good: 'success',
  fair: 'warning',
  poor: 'danger',
  pending: 'warning',
  running: 'info',
  completed: 'success',
  failed: 'danger',
  online: 'success',
  uploaded: 'info',
  crawled: 'success',
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
