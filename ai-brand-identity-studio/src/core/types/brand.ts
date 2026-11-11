export interface VoiceAttribute {
  id: string
  trait: string
  weAre: string
  weAreNot: string
  example: string
}

export interface ToneByChannel {
  channel: string
  formality: number
  warmth: number
  guidance: string
}

export interface VocabularyRule {
  avoid: string
  prefer: string
  reason: string
}

export type NameStatus = 'shortlisted' | 'exploring' | 'rejected'

export interface NameCandidate {
  id: string
  name: string
  rationale: string
  territory: string
  memorability: number
  pronounceability: number
  trademarkRisk: 'low' | 'medium' | 'high'
  domainAvailable: boolean
  status: NameStatus
  proposedBy: string
}

export interface PaletteSwatch {
  name: string
  hex: string
  role: 'primary' | 'secondary' | 'neutral' | 'accent'
}

export interface Palette {
  id: string
  name: string
  description: string
  swatches: PaletteSwatch[]
  approved: boolean
}

export type CheckResult = 'pass' | 'warn' | 'fail'
export type CheckCategory = 'logo' | 'color' | 'voice' | 'legal'

export interface ComplianceCheck {
  id: string
  asset: string
  channel: string
  category: CheckCategory
  rule: string
  result: CheckResult
  detail: string
  reviewer: string
  checkedAt: string
}
