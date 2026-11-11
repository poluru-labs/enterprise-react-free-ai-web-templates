export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type FindingCategory = 'bug' | 'security' | 'maintainability' | 'performance' | 'style'

export type DiffLineKind = 'context' | 'add' | 'remove'

export interface DiffLine {
  kind: DiffLineKind
  oldNumber: number | null
  newNumber: number | null
  text: string
}

export interface ReviewComment {
  id: string
  file: string
  line: number
  author: string
  body: string
  severity: Severity
  resolved: boolean
}

export interface ChangedFile {
  path: string
  language: string
  before: string
  after: string
}

export interface PullRequest {
  id: string
  number: number
  title: string
  author: string
  branch: string
  files: ChangedFile[]
}

export interface HeuristicRule {
  id: string
  name: string
  category: FindingCategory
  severity: Severity
  pattern: string
  flags?: string
  message: string
}

export interface HeuristicMatch {
  ruleId: string
  line: number
  excerpt: string
}

export type PatchStatus = 'proposed' | 'accepted' | 'dismissed'

export interface SuggestedPatch {
  id: string
  file: string
  title: string
  rationale: string
  category: FindingCategory
  severity: Severity
  before: string
  after: string
  status: PatchStatus
}

export type FindingStatus = 'open' | 'accepted' | 'dismissed' | 'fixed'

export interface TriageFinding {
  id: string
  pr: number
  file: string
  line: number
  title: string
  category: FindingCategory
  severity: Severity
  status: FindingStatus
  owner: string
  openedAt: string
}
