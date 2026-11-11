import { useNavigate } from 'react-router'
import { env, ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  { label: 'Charts', value: '760', hint: 'Created' },
  { label: 'Templates', value: '45', hint: 'Library' },
  { label: 'Exports', value: '510', hint: 'PNG/SVG' },
] as const

const FEATURES = [
  {
    title: 'Chart-type recommender',
    description: 'Describe the question and data shape; get ranked chart types.',
    to: ROUTES.recommend,
  },
  {
    title: 'Annotation helpers',
    description: 'Auto-suggested callouts for peaks, lows, and targets.',
    to: ROUTES.annotations,
  },
  {
    title: 'Accessible palettes',
    description: 'Color-vision simulation and 3:1 contrast checks.',
    to: ROUTES.palettes,
  },
  {
    title: 'Export presets',
    description: 'Sizes, backgrounds, and alt text per destination.',
    to: ROUTES.exports,
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{env.appName}</p>
        <h1 className={styles.title}>Charts with a point of view</h1>
        <p className={styles.subtitle}>{env.appTagline}</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate(ROUTES.recommend)}>Recommend a chart</Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.palettes)}>
            Check palettes
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
