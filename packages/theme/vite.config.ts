import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// 复制 CSS 文件到 dist 目录
function copyCSSFiles() {
  const cssFiles = [
    { src: 'src/styles/variables.css', dist: 'dist/variables.css' },
    { src: 'src/styles/light.css', dist: 'dist/light.css' },
    { src: 'src/styles/dark.css', dist: 'dist/dark.css' },
    { src: 'src/styles/headless.css', dist: 'dist/headless.css' },
  ]

  // 先复制独立的 CSS 文件
  cssFiles.forEach(({ src, dist }) => {
    const srcPath = resolve(__dirname, src)
    const distPath = resolve(__dirname, dist)

    if (existsSync(srcPath)) {
      const distDir = resolve(__dirname, 'dist')
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true })
      }
      copyFileSync(srcPath, distPath)
      console.log(`Copied ${src} to ${dist}`)
    }
  })

  // 处理 style.css - 合并所有内容,不使用相对路径导入
  const indexCssPath = resolve(__dirname, 'src/styles/index.css')
  const styleCssDistPath = resolve(__dirname, 'dist/style.css')

  if (existsSync(indexCssPath)) {
    const distDir = resolve(__dirname, 'dist')
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true })
    }

    // 读取并处理 index.css
    let content = readFileSync(indexCssPath, 'utf-8')

    // 移除 @import 语句,因为我们会在下面手动合并
    content = content.replace(/@import\s+['"]\.\/[^'"]+['"];\s*/g, '')

    // 读取所有需要合并的CSS文件
    const variablesCss = readFileSync(resolve(__dirname, 'src/styles/variables.css'), 'utf-8')
    const lightCss = readFileSync(resolve(__dirname, 'src/styles/light.css'), 'utf-8')
    const darkCss = readFileSync(resolve(__dirname, 'src/styles/dark.css'), 'utf-8')
    const baseCss = readFileSync(resolve(__dirname, 'src/styles/base.css'), 'utf-8')

    // 读取所有组件样式文件
    const componentFiles = [
      'container.css',
      'list.css',
      'message.css',
      'input.css',
      'code.css',
      'loading.css'
    ]

    const componentsCss = componentFiles.map(file => {
      const filePath = resolve(__dirname, `src/styles/components/${file}`)
      if (existsSync(filePath)) {
        return readFileSync(filePath, 'utf-8')
      }
      return ''
    }).join('\n\n')

    const finalContent = `/* vue-assistant-kit 主题样式入口 - 完整版 */

/* ==================== CSS变量 ==================== */
${variablesCss}

/* ==================== 亮色主题 ==================== */
${lightCss}

/* ==================== 暗黑主题 ==================== */
${darkCss}

/* ==================== 基础样式 ==================== */
${baseCss}

/* ==================== 组件样式 ==================== */
${componentsCss}
`

    writeFileSync(styleCssDistPath, finalContent, 'utf-8')
    console.log(`Created merged style.css`)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    }),
    {
      name: 'copy-css-files',
      closeBundle: () => {
        copyCSSFiles()
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueAssistantKitTheme',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        globals: {
          vue: 'Vue',
        },
        preserveModules: false,
        exports: 'named',
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
