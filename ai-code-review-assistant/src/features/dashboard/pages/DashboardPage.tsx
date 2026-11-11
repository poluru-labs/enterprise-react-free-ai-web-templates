import { useNavigate } from 'react-router'
import { env, ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  { label: 'PRs reviewed', value: '314', hint: 'This sprint' },
  { label: 'Findings', value: '1.1k', hint: 'Actionable comments' },
  { label: 'Critical issues', value: '27', hint: 'Blocked before merge' },
] as const

const FEATURES = [
  {
    title: 'Diff-aware commentary',
    text: 'Comment on exact lines of a pull request diff, with severity and resolve state per thread.',
    to: ROUTES.diffs,
  },
  {
    title: 'Security and smell heuristics',
    text: 'Scan code against toggleable rules for injection, secrets, unsafe HTML and common smells.',
    to: ROUTES.heuristics,
  },
  {
    title: 'Suggested patches',
    text: 'Review proposed fixes as diffs, accept or dismiss each one, and copy them as a patch.',
    to: ROUTES.patches,
  },
  {
    title: 'Severity triage',
    text: 'See every finding ordered by severity and which pull requests are blocked from merging.',
    to: ROUTES.triage,
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{env.appName}</p>
        <h1 className={styles.title}>Reviews that catch what CI misses</h1>
        <p className={styles.subtitle}>{env.appTagline}</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.diffs)}>Review a pull request</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.triage)}>
            Open triage
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

      <section className={styles.features} aria-label="Features">
        {FEATURES.map((feature) => (
          <button key={feature.to} type="button" className={styles.feature} onClick={() => navigate(feature.to)}>
            <span className={styles.featureTitle}>{feature.title}</span>
            <span className={styles.featureText}>{feature.text}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
