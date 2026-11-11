import { Fragment, type ReactNode } from 'react'
import type { DiffLine } from '@/core'
import { cn } from '@/shared/utils/cn'
import styles from './DiffView.module.scss'

type DiffViewProps = {
  lines: DiffLine[]
  label: string
  onLineSelect?: (line: DiffLine) => void
  selectedLine?: number | null
  renderAfter?: (line: DiffLine) => ReactNode
}

const MARKER = { add: '+', remove: '-', context: ' ' } as const

export function DiffView({ lines, label, onLineSelect, selectedLine, renderAfter }: DiffViewProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table} aria-label={label}>
        <tbody>
          {lines.map((line, index) => {
            const selectable = Boolean(onLineSelect) && line.newNumber !== null
            const after = renderAfter?.(line)
            return (
              <Fragment key={`${index}-${line.oldNumber}-${line.newNumber}`}>
                <tr
                  className={cn(
                    styles.row,
                    styles[line.kind],
                    selectable && styles.selectable,
                    selectedLine !== null && selectedLine === line.newNumber && styles.selected,
                  )}
                >
                  <td className={styles.num}>{line.oldNumber ?? ''}</td>
                  <td className={styles.num}>
                    {selectable ? (
                      <button
                        type="button"
                        className={styles.lineButton}
                        onClick={() => onLineSelect?.(line)}
                        aria-label={`Comment on line ${line.newNumber}`}
                      >
                        {line.newNumber}
                      </button>
                    ) : (
                      (line.newNumber ?? '')
                    )}
                  </td>
                  <td className={styles.marker} aria-hidden="true">
                    {MARKER[line.kind]}
                  </td>
                  <td className={styles.code}>
                    <span className={styles.srOnly}>
                      {line.kind === 'add' ? 'Added: ' : line.kind === 'remove' ? 'Removed: ' : ''}
                    </span>
                    {line.text || ' '}
                  </td>
                </tr>
                {after && (
                  <tr className={styles.afterRow}>
                    <td colSpan={4}>{after}</td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
