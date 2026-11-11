export type ToolNodeKind = 'trigger' | 'prompt' | 'tool' | 'guard' | 'output'

export interface ToolNode {
  id: string
  label: string
  kind: ToolNodeKind
  column: number
  row: number
  description: string
  latencyMs: number
}

export interface ToolEdge {
  from: string
  to: string
  label?: string
}

export interface ToolGraph {
  agentName: string
  version: string
  nodes: ToolNode[]
  edges: ToolEdge[]
}

export type PolicyScope = 'tool' | 'domain' | 'data'
export type PolicyEffect = 'allow' | 'deny' | 'review'

export interface Policy {
  id: string
  name: string
  scope: PolicyScope
  target: string
  effect: PolicyEffect
  enabled: boolean
  owner: string
  updatedAt: string
}

export type RunStatus = 'passed' | 'failed' | 'running'

export interface RunStep {
  id: string
  node: string
  status: RunStatus
  durationMs: number
  note: string
}

export interface SandboxRun {
  id: string
  scenario: string
  agentVersion: string
  status: RunStatus
  tokens: number
  durationMs: number
  startedAt: string
  triggeredBy: string
  steps: RunStep[]
}

export type DeploymentEnv = 'staging' | 'production'
export type DeploymentStatus = 'live' | 'pending-review' | 'approved' | 'rolled-back'

export interface Deployment {
  id: string
  version: string
  env: DeploymentEnv
  status: DeploymentStatus
  changeSummary: string
  author: string
  reviewer: string | null
  deployedAt: string
}
