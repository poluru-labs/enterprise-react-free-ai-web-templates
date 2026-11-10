import { MOCK_CATEGORIES } from '@/features/categories/data/mockCategories'
import { formatDate } from '@/shared/utils/format'
import styles from './CategoriesPage.module.scss'

export function CategoriesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.subtitle}>
          Taxonomy and freshness targets. Leela Poluru approves merges.
        </p>
      </header>

      <div className={styles.grid}>
        {MOCK_CATEGORIES.map((cat) => (
          <article key={cat.id} className={styles.card}>
            <p className={styles.eyebrow}>
              {cat.id} · /{cat.slug}
            </p>
            <h2 className={styles.cardTitle}>{cat.name}</h2>
            <dl className={styles.meta}>
              <div>
                <dt>Articles</dt>
                <dd>{cat.articles}</dd>
              </div>
              <div>
                <dt>Freshness</dt>
                <dd>{cat.freshnessDays}d</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{cat.owner}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatDate(cat.updatedAt)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
