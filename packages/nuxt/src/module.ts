import { defineNuxtModule, addComponentsDir, addImportsDir, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import type { ModuleOptions } from './types'

/**
 * vue-assistant-kit Nuxt 3 模块
 *
 * @description
 * 提供 Nuxt 3 原生支持,包括:
 * - 组件自动导入
 * - Composables 自动导入
 * - 主题样式自动注入
 * - SSR 兼容处理
 *
 * @example
 * ```ts
 * // nuxt.config.ts
 * export default defineNuxtConfig({
 *   modules: ['@vue-assistant-kit/nuxt'],
 *   vueAssistantKit: {
 *     theme: true,
 *     components: true,
 *     composables: true
 *   }
 * })
 * ```
 */
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vue-assistant-kit/nuxt',
    configKey: 'vueAssistantKit',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false
    }
  },

  defaults: {
    components: true,
    composables: true,
    theme: true,
    themePath: '@vue-assistant-kit/theme/style.css'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // 1. 自动导入组件
    if (options.components) {
      addComponentsDir({
        path: resolver.resolve('@vue-assistant-kit/core/dist/components'),
        pathPrefix: false,
        prefix: 'AI',
        extensions: ['vue'],
        pattern: '**/*.vue',
        ignore: ['**/index.ts', '**/*.d.ts']
      })
    }

    // 2. 自动导入 composables
    if (options.composables) {
      // 导入 core 包的 hooks
      addImportsDir(resolver.resolve('@vue-assistant-kit/core/dist/hooks'))

      // 导入 theme 包的 hooks
      addImportsDir(resolver.resolve('@vue-assistant-kit/theme/dist/hooks'))
    }

    // 3. 注入主题样式
    if (options.theme) {
      nuxt.options.css = nuxt.options.css || []
      if (!nuxt.options.css.includes(options.themePath!)) {
        nuxt.options.css.push(options.themePath!)
      }
    }

    // 4. 添加 SSR 兼容插件
    addPlugin({
      src: resolver.resolve('./plugins/ssr'),
      mode: 'client'
    })

    // 5. 配置 Vite 优化
    nuxt.options.vite = nuxt.options.vite || {}
    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    const deps = [
      '@vue-assistant-kit/core',
      '@vue-assistant-kit/theme'
    ]
    deps.forEach(dep => {
      if (!nuxt.options.vite.optimizeDeps?.include?.includes(dep)) {
        nuxt.options.vite.optimizeDeps!.include!.push(dep)
      }
    })

    // 6. 配置构建选项
    nuxt.options.build = nuxt.options.build || {}
    nuxt.options.build.transpile = nuxt.options.build.transpile || []
    const transpileDeps = [
      '@vue-assistant-kit/core',
      '@vue-assistant-kit/theme'
    ]
    transpileDeps.forEach(dep => {
      if (!nuxt.options.build.transpile!.includes(dep)) {
        nuxt.options.build.transpile!.push(dep)
      }
    })
  }
}) as NuxtModule<ModuleOptions>
