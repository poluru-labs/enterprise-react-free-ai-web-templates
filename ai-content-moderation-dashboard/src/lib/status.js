export const STATUS_TONE = {
  pending: 'warning',
  assigned: 'info',
  in_review: 'info',
  reviewing: 'info',
  approved: 'success',
  allowed: 'success',
  rejected: 'danger',
  blocked: 'danger',
  removed: 'danger',
  escalated: 'danger',
  appealed: 'warning',
  open: 'warning',
  upheld: 'danger',
  overturned: 'success',
  auto_blocked: 'info',
  auto_allowed: 'neutral',
  shadow: 'neutral',
  warn: 'warning',
  enforce: 'success',
  enforcing: 'success',
  live: 'success',
  paused: 'neutral',
  disabled: 'neutral',
  regex: 'info',
  classifier: 'brand',
  hash_match: 'warning',
  trusted: 'success',
  probation: 'warning',
  revoked: 'danger',
  sla_ok: 'success',
  sla_risk: 'warning',
  sla_breach: 'danger',
  online: 'success',
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
