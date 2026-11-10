import { apiClient } from '@/core/api/client'
import { env } from '@/core/config/env'
import type {
  AiAgent,
  AiMessage,
  ChatCompletionRequest,
  ChatCompletionResponse,
} from '@/core/types/ai'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `msg_${Date.now()}`

/**
 * AI API surface.
 * Swap mock implementations for real backend routes when ready.
 */
export const aiApi = {
  async listAgents(): Promise<AiAgent[]> {
    try {
      return await apiClient<AiAgent[]>('/agents')
    } catch {
      return MOCK_AGENTS
    }
  },

  async completeChat(
    request: ChatCompletionRequest,
  ): Promise<ChatCompletionResponse> {
    try {
      return await apiClient<ChatCompletionResponse>('/chat/completions', {
        method: 'POST',
        body: {
          ...request,
          model: request.model ?? env.aiDefaultModel,
          stream: request.stream ?? env.aiStreamingEnabled,
        },
      })
    } catch {
      return mockCompletion(request)
    }
  },
}

const MOCK_AGENTS: AiAgent[] = [
  {
    id: 'pb_board',
    name: 'Board narrative',
    description: 'Drafts quarterly narratives from Leela Poluru outline templates.',
    model: env.aiDefaultModel,
    status: 'active',
    tools: ['docs.retrieve', 'templates.apply', 'citations.format'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pb_policy',
    name: 'Policy drafter',
    description: 'Expands security and vendor policy sections for Priya Poluru review.',
    model: env.aiDefaultModel,
    status: 'active',
    tools: ['policy.match', 'docs.diff', 'reviews.queue'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pb_support',
    name: 'FAQ composer',
    description: 'Turns release notes into customer-facing FAQ drafts.',
    model: env.aiDefaultModel,
    status: 'draft',
    tools: ['templates.apply', 'tone.check'],
    updatedAt: new Date().toISOString(),
  },
]

function mockCompletion(
  request: ChatCompletionRequest,
): ChatCompletionResponse {
  const lastUser = [...request.messages]
    .reverse()
    .find((message) => message.role === 'user')

  const message: AiMessage = {
    id: createId(),
    role: 'assistant',
    content: lastUser
      ? `Acknowledged: “${lastUser.content}”. Connect \`/chat/completions\` to your AI gateway to replace this mock response.`
      : 'Ready when you are. Ask a question to begin.',
    createdAt: new Date().toISOString(),
    model: request.model ?? env.aiDefaultModel,
  }

  return {
    message,
    usage: {
      promptTokens: 24,
      completionTokens: 48,
      totalTokens: 72,
    },
  }
}
