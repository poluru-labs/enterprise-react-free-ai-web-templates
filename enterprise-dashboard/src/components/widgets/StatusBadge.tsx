import { Badge, Status } from '@poluru-labs/enterprise-design-system-react';
import { severityTone, slaTone, statusLabel, statusTone } from '../../lib/status';

type StatusBadgeProps = {
  status?: string | null;
  pulse?: boolean;
};

export function StatusBadge({ status, pulse = false }: StatusBadgeProps) {
  const tone = statusTone(status);
  const label = statusLabel(status);
  const live = pulse || status === 'operational' || status === 'Healthy' || status === 'ok';
  const variant = tone;

  if (live) {
    return <Status label={label} variant={variant} pulse />;
  }

  return <Badge label={label} variant={variant} soft pill size="sm" />;
}

export function SeverityBadge({ severity }: { severity?: string | null }) {
  return <Badge label={statusLabel(severity)} variant={severityTone(severity)} soft pill size="sm" />;
}

export function SlaBadge({ sla }: { sla?: string | null }) {
  const tone = slaTone(sla);
  return <Badge label={statusLabel(sla === 'ok' ? 'SLA ok' : sla)} variant={tone} pill size="sm" />;
}
