import { useState } from 'react'
import type { PatchStatus, SuggestedPatch } from '@/core'
import { MOCK_PATCHES } from '@/features/patches/data/mockPatches'
import {
  Button,
  DiffView,
  SeverityBadge,
  StatusBadge,
  cn,
  diffLines,
  toUnifiedPatch,
  type StatusTone,
} from '@/shared'
import styles from './PatchesPage.module.scss'

const STATUS_TONE: Record<PatchStatus, StatusTone> = {
  proposed: 'brand',
  accepted: 'success',
  dismissed: 'neutral',
}

export function PatchesPage() {
  const [patches, setPatches] = useState<SuggestedPatch[]>(MOCK_PATCHES)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const setStatus = (id: string, status: PatchStatus) =>
    setPatches((current) => current.map((patch) => (patch.id === id ? { ...patch, status } : patch)))

  const copyPatch = async (patch: SuggestedPatch) => {
    try {
      await navigator.clipboard.writeText(toUnifiedPatch(patch.file, patch.before, patch.after))
      setCopiedId(patch.id)
      window.setTimeout(() => setCopiedId(null), 1500)
    } catch {
      setCopiedId(null)
    }
  }

  const accepted = patches.filter((patch) => patch.status === 'accepted')
  const pending = patches.filter((patch) => patch.status === 'proposed').length

  const copyAccepted = async () => {
    const combined = accepted.map((patch) => toUnifiedPatch(patch.file, patch.before, patch.after)).join('\n')
    try {
      await navigator.clipboard.writeText(combined)
      setCopiedId('all')
      window.setTimeout(() => setCopiedId(null), 1500)
    } catch {
      setCopiedId(null)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Suggested patches</h1>
          <p className={styles.subtitle}>
            Minimal fixes proposed for review findings. Nothing is applied automatically;
            accept a patch to include it in the bundle you copy into the branch.
          </p>
        </div>
        <div className={styles.bundle}>
          <span className={styles.bundleText}>
            {accepted.length} accepted · {pending} pending
          </span>
          <Button onClick={() => void copyAccepted()} disabled={accepted.length === 0}>
            {copiedId === 'all' ? 'Copied' : 'Copy accepted as patch'}
          </Button>
        </div>
      </header>

      <ul className={styles.list}>
        {patches.map((patch) => (
          <li key={patch.id} className={cn(styles.card, patch.status === 'dismissed' && styles.dismissed)}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>
                <h2 className={styles.name}>{patch.title}</h2>
                <code className={styles.file}>{patch.file}</code>
              </div>
              <div className={styles.badges}>
                <SeverityBadge severity={patch.severity} />
                <StatusBadge tone="neutral">{patch.category}</StatusBadge>
                <StatusBadge tone={STATUS_TONE[patch.status]}>{patch.status}</StatusBadge>
              </div>
            </div>
            <p className={styles.rationale}>{patch.rationale}</p>
            <DiffView lines={diffLines(patch.before, patch.after)} label={`Suggested change to ${patch.file}`} />
            <div className={styles.actions}>
              {patch.status !== 'accepted' && (
                <Button size="sm" onClick={() => setStatus(patch.id, 'accepted')}>
                  Accept
                </Button>
              )}
              {patch.status !== 'dismissed' && (
                <Button size="sm" variant="ghost" onClick={() => setStatus(patch.id, 'dismissed')}>
                  Dismiss
                </Button>
              )}
              {patch.status !== 'proposed' && (
                <Button size="sm" variant="ghost" onClick={() => setStatus(patch.id, 'proposed')}>
                  Undo
                </Button>
              )}
              <Button size="sm" variant="secondary" onClick={() => void copyPatch(patch)}>
                {copiedId === patch.id ? 'Copied' : 'Copy diff'}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
