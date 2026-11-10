import { useMemo, useState } from 'react'
import { MOCK_DOCUMENTS } from '@/features/documents/data/mockDocuments'
import { formatDate } from '@/shared/utils/format'
import styles from './DocumentsPage.module.scss'

const STATUSES = ['all', 'Published', 'Draft', 'In review', 'Archived'] as const

export function DocumentsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('all')

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return MOCK_DOCUMENTS.filter((doc) => {
      if (status !== 'all' && doc.status !== status) return false
      if (!needle) return true
      return (
        doc.title.toLowerCase().includes(needle) ||
        doc.id.toLowerCase().includes(needle) ||
        doc.owner.toLowerCase().includes(needle)
      )
    })
  }, [query, status])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Document library</h1>
        <p className={styles.subtitle}>
          Search workspace docs by title, id, or owner. Maya Poluru stewards imports.
        </p>
      </header>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search documents"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search documents"
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
              <th>Document</th>
              <th>Type</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <span className={styles.mono}>{doc.id}</span>
                  <strong className={styles.docTitle}>{doc.title}</strong>
                </td>
                <td>{doc.type}</td>
                <td>
                  <span className={styles[`status_${doc.status.replace(/\s/g, '')}` as keyof typeof styles] ?? styles.statusDefault}>
                    {doc.status}
                  </span>
                </td>
                <td>{doc.owner}</td>
                <td>{formatDate(doc.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className={styles.empty}>No documents match. Clear filters to see the library.</p>
        ) : null}
      </div>
    </div>
  )
}
