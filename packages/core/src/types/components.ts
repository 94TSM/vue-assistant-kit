import type { Message, MessageCreateOptions } from './message'
import type { MessageStatus, ThemeMode, LoadingMode, TimeMode, ActionLayout, ActionType } from './enums'

/**
 * AIChat component props
 */
export interface AIChatProps {
  /**
   * API endpoint for chat
   */
  api?: string

  /**
   * Initial messages
   */
  initialMessages?: Message[]

  /**
   * Messages for controlled mode
   */
  messages?: Message[]

  /**
   * Model ID
   */
  modelId?: string

  /**
   * Request headers
   */
  headers?: Record<string, string>

  /**
   * Request body parameters
   */
  body?: Record<string, unknown>

  /**
   * Persistence key for localStorage
   */
  persistenceKey?: string

  /**
   * Max retries on failure
   */
  maxRetries?: number

  /**
   * Request timeout in milliseconds
   */
  timeout?: number

  /**
   * Disable all interactions
   */
  disabled?: boolean

  /**
   * Auto-scroll to bottom on new message
   */
  autoScroll?: boolean

  /**
   * Theme mode
   */
  theme?: ThemeMode
}

/**
 * AIChat component emits
 */
export interface AIChatEmits {
  (e: 'update:messages', messages: Message[]): void
  (e: 'send', message: Message): void
  (e: 'receive', message: Message): void
  (e: 'error', error: Error): void
  (e: 'abort'): void
  (e: 'retry', message: Message): void
  (e: 'delete', messageId: string): void
}

/**
 * MessageList component props
 */
export interface MessageListProps {
  /**
   * Custom messages (overrides context)
   */
  messages?: Message[]

  /**
   * Enable virtual scrolling
   */
  virtualScroll?: boolean

  /**
   * Estimated item height for virtual scroll
   */
  itemHeight?: number

  /**
   * Auto scroll behavior
   */
  autoScroll?: boolean

  /**
   * Scroll behavior: 'smooth' | 'auto'
   */
  scrollBehavior?: ScrollBehavior

  /**
   * Show avatar
   */
  showAvatar?: boolean

  /**
   * Show timestamp
   */
  showTime?: boolean

  /**
   * Group messages by role
   */
  groupByRole?: boolean

  /**
   * Show time divider
   */
  showTimeDivider?: boolean
}

/**
 * MessageList component emits
 */
export interface MessageListEmits {
  (e: 'scroll', event: Event): void
  (e: 'reach-top'): void
  (e: 'reach-bottom'): void
  (e: 'message-click', message: Message): void
}

/**
 * Message component props
 */
export interface MessageProps {
  /**
   * Message data
   */
  message: Message

  /**
   * Show avatar
   */
  showAvatar?: boolean

  /**
   * Show timestamp
   */
  showTime?: boolean

  /**
   * User avatar URL
   */
  userAvatar?: string

  /**
   * Assistant avatar URL
   */
  assistantAvatar?: string

  /**
   * Enable copy action
   */
  showCopy?: boolean

  /**
   * Enable retry action
   */
  showRetry?: boolean

  /**
   * Enable edit action
   */
  showEdit?: boolean

  /**
   * Enable delete action
   */
  showDelete?: boolean

  /**
   * Streaming animation speed (ms per character)
   */
  streamingSpeed?: number

  /**
   * Enable markdown rendering
   */
  enableMarkdown?: boolean

  /**
   * Enable code highlight
   */
  enableCodeHighlight?: boolean
}

/**
 * Message component emits
 */
export interface MessageEmits {
  (e: 'copy', message: Message): void
  (e: 'retry', message: Message): void
  (e: 'edit', message: Message): void
  (e: 'delete', messageId: string): void
}

/**
 * ChatInput component props
 */
export interface ChatInputProps {
  /**
   * v-model value
   */
  modelValue?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Disable input
   */
  disabled?: boolean

  /**
   * Auto focus on mount
   */
  autoFocus?: boolean

  /**
   * Auto resize height
   */
  autoResize?: boolean

  /**
   * Min rows for auto resize
   */
  minRows?: number

  /**
   * Max rows for auto resize
   */
  maxRows?: number

  /**
   * Max input length
   */
  maxLength?: number

  /**
   * Enable shortcut keys
   */
  enableShortcut?: boolean

  /**
   * Submit key: 'enter' | 'ctrl-enter'
   */
  submitKey?: 'enter' | 'ctrl-enter'

  /**
   * Clear input after send
   */
  clearOnSend?: boolean

  /**
   * Show send button
   */
  showSendButton?: boolean

  /**
   * Show abort button
   */
  showAbortButton?: boolean
}

/**
 * ChatInput component emits
 */
export interface ChatInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'send', content: string): void
  (e: 'abort'): void
  (e: 'focus'): void
  (e: 'blur'): void
}

/**
 * TypingIndicator component props
 */
export interface TypingIndicatorProps {
  /**
   * Show indicator
   */
  show?: boolean

  /**
   * Number of dots
   */
  dots?: number

  /**
   * Animation speed in ms
   */
  speed?: number

  /**
   * Custom text
   */
  text?: string

  /**
   * Show avatar
   */
  showAvatar?: boolean
}

/**
 * ErrorRetry component props
 */
export interface ErrorRetryProps {
  /**
   * Error message
   */
  error?: string

  /**
   * Show retry button
   */
  showRetry?: boolean

  /**
   * Custom retry text
   */
  retryText?: string
}

/**
 * MessageLoading component props
 */
export interface MessageLoadingProps {
  /**
   * Loading mode
   */
  mode?: LoadingMode

  /**
   * Size
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Custom color
   */
  color?: string

  /**
   * Animation speed
   */
  speed?: number
}

/**
 * MessageTime component props
 */
export interface MessageTimeProps {
  /**
   * Date value
   */
  date: Date | string | number

  /**
   * Display mode
   */
  mode?: TimeMode

  /**
   * Custom format function
   */
  format?: (date: Date) => string
}

/**
 * AIActionPanel component props
 */
export interface AIActionPanelProps {
  /**
   * Actions configuration
   */
  actions: Array<{
    id: string
    type: ActionType
    label: string
    icon?: string
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'text'
    data?: Record<string, unknown>
  }>

  /**
   * Layout mode
   */
  layout?: ActionLayout

  /**
   * Max visible actions (rest in "more" menu)
   */
  maxActionCount?: number

  /**
   * Message ID associated with actions
   */
  messageId?: string
}

/**
 * AIActionPanel component emits
 */
export interface AIActionPanelEmits {
  (e: 'action-click', action: { id: string; data?: Record<string, unknown> }, messageId?: string): void
}
