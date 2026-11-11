import { useState } from 'react'
import type { FindingStatus, Severity, TriageFinding } from '@/core'
import { MOCK_FINDINGS } from '@/features/triage/data/mockFindings'
import {
  EmptyState,
  SEVERITY_ORDER,
  SeverityBadge,
  cn,
  formatRelativeTime,
  severityRank,
} from '@/shared'
import styles from './TriagePage.module.scss'

const STATUSES: FindingStatus[] = ['open', 'accepted', 'dismissed', 'fixed']

function isBlocking(finding: TriageFinding) {
  return (finding.severity === 'critical' || finding.severity === 'high') && finding.status !== 'fixed' && finding.status !== 'dismissed'
}

export function TriagePage() {
  const [findings, setFindings] = useState<TriageFinding[]>(MOCK_FINDINGS)
  const [severities, setSeverities] = useState<Set<Severity>>(new Set(SEVERITY_ORDER))
  const [hideClosed, setHideClosed] = useState(true)

  const counts = SEVERITY_ORDER.map((severity) => ({
    severity,
    count: findings.filter((finding) => finding.severity === severity && finding.status !== 'fixed' && finding.status !== 'dismissed').length,
  }))
  const blockingPrs = [...new Set(findings.filter(isBlocking).map((finding) => finding.pr))].sort((a, b) => b - a)

  const visible = findings
    .filter((finding) => severities.has(finding.severity))
    .filter((finding) => !hideClosed || (finding.status !== 'fixed' && finding.status !== 'dismissed'))
    .sort((a, b) => severityRank(a.severity) - severityRank(b.severity) || b.pr - a.pr)

  const toggleSeverity = (severity: Severity) =>
    setSeverities((current) => {
      const next = new Set(current)
      if (next.has(severity)) next.delete(severity)
      else next.add(severity)
      return next
    })

  const setStatus = (id: string, status: FindingStatus) =>
    setFindings((current) => current.map((finding) => (finding.id === id ? { ...finding, status } : finding)))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Severity triage</h1>
        <p className={styles.subtitle}>
          Every finding across open pull requests, ordered by severity. Critical and high
          findings that are open or accepted block merge until fixed or dismissed with a reason.
        </p>
      </header>

      <section className={styles.summary} aria-label="Open findings by severity">
        {counts.map(({ severity, count }) => (
          <button
            key={severity}
            type="button"
            className={cn(styles.chip, styles[severity], severities.has(severity) && styles.chipOn)}
            aria-pressed={severities.has(severity)}
            onClick={() => toggleSeverity(severity)}
          >
            <span className={styles.chipCount}>{count}</span>
            <span className={styles.chipLabel}>{severity}</span>
          </button>
        ))}
      </section>

      <div className={styles.toolbar}>
        <p className={styles.blocking}>
          {blockingPrs.length > 0 ? (
            <>
              Merge blocked: {blockingPrs.map((pr) => `#${pr}`).join(', ')}
            </>
          ) : (
            'No pull requests blocked'
          )}
        </p>
        <label className={styles.check}>
          <input type="checkbox" checked={hideClosed} onChange={(event) => setHideClosed(event.target.checked)} />
          Hide fixed and dismissed
        </label>
      </div>

      {visible.length === 0 ? (
        <EmptyState title="Nothing to triage" description="No findings match the selected severities." />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Severity</th>
                <th scope="col">Finding</th>
                <th scope="col">PR</th>
                <th scope="col">Location</th>
                <th scope="col">Owner</th>
                <th scope="col">Opened</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((finding) => (
                <tr key={finding.id} className={cn(isBlocking(finding) && styles.blockingRow)}>
                  <td>
                    <SeverityBadge severity={finding.severity} />
                  </td>
                  <td>
                    <span className={styles.findingTitle}>{finding.title}</span>
                    <span className={styles.category}>{finding.category}</span>
                  </td>
                  <td className={styles.mono}>#{finding.pr}</td>
                  <td className={styles.mono}>
                    {finding.file}:{finding.line}
                  </td>
                  <td>{finding.owner}</td>
                  <td className={styles.muted}>{formatRelativeTime(finding.openedAt)}</td>
                  <td>
                    <select
                      className={styles.select}
                      value={finding.status}
                      aria-label={`Status for ${finding.title}`}
                      onChange={(event) => setStatus(finding.id, event.target.value as FindingStatus)}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
