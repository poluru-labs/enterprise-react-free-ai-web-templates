import { useMemo, useState } from 'react'
import type { HeuristicRule } from '@/core'
import { HEURISTIC_RULES, SAMPLE_SOURCE, scan } from '@/features/heuristics/lib/rules'
import { SeverityBadge, StatusBadge, cn, severityRank } from '@/shared'
import styles from './HeuristicsPage.module.scss'

export function HeuristicsPage() {
  const [source, setSource] = useState(SAMPLE_SOURCE)
  const [disabled, setDisabled] = useState<Set<string>>(new Set())

  const activeRules = useMemo(
    () => HEURISTIC_RULES.filter((rule) => !disabled.has(rule.id)),
    [disabled],
  )
  const rulesById = useMemo(
    () => new Map<string, HeuristicRule>(HEURISTIC_RULES.map((rule) => [rule.id, rule])),
    [],
  )
  const matches = useMemo(
    () =>
      scan(source, activeRules).sort((a, b) => {
        const ra = rulesById.get(a.ruleId)?.severity ?? 'info'
        const rb = rulesById.get(b.ruleId)?.severity ?? 'info'
        const bySeverity = severityRank(ra) - severityRank(rb)
        return bySeverity !== 0 ? bySeverity : a.line - b.line
      }),
    [source, activeRules, rulesById],
  )

  const hitCount = (id: string) => matches.filter((match) => match.ruleId === id).length
  const flaggedLines = new Set(matches.map((match) => match.line))
  const blocking = matches.filter((match) => {
    const severity = rulesById.get(match.ruleId)?.severity
    return severity === 'critical' || severity === 'high'
  }).length

  const toggle = (id: string) =>
    setDisabled((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Security and smell heuristics</h1>
        <p className={styles.subtitle}>
          Fast pattern checks that run before the model review. Paste a snippet to scan it;
          critical and high findings block merge.
        </p>
      </header>

      <div className={styles.layout}>
        <section className={styles.editor} aria-labelledby="source-heading">
          <div className={styles.editorHead}>
            <h2 id="source-heading" className={styles.panelTitle}>
              Source
            </h2>
            <StatusBadge tone={blocking > 0 ? 'danger' : matches.length > 0 ? 'warning' : 'success'}>
              {blocking > 0 ? `${blocking} blocking` : matches.length > 0 ? 'non-blocking only' : 'clean'}
            </StatusBadge>
          </div>
          <div className={styles.code}>
            <ol className={styles.gutter} aria-hidden="true">
              {source.split('\n').map((_, index) => (
                <li key={index} className={cn(flaggedLines.has(index + 1) && styles.flagged)}>
                  {index + 1}
                </li>
              ))}
            </ol>
            <textarea
              className={styles.textarea}
              value={source}
              spellCheck={false}
              aria-label="Code to scan"
              rows={Math.max(14, source.split('\n').length + 1)}
              onChange={(event) => setSource(event.target.value)}
            />
          </div>

          <h2 className={styles.panelTitle}>
            Findings <span className={styles.count}>{matches.length}</span>
          </h2>
          <ul className={styles.findings} aria-live="polite">
            {matches.length === 0 && <li className={styles.empty}>No findings for the active rules.</li>}
            {matches.map((match) => {
              const rule = rulesById.get(match.ruleId)
              if (!rule) return null
              return (
                <li key={`${match.ruleId}-${match.line}`} className={styles.finding}>
                  <div className={styles.findingHead}>
                    <SeverityBadge severity={rule.severity} />
                    <span className={styles.findingName}>{rule.name}</span>
                    <span className={styles.line}>line {match.line}</span>
                  </div>
                  <code className={styles.excerpt}>{match.excerpt}</code>
                  <p className={styles.message}>{rule.message}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <aside className={styles.rules} aria-label="Rules">
          <h2 className={styles.panelTitle}>Rules</h2>
          <ul className={styles.ruleList}>
            {HEURISTIC_RULES.map((rule) => {
              const on = !disabled.has(rule.id)
              const hits = on ? hitCount(rule.id) : 0
              return (
                <li key={rule.id} className={cn(styles.rule, !on && styles.ruleOff)}>
                  <label className={styles.ruleLabel}>
                    <input type="checkbox" checked={on} onChange={() => toggle(rule.id)} />
                    <span className={styles.ruleName}>{rule.name}</span>
                  </label>
                  <div className={styles.ruleMeta}>
                    <SeverityBadge severity={rule.severity} />
                    <span className={styles.category}>{rule.category}</span>
                    {hits > 0 && <span className={styles.hits}>{hits} hit{hits === 1 ? '' : 's'}</span>}
                  </div>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </div>
  )
}
