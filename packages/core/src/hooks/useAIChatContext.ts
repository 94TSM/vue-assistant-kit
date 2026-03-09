import { inject, type InjectionKey } from 'vue'
import type { AIChatContext } from '../types'

/**
 * Injection key for AIChat context
 */
export const AIChatContextKey: InjectionKey<AIChatContext> = Symbol('AIChatContext')

/**
 * Hook to access AIChat context
 * Must be used within AIChat component
 *
 * @returns AIChat context
 * @throws Error if used outside of AIChat component
 *
 * @example
 * ```ts
 * const { messages, send, isLoading } = useAIChatContext()
 * ```
 */
export function useAIChatContext(): AIChatContext {
  const context = inject(AIChatContextKey)

  if (!context) {
    throw new Error(
      'useAIChatContext must be used within AIChat component. ' +
        'Make sure to wrap your component with <AIChat>...</AIChat>'
    )
  }

  return context
}
