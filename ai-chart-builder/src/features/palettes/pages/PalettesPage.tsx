import { useState } from 'react'
import type { ChartPalette, ColorVision } from '@/core'
import { CHART_PALETTES } from '@/features/palettes/data/palettes'
import {
  Button,
  MiniChart,
  StatusBadge,
  cn,
  contrastRatio,
  minPairDistance,
  simulateVision,
  type StatusTone,
} from '@/shared'
import styles from './PalettesPage.module.scss'

const VISIONS: { value: ColorVision; label: string }[] = [
  { value: 'normal', label: 'Typical' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
]

const LIGHT_SURFACE = '#ffffff'
const DARK_SURFACE = '#171d28'
const GRAPHIC_CONTRAST = 3

function separation(distance: number): { label: string; tone: StatusTone } {
  if (distance >= 80) return { label: 'distinct', tone: 'success' }
  if (distance >= 50) return { label: 'marginal', tone: 'warning' }
  return { label: 'confusable', tone: 'danger' }
}

function audit(palette: ChartPalette, vision: ColorVision) {
  const simulated = palette.colors.map((color) => simulateVision(color, vision))
  const distance = minPairDistance(simulated)
  const lowOnLight = palette.colors.filter((c) => contrastRatio(c, LIGHT_SURFACE) < GRAPHIC_CONTRAST)
  const lowOnDark = palette.colors.filter((c) => contrastRatio(c, DARK_SURFACE) < GRAPHIC_CONTRAST)
  return { simulated, distance, lowOnLight, lowOnDark }
}

export function PalettesPage() {
  const [vision, setVision] = useState<ColorVision>('deuteranopia')
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (palette: ChartPalette) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(palette.colors))
      setCopied(palette.id)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Accessible palettes</h1>
          <p className={styles.subtitle}>
            Simulate color-vision deficiencies and check every series color against
            the 3:1 non-text contrast minimum on light and dark backgrounds.
          </p>
        </div>
        <div className={styles.segments} role="group" aria-label="Simulate color vision">
          {VISIONS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={cn(styles.segment, vision === item.value && styles.segmentActive)}
              aria-pressed={vision === item.value}
              onClick={() => setVision(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.grid}>
        {CHART_PALETTES.map((palette) => {
          const result = audit(palette, vision)
          const sep = separation(result.distance)
          const sequential = palette.id.startsWith('sequential')
          return (
            <article key={palette.id} className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.name}>{palette.name}</h2>
                {!sequential && <StatusBadge tone={sep.tone}>{sep.label}</StatusBadge>}
              </div>
              <p className={styles.description}>{palette.description}</p>

              <ul className={styles.swatches} aria-label={`${palette.name} colors`}>
                {palette.colors.map((color, index) => (
                  <li key={color} className={styles.swatch}>
                    <span className={styles.chip} style={{ background: result.simulated[index] }} />
                    <code>{color}</code>
                  </li>
                ))}
              </ul>

              <div className={styles.preview}>
                <MiniChart
                  kind={sequential ? 'histogram' : 'bar'}
                  data={result.simulated.map((_, index) => ({
                    label: `s${index}`,
                    value: sequential ? index + 2 : 90 - index * 9,
                  }))}
                  colors={result.simulated}
                  title={`${palette.name} preview as seen with ${vision}`}
                  height={110}
                />
              </div>

              <dl className={styles.stats}>
                {!sequential && (
                  <div>
                    <dt>Closest pair</dt>
                    <dd>{Math.round(result.distance)}</dd>
                  </div>
                )}
                <div>
                  <dt>Below 3:1 on light</dt>
                  <dd>{result.lowOnLight.length ? result.lowOnLight.join(', ') : 'None'}</dd>
                </div>
                <div>
                  <dt>Below 3:1 on dark</dt>
                  <dd>{result.lowOnDark.length ? result.lowOnDark.join(', ') : 'None'}</dd>
                </div>
              </dl>

              <Button size="sm" variant="secondary" onClick={() => void copy(palette)}>
                {copied === palette.id ? 'Copied' : 'Copy hex list'}
              </Button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
