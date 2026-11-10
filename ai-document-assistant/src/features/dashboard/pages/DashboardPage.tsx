import { useNavigate } from 'react-router'
import { ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  {
    label: 'Documents in library',
    value: '1,248',
    hint: '42 added this week',
  },
  {
    label: 'Open reviews',
    value: '19',
    hint: '5 high priority',
  },
  {
    label: 'Template uses',
    value: '568',
    hint: 'Release notes lead',
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Document Assistant</p>
        <h1 className={styles.title}>DocDesk workspace</h1>
        <p className={styles.subtitle}>
          Map your document library, reuse templates, clear review queues, and
          draft with playbooks. Desk run by Leela Poluru.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.documents)}>Open library</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.reviews)}>
            Review queue
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
