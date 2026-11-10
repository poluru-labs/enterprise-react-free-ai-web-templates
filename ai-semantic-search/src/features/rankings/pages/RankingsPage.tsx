import { MOCK_RANKINGS } from '@/features/rankings/data/mockRankings'
import { formatDate } from '@/shared/utils/format'
import styles from './RankingsPage.module.scss'

export function RankingsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Rankings</h1>
        <p className={styles.subtitle}>nDCG and MRR by cohort. Leela Poluru sets experiment targets.</p>
      </header>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Experiment</th>
              <th>Cohort</th>
              <th>nDCG</th>
              <th>MRR</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RANKINGS.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className={styles.mono}>{row.id}</span>
                  <strong>{row.name}</strong>
                </td>
                <td>{row.cohort}</td>
                <td>{row.ndcg.toFixed(2)}</td>
                <td>{row.mrr.toFixed(2)}</td>
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
