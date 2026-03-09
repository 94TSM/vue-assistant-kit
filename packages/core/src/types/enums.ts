/**
 * Message role type
 */
export type MessageRole = 'user' | 'assistant' | 'system'

/**
 * Message status type
 */
export type MessageStatus = 'pending' | 'streaming' | 'success' | 'error' | 'aborted'

/**
 * Stream protocol type
 */
export type StreamProtocol = 'sse' | 'fetch' | 'websocket'

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * Content block type for multimodal messages
 */
export type ContentBlockType =
  | 'text'
  | 'image'
  | 'audio'
  | 'video'
  | 'file'
  | 'chart'
  | 'reference'

/**
 * Thinking step status
 */
export type ThinkingStepStatus = 'pending' | 'processing' | 'done' | 'error'

/**
 * Action type for AIActionPanel
 */
export type ActionType = 'button' | 'link' | 'form' | 'modal'

/**
 * Action layout type
 */
export type ActionLayout = 'horizontal' | 'vertical' | 'grid'

/**
 * Loading mode type
 */
export type LoadingMode = 'skeleton' | 'dots'

/**
 * Time display mode
 */
export type TimeMode = 'relative' | 'absolute'
