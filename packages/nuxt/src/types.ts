/**
 * vue-assistant-kit Nuxt 模块配置
 */
export interface ModuleOptions {
  /**
   * 是否自动导入组件
   * @default true
   */
  components?: boolean

  /**
   * 是否自动导入 composables
   * @default true
   */
  composables?: boolean

  /**
   * 是否自动注入主题样式
   * @default true
   */
  theme?: boolean

  /**
   * 主题样式路径
   * @default '@vue-assistant-kit/theme/style.css'
   */
  themePath?: string
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vueAssistantKit?: ModuleOptions
  }

  interface NuxtOptions {
    vueAssistantKit?: ModuleOptions
  }
}
