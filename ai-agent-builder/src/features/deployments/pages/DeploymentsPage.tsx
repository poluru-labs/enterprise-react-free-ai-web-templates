import { useState } from 'react'
import type { Deployment, DeploymentStatus } from '@/core'
import { MOCK_DEPLOYMENTS } from '@/features/deployments/data/mockDeployments'
import { Button, StatusBadge, formatDate, type StatusTone } from '@/shared'
import styles from './DeploymentsPage.module.scss'

const STATUS_TONE: Record<DeploymentStatus, StatusTone> = {
  live: 'success',
  'pending-review': 'warning',
  approved: 'brand',
  'rolled-back': 'neutral',
}

const STATUS_LABEL: Record<DeploymentStatus, string> = {
  live: 'live',
  'pending-review': 'pending review',
  approved: 'approved',
  'rolled-back': 'rolled back',
}

const REVIEWER = 'Ravi Poluru'

export function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>(MOCK_DEPLOYMENTS)

  const live = deployments.find((item) => item.status === 'live')

  const approve = (id: string) => {
    setDeployments((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: 'approved', reviewer: REVIEWER } : item,
      ),
    )
  }

  const promote = (id: string) => {
    setDeployments((current) =>
      current.map((item) => {
        if (item.id === id) {
          return { ...item, env: 'production', status: 'live', deployedAt: new Date().toISOString() }
        }
        if (item.status === 'live') return { ...item, status: 'approved' }
        return item
      }),
    )
  }

  const rollback = (id: string) => {
    const previous = deployments.find(
      (item) => item.id !== id && item.env === 'production' && item.status === 'approved',
    )

    setDeployments((current) =>
      current.map((item) => {
        if (item.id === id) return { ...item, status: 'rolled-back' }
        if (previous && item.id === previous.id) return { ...item, status: 'live' }
        return item
      }),
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Versioned deployments</h1>
        <p className={styles.subtitle}>
          Every agent change ships as an immutable version. Staging builds need a
          reviewer sign-off before they can be promoted to production.
        </p>
      </header>

      <section className={styles.current} aria-label="Current production version">
        <div>
          <p className={styles.currentLabel}>Live in production</p>
          <p className={styles.currentVersion}>{live?.version ?? 'None'}</p>
        </div>
        {live && (
          <p className={styles.currentMeta}>
            Since {formatDate(live.deployedAt)} · approved by {live.reviewer ?? '—'}
          </p>
        )}
      </section>

      <ol className={styles.timeline} aria-label="Version history">
        {deployments.map((item) => (
          <li key={item.id} className={styles.entry}>
            <div className={styles.entryHead}>
              <div className={styles.entryTitle}>
                <span className={styles.version}>{item.version}</span>
                <StatusBadge tone={STATUS_TONE[item.status]}>{STATUS_LABEL[item.status]}</StatusBadge>
                <span className={styles.env}>{item.env}</span>
              </div>
              <div className={styles.entryActions}>
                {item.status === 'pending-review' && (
                  <Button size="sm" variant="secondary" onClick={() => approve(item.id)}>
                    Approve
                  </Button>
                )}
                {item.status === 'pending-review' && (
                  <Button size="sm" disabled title="Approval required before promotion">
                    Promote
                  </Button>
                )}
                {item.status === 'approved' && item.env === 'staging' && (
                  <Button size="sm" onClick={() => promote(item.id)}>
                    Promote
                  </Button>
                )}
                {item.status === 'live' && (
                  <Button size="sm" variant="ghost" onClick={() => rollback(item.id)}>
                    Roll back
                  </Button>
                )}
              </div>
            </div>
            <p className={styles.summary}>{item.changeSummary}</p>
            <p className={styles.meta}>
              {formatDate(item.deployedAt)} · by {item.author}
              {item.reviewer ? ` · reviewed by ${item.reviewer}` : ' · awaiting reviewer'}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
