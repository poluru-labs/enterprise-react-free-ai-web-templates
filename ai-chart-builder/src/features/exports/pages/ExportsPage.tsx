import { useRef, useState } from 'react'
import type { DataPoint, ExportFormat, ExportPreset } from '@/core'
import { EXPORT_PRESETS } from '@/features/exports/data/presets'
import { Button, MiniChart, StatusBadge, cn } from '@/shared'
import styles from './ExportsPage.module.scss'

const DATA: DataPoint[] = [
  { label: 'North', value: 82 },
  { label: 'South', value: 64 },
  { label: 'East', value: 51 },
  { label: 'West', value: 38 },
  { label: 'Central', value: 27 },
]

const TITLE = 'Q3 pipeline by region'
const SOURCE = 'Source: CRM export, Sep 30 2026'
const COLORS = ['#29527A', '#C8590F', '#4A9FD0', '#B8890B', '#8E8E8E']

const BACKGROUNDS: Record<ExportPreset['background'], string> = {
  transparent: 'none',
  white: '#ffffff',
  dark: '#171d28',
}

function altText(data: DataPoint[]): string {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  const top = sorted[0]
  const bottom = sorted[sorted.length - 1]
  return `Bar chart of ${TITLE.toLowerCase()}. ${top.label} leads with ${top.value}, ${bottom.label} is lowest at ${bottom.value}. ${data.length} regions shown.`
}

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  URL.revokeObjectURL(url)
}

export function ExportsPage() {
  const [presets, setPresets] = useState<ExportPreset[]>(EXPORT_PRESETS)
  const [selectedId, setSelectedId] = useState(EXPORT_PRESETS[0].id)
  const previewRef = useRef<HTMLDivElement>(null)

  const preset = presets.find((item) => item.id === selectedId) ?? presets[0]
  const outputW = preset.width * preset.scale
  const outputH = preset.height * preset.scale
  const alt = altText(DATA)
  const dark = preset.background === 'dark'

  const patch = (change: Partial<ExportPreset>) =>
    setPresets((current) => current.map((item) => (item.id === preset.id ? { ...item, ...change } : item)))

  const downloadSvg = () => {
    const chart = previewRef.current?.querySelector('svg')
    if (!chart) return
    const inner = chart.innerHTML
    const viewBox = chart.getAttribute('viewBox') ?? '0 0 240 140'
    const bg = BACKGROUNDS[preset.background]
    const svg = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${outputW}" height="${outputH}" viewBox="${viewBox}" role="img">`,
      `<title>${TITLE}</title>`,
      preset.includeAltText ? `<desc>${alt}</desc>` : '',
      bg === 'none' ? '' : `<rect width="100%" height="100%" fill="${bg}"/>`,
      inner,
      '</svg>',
    ].join('')
    download(`${preset.id}-chart.svg`, svg, 'image/svg+xml')
  }

  const downloadSpec = () => {
    const spec = { ...preset, outputWidth: outputW, outputHeight: outputH, title: TITLE, altText: preset.includeAltText ? alt : undefined }
    download(`${preset.id}-preset.json`, JSON.stringify(spec, null, 2), 'application/json')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Export presets</h1>
        <p className={styles.subtitle}>
          Size, scale, background, and accessibility metadata for each destination,
          so every exported chart ships with a title, alt text, and source line.
        </p>
      </header>

      <div className={styles.layout}>
        <ul className={styles.presets} aria-label="Presets">
          {presets.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={cn(styles.preset, item.id === preset.id && styles.presetActive)}
                aria-current={item.id === preset.id ? 'true' : undefined}
                onClick={() => setSelectedId(item.id)}
              >
                <span className={styles.presetTop}>
                  <span className={styles.presetName}>{item.name}</span>
                  <StatusBadge tone="neutral">{item.format}</StatusBadge>
                </span>
                <span className={styles.presetUse}>{item.use}</span>
                <span className={styles.presetSize}>
                  {item.width}×{item.height} @{item.scale}x
                </span>
              </button>
            </li>
          ))}
        </ul>

        <section className={styles.detail} aria-label={`${preset.name} settings`}>
          <div
            ref={previewRef}
            className={cn(styles.frame, dark && styles.frameDark, preset.background === 'transparent' && styles.frameClear)}
            style={{ aspectRatio: `${preset.width} / ${preset.height}` }}
          >
            <p className={styles.frameTitle} style={{ fontSize: `${preset.fontScale}rem` }}>
              {TITLE}
            </p>
            <div className={styles.frameChart}>
              <MiniChart kind="bar" data={DATA} colors={COLORS} title={alt} />
            </div>
            {preset.includeSource && <p className={styles.frameSource}>{SOURCE}</p>}
          </div>

          <div className={styles.form}>
            <label className={styles.field}>
              <span>Format</span>
              <select value={preset.format} onChange={(event) => patch({ format: event.target.value as ExportFormat })}>
                <option value="png">PNG</option>
                <option value="svg">SVG</option>
                <option value="pdf">PDF</option>
              </select>
            </label>
            <label className={styles.field}>
              <span>Width</span>
              <input
                type="number"
                min={100}
                value={preset.width}
                onChange={(event) => patch({ width: Number(event.target.value) || 100 })}
              />
            </label>
            <label className={styles.field}>
              <span>Height</span>
              <input
                type="number"
                min={100}
                value={preset.height}
                onChange={(event) => patch({ height: Number(event.target.value) || 100 })}
              />
            </label>
            <label className={styles.field}>
              <span>Scale</span>
              <select value={preset.scale} onChange={(event) => patch({ scale: Number(event.target.value) })}>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </label>
            <label className={styles.field}>
              <span>Background</span>
              <select
                value={preset.background}
                onChange={(event) => patch({ background: event.target.value as ExportPreset['background'] })}
              >
                <option value="white">White</option>
                <option value="dark">Dark</option>
                <option value="transparent">Transparent</option>
              </select>
            </label>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={preset.includeAltText}
                onChange={(event) => patch({ includeAltText: event.target.checked })}
              />
              Embed alt text
            </label>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={preset.includeSource}
                onChange={(event) => patch({ includeSource: event.target.checked })}
              />
              Show source line
            </label>
          </div>

          <p className={styles.output}>
            Output: <strong>{outputW}×{outputH}px</strong> {preset.format.toUpperCase()}
          </p>
          {preset.includeAltText ? (
            <p className={styles.alt}>
              <span>Alt text</span>
              {alt}
            </p>
          ) : (
            <p className={styles.warning}>No alt text: screen-reader users will miss this chart.</p>
          )}

          <div className={styles.actions}>
            <Button onClick={downloadSvg}>Download SVG</Button>
            <Button variant="secondary" onClick={downloadSpec}>
              Download preset JSON
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
