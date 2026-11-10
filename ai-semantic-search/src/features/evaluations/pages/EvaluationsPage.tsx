import { useState } from 'react'
import type { SearchEvaluation } from '@/core/types/search'
import { MOCK_EVALUATIONS } from '@/features/evaluations/data/mockEvaluations'
import { formatDate } from '@/shared/utils/format'
import styles from './EvaluationsPage.module.scss'

type EvalFilter = 'all' | SearchEvaluation['status']

export function EvaluationsPage() {
  const [filter, setFilter] = useState<EvalFilter>('all')
  const rows = MOCK_EVALUATIONS.filter((row) => filter === 'all' || row.status === filter)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Evaluations</h1>
        <p className={styles.subtitle}>Human relevance ratings. Priya Poluru owns the queue.</p>
      </header>
      <div className={styles.filters}>
        {(['all', 'Open', 'Reviewed', 'Done'] as const).map((value) => (
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
                {row.id} · {row.queryId}
              </p>
              <p className={styles.itemTitle}>{row.title}</p>
            </div>
            <div className={styles.itemMeta}>
              <span data-priority={row.priority}>{row.priority}</span>
              <span>★ {row.rating || '—'}</span>
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
