import type { ChartKind, ChartRecommendation, DataPoint, DataProfile } from '@/core'

export function recommendCharts(profile: DataProfile): ChartRecommendation[] {
  const { goal, categories, hasTime, measures, rows } = profile
  const results: ChartRecommendation[] = []

  switch (goal) {
    case 'trend':
      if (hasTime) {
        results.push({ kind: 'line', score: 94, reason: 'Lines make change over continuous time easy to read.' })
        results.push({
          kind: 'area',
          score: measures <= 2 ? 72 : 48,
          reason: 'Area emphasizes volume over time for one or two series.',
          caution: measures > 2 ? 'Overlapping areas hide each other past two series.' : undefined,
        })
        results.push({
          kind: 'bar',
          score: rows <= 12 ? 60 : 35,
          reason: 'Columns work for a handful of discrete periods.',
          caution: rows > 12 ? 'Too many periods for columns; use a line.' : undefined,
        })
      } else {
        results.push({
          kind: 'bar',
          score: 55,
          reason: 'Without a time field, compare ordered categories instead.',
          caution: 'Add a date or period column to show a true trend.',
        })
      }
      break
    case 'compare':
      results.push({
        kind: 'bar',
        score: categories <= 12 ? 93 : 74,
        reason: 'Aligned bars give the most accurate length comparison.',
        caution: categories > 12 ? 'Sort descending and show the top 10 plus "Other".' : undefined,
      })
      if (measures > 1) {
        results.push({ kind: 'stacked-bar', score: 66, reason: 'Shows totals and parts across categories.' })
      }
      results.push({
        kind: 'donut',
        score: categories <= 4 ? 40 : 18,
        reason: 'Angles are hard to compare precisely.',
        caution: 'Prefer bars for comparison tasks.',
      })
      break
    case 'composition':
      results.push({
        kind: 'stacked-bar',
        score: hasTime ? 88 : 80,
        reason: hasTime
          ? 'Stacked columns show how the mix shifts across periods.'
          : 'A single stacked bar shows part-to-whole with a shared baseline.',
      })
      results.push({
        kind: 'donut',
        score: categories <= 5 ? 76 : 30,
        reason: 'Readable part-to-whole for a few slices.',
        caution: categories > 5 ? 'More than five slices become hard to label.' : undefined,
      })
      if (hasTime) {
        results.push({ kind: 'area', score: 64, reason: 'Stacked area shows composition over continuous time.' })
      }
      break
    case 'distribution':
      results.push({
        kind: 'histogram',
        score: rows >= 30 ? 92 : 62,
        reason: 'Bins reveal shape, skew, and outliers.',
        caution: rows < 30 ? 'Small samples make bin shapes unreliable.' : undefined,
      })
      if (measures >= 2) {
        results.push({ kind: 'scatter', score: 58, reason: 'Shows how two measures spread together.' })
      }
      results.push({ kind: 'bar', score: 34, reason: 'Only if values are already bucketed.' })
      break
    case 'relationship':
      results.push({
        kind: 'scatter',
        score: measures >= 2 ? 95 : 40,
        reason: 'Plots one measure against another to expose correlation.',
        caution: measures < 2 ? 'Needs at least two numeric measures.' : undefined,
      })
      if (hasTime) {
        results.push({ kind: 'line', score: 52, reason: 'Dual series over time can hint at co-movement.' })
      }
      break
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 3)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function sampleData(kind: ChartKind): DataPoint[] {
  switch (kind) {
    case 'line':
    case 'area':
      return MONTHS.map((label, index) => ({ label, value: 40 + index * 4 + ((index * 7) % 11) }))
    case 'histogram':
      return [3, 7, 14, 22, 28, 24, 16, 9, 5, 2].map((value, index) => ({ label: `b${index}`, value }))
    case 'scatter':
      return Array.from({ length: 18 }, (_, index) => ({
        label: `p${index}`,
        value: 10 + index * 3 + ((index * 13) % 9),
      }))
    case 'donut':
      return [
        { label: 'Direct', value: 42 },
        { label: 'Partner', value: 28 },
        { label: 'Online', value: 19 },
        { label: 'Other', value: 11 },
      ]
    default:
      return [
        { label: 'North', value: 82 },
        { label: 'South', value: 64 },
        { label: 'East', value: 51 },
        { label: 'West', value: 38 },
        { label: 'Central', value: 27 },
      ]
  }
}
