export type QueryStatus = 'Success' | 'Slow' | 'Zero' | 'Error'

export type SearchQuery = {
  id: string
  text: string
  index: string
  latencyMs: number
  hits: number
  status: QueryStatus
  owner: string
  updatedAt: string
}

export type SearchIndex = {
  id: string
  name: string
  records: number
  dimensions: number
  freshnessDays: number
  owner: string
  updatedAt: string
}

export type RankingMetric = {
  id: string
  name: string
  cohort: string
  ndcg: number
  mrr: number
  owner: string
  updatedAt: string
}

export type SearchEvaluation = {
  id: string
  title: string
  queryId: string
  rating: number
  assignee: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Reviewed' | 'Done'
  updatedAt: string
}
