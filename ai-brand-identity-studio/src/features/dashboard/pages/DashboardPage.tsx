import { useNavigate } from 'react-router'
import { env, ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  { label: 'Brand kits', value: '9', hint: 'Active' },
  { label: 'Voice checks', value: '240', hint: 'Passed this month' },
  { label: 'Assets tagged', value: '1.5k', hint: 'Library' },
] as const

const FEATURES = [
  {
    title: 'Voice guidelines',
    description: 'Traits, tone by channel, and a vocabulary check for drafts.',
    to: ROUTES.voice,
  },
  {
    title: 'Naming explorations',
    description: 'Score candidates on memorability, risk, and domains.',
    to: ROUTES.naming,
  },
  {
    title: 'Palette lockups',
    description: 'Preview the wordmark on each swatch with WCAG contrast.',
    to: ROUTES.palettes,
  },
  {
    title: 'Compliance checks',
    description: 'Logo, color, voice, and legal rules per asset.',
    to: ROUTES.compliance,
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{env.appName}</p>
        <h1 className={styles.title}>Identity systems, not one-offs</h1>
        <p className={styles.subtitle}>{env.appTagline}</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.voice)}>Open voice guide</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.compliance)}>
            Review compliance
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

      <section className={styles.features} aria-label="Studio areas">
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
