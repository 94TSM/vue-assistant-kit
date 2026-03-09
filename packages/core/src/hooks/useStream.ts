import { ref, type Ref } from 'vue'
import type { UseStreamOptions, UseStreamReturn, StreamProtocol } from '../types'

/**
 * Hook for handling streaming data from various protocols
 *
 * @param options - Stream options
 * @returns Stream state and control methods
 *
 * @example
 * ```ts
 * const { data, isStreaming, start, stop } = useStream({
 *   protocol: 'sse',
 *   onData: (chunk) => console.log(chunk)
 * })
 *
 * await start('/api/stream')
 * ```
 */
export function useStream(options: UseStreamOptions = {}): UseStreamReturn {
  const {
    protocol = 'fetch',
    onData,
    onError,
    onComplete,
    autoReconnect = true,
    maxReconnectAttempts = 3,
  } = options

  const data = ref<string>('')
  const isStreaming = ref<boolean>(false)
  const error = ref<Error | null>(null)

  let abortController: AbortController | null = null
  let eventSource: EventSource | null = null
  let websocket: WebSocket | null = null
  let reconnectAttempts = 0

  /**
   * Start SSE stream
   */
  async function startSSE(url: string, init?: RequestInit): Promise<void> {
    eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      const chunk = event.data
      data.value += chunk
      onData?.(chunk)
    }

    eventSource.onerror = (event) => {
      const err = new Error('SSE connection error')
      error.value = err
      onError?.(err)

      if (autoReconnect && reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++
        setTimeout(() => startSSE(url, init), 1000 * reconnectAttempts)
      } else {
        stop()
      }
    }

    eventSource.addEventListener('done', () => {
      stop()
      onComplete?.()
    })
  }

  /**
   * Start Fetch stream
   */
  async function startFetch(url: string, init?: RequestInit): Promise<void> {
    abortController = new AbortController()

    try {
      const response = await fetch(url, {
        ...init,
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

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        data.value += chunk
        onData?.(chunk)
      }

      onComplete?.()
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        error.value = err
        onError?.(err)
      }
    } finally {
      stop()
    }
  }

  /**
   * Start WebSocket stream
   */
  async function startWebSocket(url: string, init?: RequestInit): Promise<void> {
    websocket = new WebSocket(url)

    websocket.onmessage = (event) => {
      const chunk = event.data
      data.value += chunk
      onData?.(chunk)
    }

    websocket.onerror = (event) => {
      const err = new Error('WebSocket error')
      error.value = err
      onError?.(err)
    }

    websocket.onclose = () => {
      if (autoReconnect && reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++
        setTimeout(() => startWebSocket(url, init), 1000 * reconnectAttempts)
      } else {
        stop()
        onComplete?.()
      }
    }
  }

  /**
   * Start stream based on protocol
   */
  async function start(url: string, init?: RequestInit): Promise<void> {
    // Reset state
    data.value = ''
    error.value = null
    isStreaming.value = true
    reconnectAttempts = 0

    switch (protocol) {
      case 'sse':
        await startSSE(url, init)
        break
      case 'fetch':
        await startFetch(url, init)
        break
      case 'websocket':
        await startWebSocket(url, init)
        break
      default:
        throw new Error(`Unsupported protocol: ${protocol}`)
    }
  }

  /**
   * Stop stream
   */
  function stop(): void {
    isStreaming.value = false

    if (abortController) {
      abortController.abort()
      abortController = null
    }

    if (eventSource) {
      eventSource.close()
      eventSource = null
    }

    if (websocket) {
      websocket.close()
      websocket = null
    }
  }

  return {
    data,
    isStreaming,
    error,
    start,
    stop,
  }
}
