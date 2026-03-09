import type { Ref, ComputedRef } from 'vue'
import type { Message, MessageCreateOptions, MessageUpdateOptions } from './message'
import type { StreamProtocol } from './enums'

/**
 * useChat options
 */
export interface UseChatOptions {
  /**
   * API endpoint
   */
  api?: string

  /**
   * Initial messages
   */
  initialMessages?: Message[]

  /**
   * Model ID
   */
  modelId?: string

  /**
   * Request headers
   */
  headers?: Record<string, string>

  /**
   * Request body
   */
  body?: Record<string, unknown>

  /**
   * Persistence key
   */
  persistenceKey?: string

  /**
   * Max retries
   */
  maxRetries?: number

  /**
   * Request timeout
   */
  timeout?: number

  /**
   * Stream protocol
   */
  streamProtocol?: StreamProtocol

  /**
   * On message send callback
   */
  onSend?: (message: Message) => void

  /**
   * On message receive callback
   */
  onReceive?: (message: Message) => void

  /**
   * On error callback
   */
  onError?: (error: Error) => void

  /**
   * On abort callback
   */
  onAbort?: () => void
}

/**
 * useChat return type
 */
export interface UseChatReturn {
  /**
   * Messages list
   */
  messages: Ref<Message[]>

  /**
   * Current input value
   */
  input: Ref<string>

  /**
   * Is loading state
   */
  isLoading: Ref<boolean>

  /**
   * Is streaming state
   */
  isStreaming: Ref<boolean>

  /**
   * Error state
   */
  error: Ref<Error | null>

  /**
   * Send message
   */
  send: (content?: string) => Promise<void>

  /**
   * Reload last message
   */
  reload: () => Promise<void>

  /**
   * Abort current request
   */
  abort: () => void

  /**
   * Retry failed message
   */
  retry: (messageId: string) => Promise<void>

  /**
   * Delete message
   */
  delete: (messageId: string) => void

  /**
   * Edit message
   */
  edit: (messageId: string, content: string) => Promise<void>

  /**
   * Set messages
   */
  setMessages: (messages: Message[]) => void

  /**
   * Add message
   */
  addMessage: (message: MessageCreateOptions) => Message

  /**
   * Update message
   */
  updateMessage: (messageId: string, updates: MessageUpdateOptions) => void
}

/**
 * useStream options
 */
export interface UseStreamOptions {
  /**
   * Stream protocol
   */
  protocol?: StreamProtocol

  /**
   * On data callback
   */
  onData?: (data: string) => void

  /**
   * On error callback
   */
  onError?: (error: Error) => void

  /**
   * On complete callback
   */
  onComplete?: () => void

  /**
   * Auto reconnect
   */
  autoReconnect?: boolean

  /**
   * Max reconnect attempts
   */
  maxReconnectAttempts?: number
}

/**
 * useStream return type
 */
export interface UseStreamReturn {
  /**
   * Stream data
   */
  data: Ref<string>

  /**
   * Is streaming state
   */
  isStreaming: Ref<boolean>

  /**
   * Error state
   */
  error: Ref<Error | null>

  /**
   * Start stream
   */
  start: (url: string, options?: RequestInit) => Promise<void>

  /**
   * Stop stream
   */
  stop: () => void
}

/**
 * useCompletion options
 */
export interface UseCompletionOptions {
  /**
   * API endpoint
   */
  api?: string

  /**
   * Initial completion text
   */
  initialCompletion?: string

  /**
   * Request headers
   */
  headers?: Record<string, string>

  /**
   * Request body
   */
  body?: Record<string, unknown>

  /**
   * On complete callback
   */
  onComplete?: (completion: string) => void

  /**
   * On error callback
   */
  onError?: (error: Error) => void
}

/**
 * useCompletion return type
 */
export interface UseCompletionReturn {
  /**
   * Completion text
   */
  completion: Ref<string>

  /**
   * Is loading state
   */
  isLoading: Ref<boolean>

  /**
   * Error state
   */
  error: Ref<Error | null>

  /**
   * Complete function
   */
  complete: (prompt: string, options?: Record<string, unknown>) => Promise<string>

  /**
   * Stop completion
   */
  stop: () => void
}

/**
 * AIChat context type
 */
export interface AIChatContext {
  /**
   * Messages list
   */
  messages: Ref<Message[]>

  /**
   * Current input value
   */
  input: Ref<string>

  /**
   * Is loading state
   */
  isLoading: Ref<boolean>

  /**
   * Is streaming state
   */
  isStreaming: Ref<boolean>

  /**
   * Error state
   */
  error: Ref<Error | null>

  /**
   * Disabled state
   */
  disabled: ComputedRef<boolean>

  /**
   * Send message
   */
  send: (content?: string) => Promise<void>

  /**
   * Reload last message
   */
  reload: () => Promise<void>

  /**
   * Abort current request
   */
  abort: () => void

  /**
   * Retry failed message
   */
  retry: (messageId: string) => Promise<void>

  /**
   * Delete message
   */
  delete: (messageId: string) => void

  /**
   * Edit message
   */
  edit: (messageId: string, content: string) => Promise<void>

  /**
   * Set messages
   */
  setMessages: (messages: Message[]) => void

  /**
   * Add message
   */
  addMessage: (message: MessageCreateOptions) => Message

  /**
   * Update message
   */
  updateMessage: (messageId: string, updates: MessageUpdateOptions) => void
}
