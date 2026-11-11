import type { Severity } from '@/core'
import { StatusBadge, type StatusTone } from '@/shared/components/StatusBadge/StatusBadge'

const SEVERITY_TONE: Record<Severity, StatusTone> = {
  critical: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'brand',
  info: 'neutral',
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <StatusBadge tone={SEVERITY_TONE[severity]}>{severity}</StatusBadge>
}
