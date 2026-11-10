import { useNavigate } from 'react-router'
import { ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  { label: 'Queries (24h)', value: '18.4k', hint: 'p95 210 ms' },
  { label: 'Open evaluations', value: '31', hint: '9 high priority' },
  { label: 'Mean nDCG', value: '0.79', hint: '+0.02 vs last week' },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Semantic Search</p>
        <h1 className={styles.title}>SearchDesk workspace</h1>
        <p className={styles.subtitle}>
          Monitor queries, index health, ranking experiments, and human evals.
          Program lead Leela Poluru.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.queries)}>Open query log</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.evaluations)}>
            Evaluations
          </Button>
        </div>
      </section>
      <section className={styles.grid} aria-label="Key metrics">
        {METRICS.map((metric) => (
          <article key={metric.label} className={styles.metric}>
            <p className={styles.metricLabel}>{metric.label}</p>
            <p className={styles.metricValue}>{metric.value}</p>
            <p className={styles.metricHint}>{metric.hint}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
