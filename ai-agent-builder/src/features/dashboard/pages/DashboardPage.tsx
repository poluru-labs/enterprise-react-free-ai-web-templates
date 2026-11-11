import { useNavigate } from 'react-router'
import { env, ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  { label: 'Agents', value: '24', hint: 'Published' },
  { label: 'Tools wired', value: '57', hint: 'Approved catalog' },
  { label: 'Runs today', value: '903', hint: 'Successful' },
] as const

const FEATURES = [
  {
    title: 'Tool graph',
    description: 'See how triggers, prompts, tools, and guards connect.',
    to: ROUTES.graph,
  },
  {
    title: 'Policies',
    description: 'Allow, deny, or require review for tools, domains, and data.',
    to: ROUTES.policies,
  },
  {
    title: 'Sandbox',
    description: 'Replay scenarios against a candidate version with full traces.',
    to: ROUTES.sandbox,
  },
  {
    title: 'Deployments',
    description: 'Promote reviewed versions and roll back in one step.',
    to: ROUTES.deployments,
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{env.appName}</p>
        <h1 className={styles.title}>Build agents that ship</h1>
        <p className={styles.subtitle}>{env.appTagline}</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.graph)}>Open tool graph</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.sandbox)}>
            Run a sandbox test
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

      <section className={styles.features} aria-label="Builder areas">
        {FEATURES.map((feature) => (
          <button
            key={feature.to}
            type="button"
            className={styles.feature}
            onClick={() => navigate(feature.to)}
          >
            <span className={styles.featureTitle}>{feature.title}</span>
            <span className={styles.featureText}>{feature.description}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
