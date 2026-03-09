/*
 * @Date: 2026-03-07 10:11:16
 * @LastEditTime: 2026-03-09 08:27:25
 * @Description: 
 */
import type { InjectionKey, Ref, ComputedRef } from 'vue'
import type { Message, MessageCreateOptions, MessageUpdateOptions } from '../../types'

/**
 * AIChat context interface
 */
export interface AIChatContext {
  // State
  messages: Ref<Message[]>
  input: Ref<string>
  isLoading: Ref<boolean>
  isStreaming: Ref<boolean>
  error: Ref<Error | null>
  disabled: ComputedRef<boolean>

  // Methods
  send: (content?: string) => Promise<void>
  reload: () => Promise<void>
  abort: () => void
  retry: (messageId: string) => Promise<void>
  delete: (messageId: string) => void
  edit: (messageId: string, content: string) => Promise<void>
  setMessages: (messages: Message[]) => void
  addMessage: (message: MessageCreateOptions) => Message
  updateMessage: (messageId: string, updates: MessageUpdateOptions) => void
}
