export const STATUS_TONE = {
  running: 'success',
  queued: 'warning',
  failed: 'danger',
  succeeded: 'success',
  live: 'success',
  blocked: 'danger',
  tuning: 'info',
  training: 'info',
  candidate: 'info',
  production: 'success',
  shipped: 'success',
  archived: 'neutral',
  hot: 'warning',
  ready: 'success',
  paused: 'neutral',
  promoted: 'success',
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
