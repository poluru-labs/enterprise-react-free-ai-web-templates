export type ArticleStatus = 'Published' | 'Draft' | 'Scheduled' | 'Archived'

export type KnowledgeArticle = {
  id: string
  title: string
  category: string
  views: number
  owner: string
  status: ArticleStatus
  updatedAt: string
}

export type KnowledgeCategory = {
  id: string
  name: string
  slug: string
  articles: number
  owner: string
  freshnessDays: number
  updatedAt: string
}

export type MaintenanceTask = {
  id: string
  title: string
  articleId: string
  reason: string
  assignee: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In progress' | 'Done'
  updatedAt: string
}
