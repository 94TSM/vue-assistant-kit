import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/module.ts'),
      name: 'VueAssistantKitNuxt',
      fileName: 'module',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        '@nuxt/kit',
        '@nuxt/schema',
        '@vue-assistant-kit/core',
        '@vue-assistant-kit/theme'
      ],
      output: {
        globals: {
          '@nuxt/kit': 'nuxtKit',
          '@nuxt/schema': 'nuxtSchema'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true
  }
})
