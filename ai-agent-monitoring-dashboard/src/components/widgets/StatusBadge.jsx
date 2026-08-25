import { Badge, Status } from '@poluru-labs/enterprise-design-system-react';
import { severityTone, statusLabel, statusTone } from '../../lib/status.js';

export function StatusBadge({ status, pulse = false }) {
  const tone = statusTone(status);
  const label = statusLabel(status);

  if (pulse || status === 'running' || status === 'active') {
    return <Status label={label} variant={tone} pulse={pulse || status === 'running' || status === 'active'} />;
  }

  return <Badge label={label} variant={tone} soft pill size="sm" />;
}

export function SeverityBadge({ severity }) {
  return <Badge label={statusLabel(severity)} variant={severityTone(severity)} soft pill size="sm" />;
}

export function PriorityBadge({ priority }) {
  const tone =
    priority === 'critical' ? 'danger' : priority === 'high' ? 'warning' : priority === 'low' ? 'neutral' : 'info';
  return <Badge label={statusLabel(priority)} variant={tone} pill size="sm" />;
}
