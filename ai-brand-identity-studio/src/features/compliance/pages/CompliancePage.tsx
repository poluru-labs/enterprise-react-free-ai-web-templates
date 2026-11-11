import { useState } from 'react'
import type { CheckCategory, CheckResult, ComplianceCheck } from '@/core'
import { MOCK_CHECKS } from '@/features/compliance/data/mockChecks'
import {
  Button,
  EmptyState,
  StatusBadge,
  cn,
  formatRelativeTime,
  type StatusTone,
} from '@/shared'
import styles from './CompliancePage.module.scss'

type ResultFilter = CheckResult | 'all'
type CategoryFilter = CheckCategory | 'all'

const RESULT_TONE: Record<CheckResult, StatusTone> = {
  pass: 'success',
  warn: 'warning',
  fail: 'danger',
}

const CATEGORIES: CategoryFilter[] = ['all', 'logo', 'color', 'voice', 'legal']

export function CompliancePage() {
  const [checks, setChecks] = useState<ComplianceCheck[]>(MOCK_CHECKS)
  const [result, setResult] = useState<ResultFilter>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')

  const counts = {
    pass: checks.filter((check) => check.result === 'pass').length,
    warn: checks.filter((check) => check.result === 'warn').length,
    fail: checks.filter((check) => check.result === 'fail').length,
  }
  const score = Math.round(((counts.pass + counts.warn * 0.5) / checks.length) * 100)

  const visible = checks.filter(
    (check) =>
      (result === 'all' || check.result === result) &&
      (category === 'all' || check.category === category),
  )

  const resolve = (id: string) => {
    setChecks((current) =>
      current.map((check) =>
        check.id === id
          ? {
              ...check,
              result: 'pass',
              detail: `Resolved: ${check.detail}`,
              checkedAt: new Date().toISOString(),
            }
          : check,
      ),
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Compliance checks</h1>
        <p className={styles.subtitle}>
          Logo, color, voice, and legal rules run against every asset before it
          leaves review. Failures block publishing; warnings need a reviewer note.
        </p>
      </header>

      <section className={styles.summary} aria-label="Check summary">
        <button
          type="button"
          className={cn(styles.summaryCard, result === 'all' && styles.summaryActive)}
          onClick={() => setResult('all')}
        >
          <span className={styles.summaryLabel}>Brand health</span>
          <span className={styles.summaryValue}>{score}%</span>
        </button>
        {(['fail', 'warn', 'pass'] as const).map((key) => (
          <button
            key={key}
            type="button"
            className={cn(styles.summaryCard, styles[key], result === key && styles.summaryActive)}
            aria-pressed={result === key}
            onClick={() => setResult(result === key ? 'all' : key)}
          >
            <span className={styles.summaryLabel}>
              {key === 'fail' ? 'Failing' : key === 'warn' ? 'Warnings' : 'Passing'}
            </span>
            <span className={styles.summaryValue}>{counts[key]}</span>
          </button>
        ))}
      </section>

      <div className={styles.toolbar}>
        <label className={styles.filterLabel} htmlFor="category-filter">
          Category
        </label>
        <select
          id="category-filter"
          className={styles.select}
          value={category}
          onChange={(event) => setCategory(event.target.value as CategoryFilter)}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? 'All categories' : item[0].toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
        <span className={styles.count}>
          {visible.length} of {checks.length} checks
        </span>
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No checks match" description="Clear a filter to see more results." />
      ) : (
        <ul className={styles.list}>
          {visible.map((check) => (
            <li key={check.id} className={cn(styles.item, styles[`${check.result}Item`])}>
              <div className={styles.itemHead}>
                <div>
                  <p className={styles.asset}>
                    {check.asset} <span className={styles.channel}>· {check.channel}</span>
                  </p>
                  <p className={styles.rule}>{check.rule}</p>
                </div>
                <div className={styles.itemActions}>
                  <StatusBadge tone="neutral">{check.category}</StatusBadge>
                  <StatusBadge tone={RESULT_TONE[check.result]}>{check.result}</StatusBadge>
                </div>
              </div>
              <p className={styles.detail}>{check.detail}</p>
              <div className={styles.itemFoot}>
                <span>
                  {check.reviewer} · {formatRelativeTime(check.checkedAt)}
                </span>
                {check.result !== 'pass' && (
                  <Button size="sm" variant="secondary" onClick={() => resolve(check.id)}>
                    Mark resolved
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
