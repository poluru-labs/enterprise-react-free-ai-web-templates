import { MOCK_INDEXES } from '@/features/indexes/data/mockIndexes'
import { formatDate } from '@/shared/utils/format'
import styles from './IndexesPage.module.scss'

export function IndexesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Indexes</h1>
        <p className={styles.subtitle}>Vector indexes and freshness. Maya Poluru owns reindex cadence.</p>
      </header>
      <div className={styles.grid}>
        {MOCK_INDEXES.map((idx) => (
          <article key={idx.id} className={styles.card}>
            <p className={styles.eyebrow}>{idx.id}</p>
            <h2 className={styles.cardTitle}>{idx.name}</h2>
            <dl className={styles.meta}>
              <div>
                <dt>Records</dt>
                <dd>{idx.records.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Dimensions</dt>
                <dd>{idx.dimensions}</dd>
              </div>
              <div>
                <dt>Freshness</dt>
                <dd>{idx.freshnessDays}d</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{idx.owner}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatDate(idx.updatedAt)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
