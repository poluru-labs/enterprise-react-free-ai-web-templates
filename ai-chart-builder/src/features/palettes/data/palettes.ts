import type { ChartPalette } from '@/core'

export const CHART_PALETTES: ChartPalette[] = [
  {
    id: 'okabe-ito',
    name: 'Okabe–Ito',
    description: 'Categorical set (black omitted) designed to stay distinct for common color-vision deficiencies.',
    colors: ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'],
  },
  {
    id: 'brand-series',
    name: 'Brand series',
    description: 'Navy-led categorical palette tuned for slides and dashboards.',
    colors: ['#29527A', '#C8590F', '#4A9FD0', '#B8890B', '#8E8E8E'],
  },
  {
    id: 'traffic',
    name: 'Red / green status',
    description: 'Common status palette. Shown here as a counterexample.',
    colors: ['#D62728', '#2CA02C', '#FF7F0E', '#BCBD22'],
  },
  {
    id: 'sequential-blue',
    name: 'Sequential blue',
    description: 'Ordered lightness ramp for heatmaps and choropleths.',
    colors: ['#DCE6F0', '#A9C1DA', '#7299C2', '#43709F', '#29527A', '#16304A'],
  },
]
