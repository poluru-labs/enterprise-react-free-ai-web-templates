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
    id: 'pb_howto',
    name: 'How-to drafter',
    description: 'Turns support macros into step-by-step articles for Maya Poluru.',
    model: env.aiDefaultModel,
    status: 'active',
    tools: ['articles.retrieve', 'templates.apply', 'tone.check'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pb_deflect',
    name: 'Deflection analyst',
    description: 'Suggests article links from ticket text for Jonah Poluru.',
    model: env.aiDefaultModel,
    status: 'active',
    tools: ['search.similar', 'metrics.deflection'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pb_locale',
    name: 'Locale expander',
    description: 'Drafts localized variants for Priya Poluru review.',
    model: env.aiDefaultModel,
    status: 'draft',
    tools: ['translate.draft', 'glossary.match'],
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
