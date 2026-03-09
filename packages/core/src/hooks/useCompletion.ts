import { ref } from 'vue'
import type { UseCompletionOptions, UseCompletionReturn } from '../types'

/**
 * Hook for text completion functionality
 *
 * @param options - Completion options
 * @returns Completion state and methods
 *
 * @example
 * ```ts
 * const { completion, complete, isLoading } = useCompletion({
 *   api: '/api/completion'
 * })
 *
 * const result = await complete('Write a poem about')
 * ```
 */
export function useCompletion(options: UseCompletionOptions = {}): UseCompletionReturn {
  const {
    api = '/api/completion',
    initialCompletion = '',
    headers = {},
    body = {},
    onComplete,
    onError,
  } = options

  const completion = ref<string>(initialCompletion)
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  let abortController: AbortController | null = null

  /**
   * Complete text based on prompt
   */
  async function complete(
    prompt: string,
    options?: Record<string, unknown>
  ): Promise<string> {
    isLoading.value = true
    error.value = null
    completion.value = ''

    abortController = new AbortController()

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          prompt,
          ...body,
          ...options,
        }),
        signal: abortController.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Response body is null')
      }

      const decoder = new TextDecoder()
      let fullCompletion = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        fullCompletion += chunk
        completion.value = fullCompletion
      }

      onComplete?.(fullCompletion)
      return fullCompletion
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        error.value = errorObj
        onError?.(errorObj)
        throw errorObj
      }
      return ''
    } finally {
      isLoading.value = false
      abortController = null
    }
  }

  /**
   * Stop completion
   */
  function stop(): void {
    if (abortController) {
      abortController.abort()
      isLoading.value = false
    }
  }

  return {
    completion,
    isLoading,
    error,
    complete,
    stop,
  }
}
