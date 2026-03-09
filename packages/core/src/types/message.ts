import type { MessageRole, MessageStatus, ContentBlockType } from './enums'

/**
 * Tool invocation result
 */
export interface ToolInvocation {
  toolCallId: string
  toolName: string
  args: Record<string, unknown>
  result?: unknown
  state: 'partial-call' | 'call' | 'partial-result' | 'result'
}

/**
 * Content block for multimodal messages
 */
export interface ContentBlock {
  type: ContentBlockType
  text?: string
  url?: string
  mimeType?: string
  data?: unknown
  metadata?: Record<string, unknown>
}

/**
 * Base message interface
 */
export interface BaseMessage {
  id: string
  role: MessageRole
  content: string
  createdAt?: Date
  status?: MessageStatus
}

/**
 * Message with generic metadata support
 */
export interface Message<T = Record<string, unknown>> extends BaseMessage {
  /**
   * Message content blocks for multimodal support
   */
  contentBlocks?: ContentBlock[]

  /**
   * Tool invocations
   */
  toolInvocations?: ToolInvocation[]

  /**
   * Parent message ID for branching
   */
  parentId?: string

  /**
   * Custom metadata
   */
  metadata?: T

  /**
   * Error message if status is 'error'
   */
  error?: string

  /**
   * Model ID used for this message
   */
  modelId?: string

  /**
   * Finish reason
   */
  finishReason?: 'stop' | 'length' | 'tool-calls' | 'error'
}

/**
 * Message create options
 */
export interface MessageCreateOptions {
  role: MessageRole
  content: string
  id?: string
  createdAt?: Date
  parentId?: string
  metadata?: Record<string, unknown>
}

/**
 * Message update options
 */
export interface MessageUpdateOptions {
  content?: string
  status?: MessageStatus
  error?: string
  metadata?: Record<string, unknown>
  contentBlocks?: ContentBlock[]
  toolInvocations?: ToolInvocation[]
}

/**
 * Reference citation for knowledge base
 */
export interface ReferenceCitation {
  id: string
  documentId: string
  documentName: string
  content: string
  pageNumber?: number
  position?: {
    start: number
    end: number
  }
  score?: number
}

/**
 * Thinking step for reasoning process
 */
export interface ThinkingStep {
  id: string
  title: string
  description?: string
  status: 'pending' | 'processing' | 'done' | 'error'
  startTime?: number
  endTime?: number
  duration?: number
  error?: string
  details?: string
  toolCalls?: ToolInvocation[]
}
