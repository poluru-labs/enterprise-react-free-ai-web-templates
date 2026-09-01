export const STATUS_TONE = {
  live: 'success',
  online: 'success',
  healthy: 'success',
  deployed: 'success',
  approved: 'success',
  resolved: 'success',
  closed: 'success',
  ready: 'success',
  passing: 'success',
  degraded: 'warning',
  warning: 'warning',
  queued: 'warning',
  pending: 'warning',
  canary: 'warning',
  drift: 'warning',
  investigating: 'warning',
  in_review: 'info',
  reviewing: 'info',
  assigned: 'info',
  training: 'info',
  shadow: 'info',
  offline: 'danger',
  failed: 'danger',
  open: 'danger',
  critical: 'danger',
  rejected: 'danger',
  retired: 'neutral',
  archived: 'neutral',
  paused: 'neutral',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/\s+/g, '_');
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

export function confidenceTone(value) {
  const numeric = Number(value);
  const percent = numeric <= 1 ? numeric * 100 : numeric;
  if (Number.isNaN(percent)) return 'neutral';
  if (percent >= 90) return 'success';
  if (percent >= 70) return 'warning';
  return 'danger';
}
