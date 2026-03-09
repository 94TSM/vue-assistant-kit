import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueAssistantKitCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['vue', 'vue-demi', '@ai-sdk/vue', 'ai'],
      output: {
        globals: {
          vue: 'Vue',
          '@ai-sdk/vue': 'AISDKVue',
          ai: 'AI',
        },
        // Preserve module structure for tree-shaking
        preserveModules: false,
        // Export named exports
        exports: 'named',
      },
    },
    // Generate sourcemap
    sourcemap: true,
    // Minify output
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
