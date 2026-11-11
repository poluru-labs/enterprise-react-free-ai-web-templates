import { useMemo, useState } from 'react'
import type { AnalysisGoal, ChartKind, DataProfile } from '@/core'
import { recommendCharts, sampleData } from '@/features/recommender/lib/recommend'
import { MiniChart, StatusBadge, cn } from '@/shared'
import styles from './RecommenderPage.module.scss'

const GOALS: { value: AnalysisGoal; label: string; hint: string }[] = [
  { value: 'compare', label: 'Compare', hint: 'Rank or contrast categories' },
  { value: 'trend', label: 'Trend', hint: 'Change over time' },
  { value: 'composition', label: 'Composition', hint: 'Parts of a whole' },
  { value: 'distribution', label: 'Distribution', hint: 'Spread and outliers' },
  { value: 'relationship', label: 'Relationship', hint: 'How measures correlate' },
]

const KIND_LABEL: Record<ChartKind, string> = {
  bar: 'Bar chart',
  line: 'Line chart',
  area: 'Area chart',
  scatter: 'Scatter plot',
  'stacked-bar': 'Stacked bar',
  histogram: 'Histogram',
  donut: 'Donut chart',
}

const PREVIEW_COLORS = ['#29527A', '#E07A2E', '#3A9E8F', '#B04A7A', '#7A8A99']

export function RecommenderPage() {
  const [profile, setProfile] = useState<DataProfile>({
    goal: 'trend',
    categories: 4,
    hasTime: true,
    measures: 1,
    rows: 24,
  })

  const recommendations = useMemo(() => recommendCharts(profile), [profile])
  const update = <K extends keyof DataProfile>(key: K, value: DataProfile[K]) =>
    setProfile((current) => ({ ...current, [key]: value }))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Chart-type recommender</h1>
        <p className={styles.subtitle}>
          Describe the question and the shape of the data. Recommendations follow
          perceptual accuracy rules, so they work without a model call.
        </p>
      </header>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>What should the chart answer?</legend>
            <div className={styles.goals}>
              {GOALS.map((goal) => (
                <label
                  key={goal.value}
                  className={cn(styles.goal, profile.goal === goal.value && styles.goalActive)}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={goal.value}
                    checked={profile.goal === goal.value}
                    onChange={() => update('goal', goal.value)}
                  />
                  <span className={styles.goalLabel}>{goal.label}</span>
                  <span className={styles.goalHint}>{goal.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span>Categories</span>
              <input
                type="number"
                min={1}
                max={50}
                value={profile.categories}
                onChange={(event) => update('categories', Number(event.target.value) || 1)}
              />
            </label>
            <label className={styles.field}>
              <span>Numeric measures</span>
              <input
                type="number"
                min={1}
                max={10}
                value={profile.measures}
                onChange={(event) => update('measures', Number(event.target.value) || 1)}
              />
            </label>
            <label className={styles.field}>
              <span>Rows</span>
              <input
                type="number"
                min={1}
                value={profile.rows}
                onChange={(event) => update('rows', Number(event.target.value) || 1)}
              />
            </label>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={profile.hasTime}
                onChange={(event) => update('hasTime', event.target.checked)}
              />
              Has a date or period column
            </label>
          </div>
        </form>

        <ol className={styles.results} aria-label="Recommended charts" aria-live="polite">
          {recommendations.map((item, index) => (
            <li key={item.kind} className={cn(styles.result, index === 0 && styles.top)}>
              <div className={styles.resultHead}>
                <span className={styles.rank}>{index + 1}</span>
                <h2 className={styles.kind}>{KIND_LABEL[item.kind]}</h2>
                <StatusBadge tone={item.score >= 80 ? 'success' : item.score >= 55 ? 'brand' : 'warning'}>
                  {`${item.score} fit`}
                </StatusBadge>
              </div>
              <div className={styles.preview}>
                <MiniChart
                  kind={item.kind}
                  data={sampleData(item.kind)}
                  colors={PREVIEW_COLORS}
                  title={`${KIND_LABEL[item.kind]} preview`}
                />
              </div>
              <p className={styles.reason}>{item.reason}</p>
              {item.caution && <p className={styles.caution}>{item.caution}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
