export type ChartKind = 'bar' | 'line' | 'area' | 'scatter' | 'stacked-bar' | 'histogram' | 'donut'

export type AnalysisGoal = 'compare' | 'trend' | 'composition' | 'distribution' | 'relationship'

export interface DataProfile {
  goal: AnalysisGoal
  categories: number
  hasTime: boolean
  measures: number
  rows: number
}

export interface ChartRecommendation {
  kind: ChartKind
  score: number
  reason: string
  caution?: string
}

export interface DataPoint {
  label: string
  value: number
}

export type AnnotationKind = 'peak' | 'trough' | 'largest-change' | 'threshold' | 'note'

export interface Annotation {
  id: string
  kind: AnnotationKind
  index: number
  text: string
  enabled: boolean
}

export interface ChartPalette {
  id: string
  name: string
  description: string
  colors: string[]
}

export type ColorVision = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'

export type ExportFormat = 'png' | 'svg' | 'pdf'

export interface ExportPreset {
  id: string
  name: string
  use: string
  format: ExportFormat
  width: number
  height: number
  scale: number
  fontScale: number
  background: 'transparent' | 'white' | 'dark'
  includeAltText: boolean
  includeSource: boolean
}
