import { cn } from '@/shared/utils/cn'
import styles from './StatusBadge.module.scss'

export type StatusTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral'

type StatusBadgeProps = {
  tone?: StatusTone
  children: string
}

export function StatusBadge({ tone = 'neutral', children }: StatusBadgeProps) {
  return <span className={cn(styles.badge, styles[tone])}>{children}</span>
}
