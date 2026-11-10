import { useMemo, useState } from 'react'
import { MOCK_ARTICLES } from '@/features/articles/data/mockArticles'
import { formatDate } from '@/shared/utils/format'
import styles from './ArticlesPage.module.scss'

const STATUSES = ['all', 'Published', 'Draft', 'Scheduled', 'Archived'] as const

export function ArticlesPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('all')

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return MOCK_ARTICLES.filter((article) => {
      if (status !== 'all' && article.status !== status) return false
      if (!needle) return true
      return (
        article.title.toLowerCase().includes(needle) ||
        article.id.toLowerCase().includes(needle) ||
        article.category.toLowerCase().includes(needle) ||
        article.owner.toLowerCase().includes(needle)
      )
    })
  }, [query, status])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Article library</h1>
        <p className={styles.subtitle}>
          Search help center articles. Maya Poluru owns category hygiene.
        </p>
      </header>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search articles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search articles"
        />
        <select
          className={styles.select}
          value={status}
          onChange={(event) => setStatus(event.target.value as (typeof STATUSES)[number])}
          aria-label="Filter by status"
        >
          {STATUSES.map((value) => (
            <option key={value} value={value}>
              {value === 'all' ? 'All statuses' : value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Status</th>
              <th>Views</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((article) => (
              <tr key={article.id}>
                <td>
                  <span className={styles.mono}>{article.id}</span>
                  <strong className={styles.articleTitle}>{article.title}</strong>
                </td>
                <td>{article.category}</td>
                <td>
                  <span className={styles[`status_${article.status.replace(/\s/g, '')}` as keyof typeof styles] ?? styles.statusDefault}>
                    {article.status}
                  </span>
                </td>
                <td>{article.views.toLocaleString()}</td>
                <td>{article.owner}</td>
                <td>{formatDate(article.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className={styles.empty}>No articles match. Clear filters to browse the library.</p>
        ) : null}
      </div>
    </div>
  )
}
