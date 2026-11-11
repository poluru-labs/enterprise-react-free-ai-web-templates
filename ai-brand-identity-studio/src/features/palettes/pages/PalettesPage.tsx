import { useState } from 'react'
import type { Palette } from '@/core'
import { LOCKUP_WORDMARK, MOCK_PALETTES } from '@/features/palettes/data/mockPalettes'
import {
  Button,
  StatusBadge,
  cn,
  contrastRatio,
  readableTextOn,
  wcagLevel,
  type StatusTone,
  type WcagLevel,
} from '@/shared'
import styles from './PalettesPage.module.scss'

const LEVEL_TONE: Record<WcagLevel, StatusTone> = {
  AAA: 'success',
  AA: 'success',
  'AA large': 'warning',
  Fail: 'danger',
}

export function PalettesPage() {
  const [palettes, setPalettes] = useState<Palette[]>(MOCK_PALETTES)
  const [selectedId, setSelectedId] = useState(MOCK_PALETTES[0]?.id ?? '')
  const selected = palettes.find((palette) => palette.id === selectedId) ?? palettes[0]

  const toggleApproved = (id: string) => {
    setPalettes((current) =>
      current.map((palette) =>
        palette.id === id ? { ...palette, approved: !palette.approved } : palette,
      ),
    )
  }

  const backgrounds = selected.swatches
  const foregrounds = selected.swatches.filter((swatch) => swatch.role !== 'accent')

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Palette lockups</h1>
        <p className={styles.subtitle}>
          Preview the wordmark on every swatch and check text contrast against
          WCAG 2.2 before a palette is approved.
        </p>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Palettes">
        {palettes.map((palette) => (
          <button
            key={palette.id}
            type="button"
            role="tab"
            aria-selected={palette.id === selected.id}
            className={cn(styles.tab, palette.id === selected.id && styles.tabActive)}
            onClick={() => setSelectedId(palette.id)}
          >
            <span className={styles.tabSwatches} aria-hidden="true">
              {palette.swatches.map((swatch) => (
                <span key={swatch.hex} style={{ background: swatch.hex }} />
              ))}
            </span>
            {palette.name}
          </button>
        ))}
      </div>

      <section className={styles.panel} role="tabpanel" aria-label={selected.name}>
        <div className={styles.panelHead}>
          <div>
            <h2 className={styles.panelTitle}>{selected.name}</h2>
            <p className={styles.panelText}>{selected.description}</p>
          </div>
          <div className={styles.panelActions}>
            <StatusBadge tone={selected.approved ? 'success' : 'warning'}>
              {selected.approved ? 'approved' : 'in review'}
            </StatusBadge>
            <Button
              size="sm"
              variant={selected.approved ? 'secondary' : 'primary'}
              onClick={() => toggleApproved(selected.id)}
            >
              {selected.approved ? 'Revoke approval' : 'Approve palette'}
            </Button>
          </div>
        </div>

        <ul className={styles.lockups} aria-label="Wordmark lockups">
          {backgrounds.map((swatch) => {
            const text = readableTextOn(swatch.hex)
            const ratio = contrastRatio(text, swatch.hex)
            const level = wcagLevel(ratio)
            return (
              <li key={swatch.hex} className={styles.lockup}>
                <div className={styles.lockupArt} style={{ background: swatch.hex, color: text }}>
                  <span className={styles.mark} style={{ borderColor: text }}>
                    {LOCKUP_WORDMARK.charAt(0)}
                  </span>
                  <span className={styles.wordmark}>{LOCKUP_WORDMARK}</span>
                </div>
                <div className={styles.lockupMeta}>
                  <span>
                    <strong>{swatch.name}</strong>{' '}
                    <code className={styles.hex}>{swatch.hex}</code>
                  </span>
                  <span className={styles.lockupRatio}>
                    {ratio.toFixed(2)}:1 <StatusBadge tone={LEVEL_TONE[level]}>{level}</StatusBadge>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className={styles.matrixWrap}>
          <h3 className={styles.matrixTitle}>Text-on-background contrast</h3>
          <table className={styles.matrix}>
            <thead>
              <tr>
                <th scope="col">Text ↓ / Background →</th>
                {backgrounds.map((bg) => (
                  <th key={bg.hex} scope="col">
                    <span className={styles.chip} style={{ background: bg.hex }} />
                    {bg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {foregrounds.map((fg) => (
                <tr key={fg.hex}>
                  <th scope="row">
                    <span className={styles.chip} style={{ background: fg.hex }} />
                    {fg.name}
                  </th>
                  {backgrounds.map((bg) => {
                    if (fg.hex === bg.hex) {
                      return (
                        <td key={bg.hex} className={styles.na}>
                          —
                        </td>
                      )
                    }
                    const ratio = contrastRatio(fg.hex, bg.hex)
                    const level = wcagLevel(ratio)
                    return (
                      <td key={bg.hex} className={cn(level === 'Fail' && styles.fail)}>
                        {ratio.toFixed(1)}
                        <span className={styles.level}>{level}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
