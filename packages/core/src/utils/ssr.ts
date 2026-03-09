/**
 * SSR 兼容工具函数
 *
 * @description
 * 提供服务端渲染(SSR)环境下的兼容性处理
 */

/**
 * 检查是否在浏览器环境
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * 检查是否在服务端环境
 */
export function isServer(): boolean {
  return typeof window === 'undefined'
}

/**
 * 安全访问 localStorage
 *
 * @description
 * 在 SSR 环境下返回 null,避免访问 window.localStorage 报错
 */
export function getLocalStorage(): Storage | null {
  if (isBrowser()) {
    return window.localStorage
  }
  return null
}

/**
 * 安全访问 sessionStorage
 */
export function getSessionStorage(): Storage | null {
  if (isBrowser()) {
    return window.sessionStorage
  }
  return null
}

/**
 * 安全访问 document
 */
export function getDocument(): Document | null {
  if (isBrowser()) {
    return window.document
  }
  return null
}

/**
 * 安全访问 window
 */
export function getWindow(): Window | null {
  if (isBrowser()) {
    return window
  }
  return null
}

/**
 * 安全访问 navigator
 */
export function getNavigator(): Navigator | null {
  if (isBrowser()) {
    return window.navigator
  }
  return null
}

/**
 * 安全访问 matchMedia
 */
export function getMatchMedia(): ((query: string) => MediaQueryList) | null {
  if (isBrowser() && window.matchMedia) {
    return window.matchMedia.bind(window)
  }
  return null
}

/**
 * 安全执行客户端代码
 *
 * @description
 * 确保代码只在客户端执行
 *
 * @example
 * ```ts
 * onClient(() => {
 *   // 这里的代码只在客户端执行
 *   console.log(window.location.href)
 * })
 * ```
 */
export function onClient(callback: () => void): void {
  if (isBrowser()) {
    callback()
  }
}

/**
 * 安全执行服务端代码
 *
 * @description
 * 确保代码只在服务端执行
 */
export function onServer(callback: () => void): void {
  if (isServer()) {
    callback()
  }
}

/**
 * 安全获取客户端值
 *
 * @description
 * 在客户端返回回调值,在服务端返回默认值
 *
 * @example
 * ```ts
 * const href = getClientValue(() => window.location.href, '')
 * ```
 */
export function getClientValue<T>(callback: () => T, defaultValue: T): T {
  if (isBrowser()) {
    return callback()
  }
  return defaultValue
}

/**
 * SSR 安全的 requestAnimationFrame
 */
export function requestAnimationFrameSafe(callback: FrameRequestCallback): number {
  if (isBrowser() && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback)
  }
  // 服务端使用 setTimeout 模拟
  return setTimeout(callback, 16) as unknown as number
}

/**
 * SSR 安全的 cancelAnimationFrame
 */
export function cancelAnimationFrameSafe(handle: number): void {
  if (isBrowser() && window.cancelAnimationFrame) {
    window.cancelAnimationFrame(handle)
  } else {
    clearTimeout(handle)
  }
}

/**
 * SSR 安全的 setInterval
 */
export function setIntervalSafe(callback: () => void, delay: number): NodeJS.Timeout | number {
  if (isBrowser()) {
    return window.setInterval(callback, delay)
  }
  return setInterval(callback, delay)
}

/**
 * SSR 安全的 clearInterval
 */
export function clearIntervalSafe(handle: NodeJS.Timeout | number): void {
  if (isBrowser()) {
    window.clearInterval(handle as number)
  } else {
    clearInterval(handle as NodeJS.Timeout)
  }
}

/**
 * 检查是否支持 IntersectionObserver
 */
export function supportsIntersectionObserver(): boolean {
  return isBrowser() && 'IntersectionObserver' in window
}

/**
 * 检查是否支持 ResizeObserver
 */
export function supportsResizeObserver(): boolean {
  return isBrowser() && 'ResizeObserver' in window
}

/**
 * 检查是否支持 MutationObserver
 */
export function supportsMutationObserver(): boolean {
  return isBrowser() && 'MutationObserver' in window
}
