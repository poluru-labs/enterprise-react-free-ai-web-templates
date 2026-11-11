import type { Annotation, DataPoint } from '@/core'

export const REVENUE_SERIES: DataPoint[] = [
  { label: 'Jan', value: 412 },
  { label: 'Feb', value: 398 },
  { label: 'Mar', value: 455 },
  { label: 'Apr', value: 471 },
  { label: 'May', value: 438 },
  { label: 'Jun', value: 402 },
  { label: 'Jul', value: 389 },
  { label: 'Aug', value: 467 },
  { label: 'Sep', value: 530 },
  { label: 'Oct', value: 556 },
  { label: 'Nov', value: 548 },
  { label: 'Dec', value: 602 },
]

export const TARGET = 500

export function suggestAnnotations(data: DataPoint[], target: number, unit = 'K'): Annotation[] {
  if (data.length === 0) return []

  const values = data.map((point) => point.value)
  const peak = values.indexOf(Math.max(...values))
  const trough = values.indexOf(Math.min(...values))

  let changeIndex = 1
  let changeSize = 0
  for (let i = 1; i < values.length; i += 1) {
    const delta = values[i] - values[i - 1]
    if (Math.abs(delta) > Math.abs(changeSize)) {
      changeSize = delta
      changeIndex = i
    }
  }

  const crossing = values.findIndex((value, i) => i > 0 && values[i - 1] < target && value >= target)
  const pct = Math.round((changeSize / values[changeIndex - 1]) * 100)

  const suggestions: Annotation[] = [
    {
      id: 'peak',
      kind: 'peak',
      index: peak,
      text: `Peak: ${values[peak]}${unit} in ${data[peak].label}`,
      enabled: true,
    },
    {
      id: 'trough',
      kind: 'trough',
      index: trough,
      text: `Low: ${values[trough]}${unit} in ${data[trough].label}`,
      enabled: true,
    },
    {
      id: 'change',
      kind: 'largest-change',
      index: changeIndex,
      text: `${pct >= 0 ? '+' : ''}${pct}% vs ${data[changeIndex - 1].label}`,
      enabled: false,
    },
  ]

  if (crossing > 0) {
    suggestions.push({
      id: 'threshold',
      kind: 'threshold',
      index: crossing,
      text: `Crossed ${target}${unit} target`,
      enabled: true,
    })
  }

  return suggestions
}
