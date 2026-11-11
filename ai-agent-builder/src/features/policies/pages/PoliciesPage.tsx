import { useState } from 'react'
import type { Policy, PolicyEffect, PolicyScope } from '@/core'
import { MOCK_POLICIES } from '@/features/policies/data/mockPolicies'
import { EmptyState, StatusBadge, cn, formatRelativeTime, type StatusTone } from '@/shared'
import styles from './PoliciesPage.module.scss'

type ScopeFilter = PolicyScope | 'all'

const SCOPE_FILTERS: { value: ScopeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tool', label: 'Tools' },
  { value: 'domain', label: 'Domains' },
  { value: 'data', label: 'Data' },
]

const EFFECT_TONE: Record<PolicyEffect, StatusTone> = {
  allow: 'success',
  deny: 'danger',
  review: 'warning',
}

export function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>(MOCK_POLICIES)
  const [scope, setScope] = useState<ScopeFilter>('all')
  const [query, setQuery] = useState('')

  const normalized = query.trim().toLowerCase()
  const visible = policies.filter(
    (policy) =>
      (scope === 'all' || policy.scope === scope) &&
      (!normalized ||
        policy.name.toLowerCase().includes(normalized) ||
        policy.target.toLowerCase().includes(normalized)),
  )

  const enabled = policies.filter((policy) => policy.enabled)
  const counts = {
    allow: enabled.filter((policy) => policy.effect === 'allow').length,
    review: enabled.filter((policy) => policy.effect === 'review').length,
    deny: enabled.filter((policy) => policy.effect === 'deny').length,
  }

  const toggle = (id: string) => {
    setPolicies((current) =>
      current.map((policy) =>
        policy.id === id ? { ...policy, enabled: !policy.enabled } : policy,
      ),
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Policies and allowlists</h1>
        <p className={styles.subtitle}>
          Control which tools, domains, and data classes agents can touch. Rules
          marked review pause the run until an approver signs off.
        </p>
      </header>

      <section className={styles.summary} aria-label="Active rule counts">
        <article className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Allowed</p>
          <p className={styles.summaryValue}>{counts.allow}</p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Needs review</p>
          <p className={styles.summaryValue}>{counts.review}</p>
        </article>
        <article className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Denied</p>
          <p className={styles.summaryValue}>{counts.deny}</p>
        </article>
      </section>

      <div className={styles.toolbar}>
        <div className={styles.segments} role="group" aria-label="Filter by scope">
          {SCOPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={cn(styles.segment, scope === filter.value && styles.segmentActive)}
              aria-pressed={scope === filter.value}
              onClick={() => setScope(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          className={styles.search}
          placeholder="Search rules or targets"
          aria-label="Search rules or targets"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="No matching rules"
          description="Try a different scope or search term."
        />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Rule</th>
                <th scope="col">Scope</th>
                <th scope="col">Target</th>
                <th scope="col">Effect</th>
                <th scope="col">Owner</th>
                <th scope="col">Updated</th>
                <th scope="col">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((policy) => (
                <tr key={policy.id} className={cn(!policy.enabled && styles.disabled)}>
                  <td className={styles.strong}>{policy.name}</td>
                  <td className={styles.capitalize}>{policy.scope}</td>
                  <td>
                    <code className={styles.code}>{policy.target}</code>
                  </td>
                  <td>
                    <StatusBadge tone={EFFECT_TONE[policy.effect]}>{policy.effect}</StatusBadge>
                  </td>
                  <td>{policy.owner}</td>
                  <td className={styles.muted}>{formatRelativeTime(policy.updatedAt)}</td>
                  <td>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={policy.enabled}
                      aria-label={`${policy.enabled ? 'Disable' : 'Enable'} ${policy.name}`}
                      className={cn(styles.switch, policy.enabled && styles.switchOn)}
                      onClick={() => toggle(policy.id)}
                    >
                      <span className={styles.switchThumb} />
                    </button>
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
