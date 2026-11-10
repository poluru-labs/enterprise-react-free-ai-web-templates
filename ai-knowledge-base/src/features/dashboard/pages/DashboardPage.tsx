import { useNavigate } from 'react-router'
import { ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  {
    label: 'Published articles',
    value: '842',
    hint: '18 scheduled',
  },
  {
    label: 'Open maintenance',
    value: '24',
    hint: '6 high priority',
  },
  {
    label: 'Deflection rate',
    value: '71%',
    hint: '+3% vs last month',
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Knowledge Base</p>
        <h1 className={styles.title}>KbDesk workspace</h1>
        <p className={styles.subtitle}>
          Publish articles, tune categories, clear maintenance, and author with
          playbooks. Program lead Leela Poluru.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.articles)}>Browse articles</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.maintenance)}>
            Maintenance queue
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
