import { useState } from 'react'
import type { MaintenanceTask } from '@/core/types/knowledge'
import { MOCK_MAINTENANCE } from '@/features/maintenance/data/mockMaintenance'
import { formatDate } from '@/shared/utils/format'
import styles from './MaintenancePage.module.scss'

type MaintFilter = 'all' | MaintenanceTask['status']

export function MaintenancePage() {
  const [filter, setFilter] = useState<MaintFilter>('all')

  const rows = MOCK_MAINTENANCE.filter((row) => filter === 'all' || row.status === filter)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Maintenance queue</h1>
        <p className={styles.subtitle}>
          Stale content and refresh work. Priya Poluru triages the inbox.
        </p>
      </header>

      <div className={styles.filters} role="tablist" aria-label="Maintenance status">
        {(['all', 'Open', 'In progress', 'Done'] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={filter === value ? styles.filterActive : styles.filter}
            onClick={() => setFilter(value)}
          >
            {value === 'all' ? 'All' : value}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {rows.map((row) => (
          <li key={row.id} className={styles.item}>
            <div>
              <p className={styles.itemId}>
                {row.id} · {row.articleId}
              </p>
              <p className={styles.itemTitle}>{row.title}</p>
              <p className={styles.itemReason}>{row.reason}</p>
            </div>
            <div className={styles.itemMeta}>
              <span data-priority={row.priority}>{row.priority}</span>
              <span>{row.status}</span>
              <span>{row.assignee}</span>
              <span>{formatDate(row.updatedAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
