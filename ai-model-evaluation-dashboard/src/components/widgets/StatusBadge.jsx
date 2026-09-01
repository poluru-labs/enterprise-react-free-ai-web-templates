import { Badge, Status } from '@poluru-labs/enterprise-design-system-react';
import { statusLabel, statusTone } from '../../lib/status.js';

export function StatusBadge({ status, pulse = false }) {
  const tone = statusTone(status);
  const label = statusLabel(status);
  const live = pulse || status === 'Running' || status === 'Live';

  if (live) {
    return <Status label={label} variant={tone === 'brand' ? 'info' : tone} pulse />;
  }

  return <Badge label={label} variant={tone === 'brand' ? 'info' : tone} soft pill size="sm" />;
}
