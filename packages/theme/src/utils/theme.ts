/**
 * 主题切换工具函数
 */

export type Theme = 'light' | 'dark' | 'system'

/**
 * 获取当前主题
 */
export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light'

  const theme = document.documentElement.getAttribute('data-theme') as Theme
  if (theme === 'dark' || theme === 'light') return theme

  // 检测系统主题
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

/**
 * 设置主题
 */
export function setTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  if (theme === 'system') {
    // 移除手动设置的主题，使用系统主题
    document.documentElement.removeAttribute('data-theme')

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
    }

    // 设置初始值
    document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light')

    // 添加监听器
    mediaQuery.addEventListener('change', handler)
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

/**
 * 切换主题
 */
export function toggleTheme(): void {
  const currentTheme = getTheme()
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
}

/**
 * 监听主题变化
 */
export function onThemeChange(callback: (theme: Theme) => void): () => void {
  if (typeof document === 'undefined') return () => {}

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        const theme = document.documentElement.getAttribute('data-theme') as Theme
        callback(theme || 'light')
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  // 返回取消监听函数
  return () => observer.disconnect()
}

/**
 * 初始化主题
 * 自动检测并应用保存的主题偏好
 */
export function initTheme(defaultTheme: Theme = 'light'): void {
  if (typeof document === 'undefined') return

  // 检查本地存储的主题偏好
  const savedTheme = localStorage.getItem('ai-chat-theme') as Theme | null

  if (savedTheme) {
    setTheme(savedTheme)
  } else {
    setTheme(defaultTheme)
  }
}

/**
 * 保存主题偏好到本地存储
 */
export function saveTheme(theme: Theme): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('ai-chat-theme', theme)
}
