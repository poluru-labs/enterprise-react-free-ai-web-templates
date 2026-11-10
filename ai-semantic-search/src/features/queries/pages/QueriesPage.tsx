import { useMemo, useState } from 'react'
import { MOCK_QUERIES } from '@/features/queries/data/mockQueries'
import { formatDate } from '@/shared/utils/format'
import styles from './QueriesPage.module.scss'

const STATUSES = ['all', 'Success', 'Slow', 'Zero', 'Error'] as const

export function QueriesPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('all')

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return MOCK_QUERIES.filter((row) => {
      if (status !== 'all' && row.status !== status) return false
      if (!needle) return true
      return (
        row.text.toLowerCase().includes(needle) ||
        row.id.toLowerCase().includes(needle) ||
        row.index.toLowerCase().includes(needle)
      )
    })
  }, [query, status])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Query log</h1>
        <p className={styles.subtitle}>Recent searches and latency. Jonah Poluru monitors SLOs.</p>
      </header>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search queries"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search queries"
        />
        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value as (typeof STATUSES)[number])}
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
              <th>Query</th>
              <th>Index</th>
              <th>Status</th>
              <th>Latency</th>
              <th>Hits</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className={styles.mono}>{row.id}</span>
                  <strong className={styles.queryText}>{row.text}</strong>
                </td>
                <td>{row.index}</td>
                <td>{row.status}</td>
                <td>{row.latencyMs ? `${row.latencyMs} ms` : '—'}</td>
                <td>{row.hits}</td>
                <td>{row.owner}</td>
                <td>{formatDate(row.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
