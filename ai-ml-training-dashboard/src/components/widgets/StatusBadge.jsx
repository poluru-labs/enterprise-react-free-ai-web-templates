import { Badge, Status } from '@poluru-labs/enterprise-design-system-react';
import { severityTone, slaTone, statusLabel, statusTone } from '../../lib/status.js';

export function StatusBadge({ status, pulse = false }) {
  const tone = statusTone(status);
  const label = statusLabel(status);
  const live = pulse || status === 'Running' || status === 'Live';

  if (live) {
    return <Status label={label} variant={tone === 'brand' ? 'info' : tone} pulse />;
  }

  return <Badge label={label} variant={tone === 'brand' ? 'info' : tone} soft pill size="sm" />;
}

export function SeverityBadge({ severity }) {
  return <Badge label={statusLabel(severity)} variant={severityTone(severity)} soft pill size="sm" />;
}

export function SlaBadge({ sla }) {
  const tone = slaTone(sla);
  return <Badge label={statusLabel(sla === 'ok' ? 'SLA ok' : sla)} variant={tone} pill size="sm" />;
}
