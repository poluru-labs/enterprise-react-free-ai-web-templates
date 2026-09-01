import { Badge, Status } from '@poluru-labs/enterprise-design-system-react';
import { formatConfidence } from '../../lib/format.js';
import { confidenceTone, severityTone, statusLabel, statusTone } from '../../lib/status.js';

export function StatusBadge({ status, pulse = false }) {
  const tone = statusTone(status);
  const label = statusLabel(status);
  const shouldPulse = pulse || status === 'live' || status === 'open';

  if (shouldPulse) {
    return <Status label={label} variant={tone} pulse />;
  }

  return <Badge label={label} variant={tone} soft pill size="sm" />;
}

export function SeverityBadge({ severity }) {
  return <Badge label={statusLabel(severity)} variant={severityTone(severity)} soft pill size="sm" />;
}

export function ConfidenceBadge({ value }) {
  return <Badge label={formatConfidence(value)} variant={confidenceTone(value)} pill size="sm" />;
}
