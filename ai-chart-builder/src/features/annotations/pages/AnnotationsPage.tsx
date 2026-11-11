import { useState } from 'react'
import type { Annotation, AnnotationKind } from '@/core'
import { REVENUE_SERIES, TARGET, suggestAnnotations } from '@/features/annotations/lib/suggest'
import { Button, StatusBadge, type StatusTone } from '@/shared'
import styles from './AnnotationsPage.module.scss'

const WIDTH = 720
const HEIGHT = 320
const PAD = { top: 48, right: 24, bottom: 36, left: 48 }

const KIND_TONE: Record<AnnotationKind, StatusTone> = {
  peak: 'success',
  trough: 'danger',
  'largest-change': 'warning',
  threshold: 'brand',
  note: 'neutral',
}

const KIND_LABEL: Record<AnnotationKind, string> = {
  peak: 'peak',
  trough: 'low point',
  'largest-change': 'biggest change',
  threshold: 'target crossed',
  note: 'note',
}

export function AnnotationsPage() {
  const data = REVENUE_SERIES
  const [annotations, setAnnotations] = useState<Annotation[]>(() =>
    suggestAnnotations(data, TARGET),
  )
  const [noteIndex, setNoteIndex] = useState(6)

  const values = data.map((point) => point.value)
  const min = Math.floor(Math.min(...values, TARGET) / 50) * 50 - 50
  const max = Math.ceil(Math.max(...values, TARGET) / 50) * 50 + 50
  const innerW = WIDTH - PAD.left - PAD.right
  const innerH = HEIGHT - PAD.top - PAD.bottom
  const x = (index: number) => PAD.left + (index / (data.length - 1)) * innerW
  const y = (value: number) => PAD.top + innerH - ((value - min) / (max - min)) * innerH
  const ticks = Array.from({ length: 5 }, (_, i) => min + ((max - min) / 4) * i)

  const enabled = annotations.filter((item) => item.enabled)

  const patch = (id: string, change: Partial<Annotation>) =>
    setAnnotations((current) => current.map((item) => (item.id === id ? { ...item, ...change } : item)))

  const addNote = () => {
    const id = `note-${Date.now()}`
    setAnnotations((current) => [
      ...current,
      { id, kind: 'note', index: noteIndex, text: `Note on ${data[noteIndex].label}`, enabled: true },
    ])
  }

  const remove = (id: string) => setAnnotations((current) => current.filter((item) => item.id !== id))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Annotation helpers</h1>
        <p className={styles.subtitle}>
          Suggested callouts for the points readers should notice first. Keep two or
          three on a chart; edit the wording so each one states the takeaway.
        </p>
      </header>

      <div className={styles.layout}>
        <figure className={styles.figure}>
          <figcaption className={styles.caption}>
            Monthly revenue, 2026 (USD thousands)
          </figcaption>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={`Line chart of monthly revenue. ${enabled.map((item) => item.text).join('. ')}`}
          >
            {ticks.map((tick) => (
              <g key={tick}>
                <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(tick)} y2={y(tick)} className={styles.grid} />
                <text x={PAD.left - 8} y={y(tick) + 4} className={styles.tick} textAnchor="end">
                  {Math.round(tick)}
                </text>
              </g>
            ))}
            {data.map((point, index) => (
              <text key={point.label} x={x(index)} y={HEIGHT - 12} className={styles.tick} textAnchor="middle">
                {point.label}
              </text>
            ))}

            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={y(TARGET)}
              y2={y(TARGET)}
              className={styles.target}
            />
            <text x={WIDTH - PAD.right} y={y(TARGET) - 6} className={styles.targetLabel} textAnchor="end">
              Target {TARGET}
            </text>

            <polyline
              points={data.map((point, index) => `${x(index)},${y(point.value)}`).join(' ')}
              className={styles.line}
            />

            {enabled.map((item, order) => {
              const px = x(item.index)
              const py = y(data[item.index].value)
              const above = order % 2 === 0
              const ly = above ? py - 26 - (order % 3) * 6 : py + 30 + (order % 3) * 6
              const anchor = item.index > data.length * 0.7 ? 'end' : item.index < 2 ? 'start' : 'middle'
              return (
                <g key={item.id}>
                  <line x1={px} y1={py} x2={px} y2={ly + (above ? 6 : -14)} className={styles.leader} />
                  <circle cx={px} cy={py} r={5} className={styles.marker} />
                  <text x={px} y={ly} className={styles.callout} textAnchor={anchor}>
                    {item.text}
                  </text>
                </g>
              )
            })}
          </svg>
        </figure>

        <aside className={styles.panel} aria-label="Annotations">
          <h2 className={styles.panelTitle}>
            Annotations <span className={styles.count}>{enabled.length} shown</span>
          </h2>
          {enabled.length > 3 && (
            <p className={styles.warning}>More than three callouts compete for attention.</p>
          )}
          <ul className={styles.list}>
            {annotations.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(event) => patch(item.id, { enabled: event.target.checked })}
                    />
                    <StatusBadge tone={KIND_TONE[item.kind]}>{KIND_LABEL[item.kind]}</StatusBadge>
                  </label>
                  <span className={styles.point}>{data[item.index].label}</span>
                  {item.kind === 'note' && (
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.text}`}
                    >
                      ×
                    </button>
                  )}
                </div>
                <input
                  className={styles.text}
                  value={item.text}
                  aria-label={`Text for ${KIND_LABEL[item.kind]} annotation`}
                  onChange={(event) => patch(item.id, { text: event.target.value })}
                />
              </li>
            ))}
          </ul>
          <div className={styles.add}>
            <select
              className={styles.select}
              value={noteIndex}
              aria-label="Month for new note"
              onChange={(event) => setNoteIndex(Number(event.target.value))}
            >
              {data.map((point, index) => (
                <option key={point.label} value={index}>
                  {point.label}
                </option>
              ))}
            </select>
            <Button size="sm" variant="secondary" onClick={addNote}>
              Add note
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
