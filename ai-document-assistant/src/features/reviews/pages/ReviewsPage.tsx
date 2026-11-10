import { useState } from 'react'
import type { DocReview } from '@/core/types/documents'
import { MOCK_REVIEWS } from '@/features/reviews/data/mockReviews'
import { formatDate } from '@/shared/utils/format'
import styles from './ReviewsPage.module.scss'

type ReviewFilter = 'all' | DocReview['status']

export function ReviewsPage() {
  const [filter, setFilter] = useState<ReviewFilter>('all')

  const rows = MOCK_REVIEWS.filter((row) => filter === 'all' || row.status === filter)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Review queue</h1>
        <p className={styles.subtitle}>
          Approvals and change requests. Priya Poluru owns the inbox.
        </p>
      </header>

      <div className={styles.filters} role="tablist" aria-label="Review status">
        {(['all', 'Open', 'Changes requested', 'Approved'] as const).map((value) => (
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
                {row.id} · {row.documentId}
              </p>
              <p className={styles.itemTitle}>{row.title}</p>
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
