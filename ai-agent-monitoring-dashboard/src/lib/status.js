export const STATUS_TONE = {
  running: 'info',
  in_progress: 'info',
  queued: 'warning',
  completed: 'success',
  resolved: 'success',
  healthy: 'success',
  watching: 'info',
  mitigated: 'success',
  failed: 'danger',
  error: 'danger',
  severe: 'danger',
  active: 'danger',
  handed_off: 'warning',
  pending: 'warning',
  assigned: 'info',
  degraded: 'warning',
  critical: 'danger',
  paused: 'neutral',
  stale: 'warning',
  saturated: 'danger',
  watch: 'warning',
  failing: 'danger',
  slow: 'warning',
  timeout: 'warning',
  tool_error: 'danger',
  validation_error: 'info',
  hallucinated_action: 'warning',
  memory_overflow: 'danger',
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
