import { useState } from 'react'
import type { NameCandidate, NameStatus } from '@/core'
import { MOCK_NAMES } from '@/features/naming/data/mockNames'
import { Button, EmptyState, StatusBadge, cn, type StatusTone } from '@/shared'
import styles from './NamingPage.module.scss'

type StatusFilter = NameStatus | 'all'

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'exploring', label: 'Exploring' },
  { value: 'rejected', label: 'Rejected' },
]

const STATUS_TONE: Record<NameStatus, StatusTone> = {
  shortlisted: 'brand',
  exploring: 'neutral',
  rejected: 'danger',
}

const RISK_TONE: Record<NameCandidate['trademarkRisk'], StatusTone> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
}

const RISK_PENALTY: Record<NameCandidate['trademarkRisk'], number> = {
  low: 0,
  medium: 1.5,
  high: 4,
}

function overallScore(candidate: NameCandidate): number {
  const base = (candidate.memorability + candidate.pronounceability) / 2
  const domainBonus = candidate.domainAvailable ? 0.5 : 0
  return Math.max(0, Math.min(10, base - RISK_PENALTY[candidate.trademarkRisk] + domainBonus))
}

export function NamingPage() {
  const [names, setNames] = useState<NameCandidate[]>(MOCK_NAMES)
  const [filter, setFilter] = useState<StatusFilter>('all')

  const visible = names
    .filter((candidate) => filter === 'all' || candidate.status === filter)
    .sort((a, b) => overallScore(b) - overallScore(a))

  const setStatus = (id: string, status: NameStatus) => {
    setNames((current) =>
      current.map((candidate) => (candidate.id === id ? { ...candidate, status } : candidate)),
    )
  }

  const shortlistCount = names.filter((candidate) => candidate.status === 'shortlisted').length

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Naming explorations</h1>
          <p className={styles.subtitle}>
            Candidates ranked by memorability, pronounceability, trademark risk,
            and domain availability. {shortlistCount} on the shortlist.
          </p>
        </div>
        <div className={styles.segments} role="group" aria-label="Filter by status">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={cn(styles.segment, filter === item.value && styles.segmentActive)}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {visible.length === 0 ? (
        <EmptyState title="No names here" description="Move a candidate into this stage to see it." />
      ) : (
        <div className={styles.grid}>
          {visible.map((candidate) => {
            const score = overallScore(candidate)
            return (
              <article
                key={candidate.id}
                className={cn(styles.card, candidate.status === 'rejected' && styles.rejected)}
              >
                <div className={styles.cardHead}>
                  <h2 className={styles.name}>{candidate.name}</h2>
                  <StatusBadge tone={STATUS_TONE[candidate.status]}>{candidate.status}</StatusBadge>
                </div>
                <p className={styles.rationale}>{candidate.rationale}</p>

                <dl className={styles.scores}>
                  <div>
                    <dt>Memorability</dt>
                    <dd>
                      <span className={styles.bar}>
                        <span style={{ width: `${candidate.memorability * 10}%` }} />
                      </span>
                      {candidate.memorability}/10
                    </dd>
                  </div>
                  <div>
                    <dt>Pronounceability</dt>
                    <dd>
                      <span className={styles.bar}>
                        <span style={{ width: `${candidate.pronounceability * 10}%` }} />
                      </span>
                      {candidate.pronounceability}/10
                    </dd>
                  </div>
                </dl>

                <div className={styles.chips}>
                  <StatusBadge tone={RISK_TONE[candidate.trademarkRisk]}>
                    {`${candidate.trademarkRisk} TM risk`}
                  </StatusBadge>
                  <StatusBadge tone={candidate.domainAvailable ? 'success' : 'neutral'}>
                    {candidate.domainAvailable ? '.com available' : '.com taken'}
                  </StatusBadge>
                  <span className={styles.territory}>{candidate.territory}</span>
                </div>

                <div className={styles.cardFoot}>
                  <span className={styles.score}>
                    Score <strong>{score.toFixed(1)}</strong>
                  </span>
                  <div className={styles.actions}>
                    {candidate.status !== 'shortlisted' && (
                      <Button size="sm" onClick={() => setStatus(candidate.id, 'shortlisted')}>
                        Shortlist
                      </Button>
                    )}
                    {candidate.status !== 'rejected' && (
                      <Button size="sm" variant="ghost" onClick={() => setStatus(candidate.id, 'rejected')}>
                        Reject
                      </Button>
                    )}
                    {candidate.status === 'rejected' && (
                      <Button size="sm" variant="ghost" onClick={() => setStatus(candidate.id, 'exploring')}>
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
                <p className={styles.by}>Proposed by {candidate.proposedBy}</p>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
