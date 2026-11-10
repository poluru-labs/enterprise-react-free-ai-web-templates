export type DocumentStatus = 'Published' | 'Draft' | 'In review' | 'Archived'

export type WorkspaceDocument = {
  id: string
  title: string
  type: string
  owner: string
  status: DocumentStatus
  updatedAt: string
}

export type DocTemplate = {
  id: string
  name: string
  category: string
  version: string
  uses: number
  owner: string
  updatedAt: string
}

export type DocReview = {
  id: string
  title: string
  documentId: string
  assignee: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Approved' | 'Changes requested'
  updatedAt: string
}
