import { useNavigate } from 'react-router'
import { env, ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  {
    label: 'Active agents',
    value: '12',
    hint: '3 awaiting review',
  },
  {
    label: 'Conversations today',
    value: '248',
    hint: '+18% vs yesterday',
  },
  {
    label: 'Avg. latency',
    value: '1.2s',
    hint: 'p95 across models',
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{env.appName}</p>
        <h1 className={styles.title}>Enterprise AI workspace</h1>
        <p className={styles.subtitle}>
          Production-ready React starter for conversational AI, agents, and
          governed model workflows. Extend the feature modules and wire your
          gateway.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.chat)}>Open chat</Button>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.agents)}
          >
            Browse agents
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
