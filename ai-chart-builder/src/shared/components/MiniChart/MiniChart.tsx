import type { ReactNode } from 'react'
import type { ChartKind, DataPoint } from '@/core'
import styles from './MiniChart.module.scss'

type MiniChartProps = {
  kind: ChartKind
  data: DataPoint[]
  colors: string[]
  width?: number
  height?: number
  title: string
}

const PAD = 8

function polar(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

export function MiniChart({ kind, data, colors, width = 240, height = 140, title }: MiniChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1)
  const innerW = width - PAD * 2
  const innerH = height - PAD * 2
  const step = innerW / Math.max(data.length, 1)
  const y = (value: number) => PAD + innerH - (value / max) * innerH
  const x = (index: number) => PAD + step * index + step / 2
  const primary = colors[0] ?? 'currentColor'

  let body: ReactNode = null

  if (kind === 'bar' || kind === 'histogram') {
    const gap = kind === 'histogram' ? 1 : step * 0.25
    body = data.map((point, index) => (
      <rect
        key={point.label}
        x={PAD + step * index + gap / 2}
        y={y(point.value)}
        width={step - gap}
        height={PAD + innerH - y(point.value)}
        fill={kind === 'bar' ? colors[index % colors.length] : primary}
        rx={kind === 'bar' ? 2 : 0}
      />
    ))
  } else if (kind === 'stacked-bar') {
    body = data.map((point, index) => {
      const parts = [0.5, 0.3, 0.2]
      let top = PAD + innerH
      return parts.map((share, part) => {
        const h = (point.value / max) * innerH * share
        top -= h
        return (
          <rect
            key={`${point.label}-${part}`}
            x={PAD + step * index + step * 0.15}
            y={top}
            width={step * 0.7}
            height={h}
            fill={colors[part % colors.length]}
          />
        )
      })
    })
  } else if (kind === 'line' || kind === 'area') {
    const points = data.map((point, index) => `${x(index)},${y(point.value)}`).join(' ')
    body = (
      <>
        {kind === 'area' && (
          <polygon
            points={`${x(0)},${PAD + innerH} ${points} ${x(data.length - 1)},${PAD + innerH}`}
            fill={primary}
            opacity={0.25}
          />
        )}
        <polyline points={points} fill="none" stroke={primary} strokeWidth={2.5} strokeLinejoin="round" />
      </>
    )
  } else if (kind === 'scatter') {
    body = data.map((point, index) => (
      <circle
        key={point.label}
        cx={PAD + ((index * 37) % innerW)}
        cy={y(point.value)}
        r={4}
        fill={colors[index % colors.length]}
        opacity={0.85}
      />
    ))
  } else if (kind === 'donut') {
    const total = data.reduce((sum, point) => sum + point.value, 0) || 1
    const cx = width / 2
    const cy = height / 2
    const r = Math.min(innerW, innerH) / 2
    let angle = -Math.PI / 2
    body = data.map((point, index) => {
      const sweep = (point.value / total) * Math.PI * 2
      const start = polar(cx, cy, r, angle)
      const end = polar(cx, cy, r, angle + sweep)
      const large = sweep > Math.PI ? 1 : 0
      angle += sweep
      return (
        <path
          key={point.label}
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
          fill="none"
          stroke={colors[index % colors.length]}
          strokeWidth={r * 0.45}
        />
      )
    })
  }

  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={title}
    >
      <line x1={PAD} x2={width - PAD} y1={PAD + innerH} y2={PAD + innerH} className={styles.axis} />
      {body}
    </svg>
  )
}
