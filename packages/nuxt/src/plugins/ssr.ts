import { defineNuxtPlugin } from '#app'
import type { NuxtApp } from '#app'

/**
 * SSR 兼容插件
 *
 * @description
 * 处理客户端特定的初始化逻辑
 * 确保组件在 SSR 环境下正常工作
 */
export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // 客户端初始化逻辑
  if (process.client) {
    // 处理 localStorage 访问
    const getLocalStorage = (key: string): string | null => {
      try {
        return localStorage.getItem(key)
      } catch (e) {
        console.warn('localStorage access failed:', e)
        return null
      }
    }

    const setLocalStorage = (key: string, value: string): void => {
      try {
        localStorage.setItem(key, value)
      } catch (e) {
        console.warn('localStorage access failed:', e)
      }
    }

    // 提供全局的存储访问方法
    nuxtApp.provide('vueAssistantKitStorage', {
      get: getLocalStorage,
      set: setLocalStorage
    })

    // 处理 hydration 不匹配问题
    nuxtApp.hook('app:mounted', () => {
      // 在应用挂载后执行客户端特定的初始化
      // 例如：恢复滚动位置、初始化客户端状态等
    })
  }
})
