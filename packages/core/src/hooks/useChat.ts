import { ref, watch } from 'vue'
import type {
  Message,
  MessageCreateOptions,
  MessageUpdateOptions,
  UseChatOptions,
  UseChatReturn,
} from '../types'

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Hook for managing chat messages and interactions
 *
 * @param options - Chat options
 * @returns Chat state and methods
 *
 * @example
 * ```ts
 * const { messages, input, send, isLoading } = useChat({
 *   api: '/api/chat',
 *   initialMessages: []
 * })
 * ```
 */
export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const {
    api = '/api/chat',
    initialMessages = [],
    modelId,
    headers = {},
    body = {},
    persistenceKey,
    timeout = 30000,
    onSend,
    onReceive,
    onError,
    onAbort,
  } = options

  // State
  const messages = ref<Message[]>([...initialMessages])
  const input = ref<string>('')
  const isLoading = ref<boolean>(false)
  const isStreaming = ref<boolean>(false)
  const error = ref<Error | null>(null)

  let abortController: AbortController | null = null

  /**
   * Load messages from storage
   */
  function loadMessages(): Message[] {
    if (!persistenceKey || typeof window === 'undefined') {
      return []
    }

    try {
      const stored = localStorage.getItem(persistenceKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.map((msg: Message) => ({
          ...msg,
          createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined,
        }))
      }
    } catch (err) {
      console.error('Failed to load messages from storage:', err)
    }

    return []
  }

  /**
   * Save messages to storage
   */
  function saveMessages(msgs: Message[]): void {
    if (!persistenceKey || typeof window === 'undefined') {
      return
    }

    try {
      localStorage.setItem(persistenceKey, JSON.stringify(msgs))
    } catch (err) {
      console.error('Failed to save messages to storage:', err)
    }
  }

  // Load persisted messages on mount
  if (persistenceKey) {
    const persisted = loadMessages()
    if (persisted.length > 0) {
      messages.value = persisted
    }
  }

  // Watch messages and persist
  if (persistenceKey) {
    watch(
      messages,
      (msgs) => {
        saveMessages(msgs)
      },
      { deep: true }
    )
  }

  /**
   * Add a new message
   */
  function addMessage(messageOptions: MessageCreateOptions): Message {
    const message: Message = {
      id: messageOptions.id || generateId(),
      role: messageOptions.role,
      content: messageOptions.content,
      createdAt: messageOptions.createdAt || new Date(),
      parentId: messageOptions.parentId,
      metadata: messageOptions.metadata,
      status: 'pending',
    }

    messages.value = [...messages.value, message]
    return message
  }

  /**
   * Update a message
   */
  function updateMessage(messageId: string, updates: MessageUpdateOptions): void {
    messages.value = messages.value.map((msg) =>
      msg.id === messageId ? { ...msg, ...updates } : msg
    )
  }

  /**
   * Set messages
   */
  function setMessages(newMessages: Message[]): void {
    messages.value = newMessages
  }

  /**
   * Delete a message
   */
  function deleteMessage(messageId: string): void {
    messages.value = messages.value.filter((msg) => msg.id !== messageId)
  }

  /**
   * Send a message
   */
  async function send(content?: string): Promise<void> {
    const messageContent = content || input.value

    if (!messageContent.trim()) {
      return
    }

    // Add user message
    const userMessage = addMessage({
      role: 'user',
      content: messageContent,
    })

    // Clear input
    if (!content) {
      input.value = ''
    }

    // Call onSend callback
    onSend?.(userMessage)

    // Create assistant message placeholder
    const assistantMessage = addMessage({
      role: 'assistant',
      content: '',
    })

    // Start streaming
    isLoading.value = true
    isStreaming.value = true
    error.value = null

    abortController = new AbortController()

    const timeoutId = setTimeout(() => {
      abortController?.abort()
    }, timeout)

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          messages: messages.value
            .filter((msg) => msg.id !== assistantMessage.id)
            .map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          modelId,
          ...body,
        }),
        signal: abortController.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Response body is null')
      }

      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        fullContent += chunk

        // Update assistant message with streaming content
        updateMessage(assistantMessage.id, {
          content: fullContent,
          status: 'streaming',
        })
      }

      // Mark as complete
      updateMessage(assistantMessage.id, {
        status: 'success',
      })

      onReceive?.(messages.value.find((msg) => msg.id === assistantMessage.id)!)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        updateMessage(assistantMessage.id, {
          status: 'aborted',
        })
        onAbort?.()
      } else {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        error.value = errorObj
        updateMessage(assistantMessage.id, {
          status: 'error',
          error: errorObj.message,
        })
        onError?.(errorObj)
      }
    } finally {
      isLoading.value = false
      isStreaming.value = false
      abortController = null
    }
  }

  /**
   * Reload last assistant message
   */
  async function reload(): Promise<void> {
    const lastAssistantMessage = [...messages.value]
      .reverse()
      .find((msg) => msg.role === 'assistant')

    if (lastAssistantMessage) {
      // Remove last assistant message
      deleteMessage(lastAssistantMessage.id)

      // Get last user message
      const lastUserMessage = [...messages.value]
        .reverse()
        .find((msg) => msg.role === 'user')

      if (lastUserMessage) {
        // Resend
        await send(lastUserMessage.content)
      }
    }
  }

  /**
   * Abort current request
   */
  function abort(): void {
    if (abortController) {
      abortController.abort()
    }
  }

  /**
   * Retry a failed message
   */
  async function retry(messageId: string): Promise<void> {
    const message = messages.value.find((msg) => msg.id === messageId)
    if (!message || message.role !== 'assistant') {
      return
    }

    // Find the user message before this assistant message
    const messageIndex = messages.value.findIndex((msg) => msg.id === messageId)
    const userMessage = messages.value
      .slice(0, messageIndex)
      .reverse()
      .find((msg) => msg.role === 'user')

    if (userMessage) {
      // Remove failed assistant message
      deleteMessage(messageId)

      // Resend user message
      await send(userMessage.content)
    }
  }

  /**
   * Edit a message
   */
  async function edit(messageId: string, content: string): Promise<void> {
    const message = messages.value.find((msg) => msg.id === messageId)
    if (!message || message.role !== 'user') {
      return
    }

    // Update message content
    updateMessage(messageId, { content })

    // Remove all messages after this one
    const messageIndex = messages.value.findIndex((msg) => msg.id === messageId)
    messages.value = messages.value.slice(0, messageIndex + 1)

    // Resend
    await send(content)
  }

  return {
    messages,
    input,
    isLoading,
    isStreaming,
    error,
    send,
    reload,
    abort,
    retry,
    delete: deleteMessage,
    edit,
    setMessages,
    addMessage,
    updateMessage,
  }
}
