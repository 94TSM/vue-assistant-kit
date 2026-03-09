import { ref, watch, onMounted, onUnmounted } from 'vue'
import {
  getTheme,
  setTheme as setThemeUtil,
  toggleTheme as toggleThemeUtil,
  onThemeChange,
  saveTheme,
  type Theme,
} from '../utils/theme'

/**
 * 主题管理 Composable
 */
export function useTheme() {
  const theme = ref<Theme>('light')

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    setThemeUtil(newTheme)
    saveTheme(newTheme)
  }

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // 监听主题变化
  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    // 初始化主题
    theme.value = getTheme()

    // 监听主题变化
    unsubscribe = onThemeChange((newTheme) => {
      theme.value = newTheme
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
