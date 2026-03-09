import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'packages/*/dist/',
        'packages/*/node_modules/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.test.ts',
        '**/*.spec.ts',
        'packages/docs/**',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    include: ['packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'packages/*/node_modules', 'packages/*/dist'],
  },
  resolve: {
    alias: {
      '@vue-assistant-kit/core': resolve(__dirname, 'packages/core/src'),
      '@vue-assistant-kit/theme': resolve(__dirname, 'packages/theme/src'),
      '@vue-assistant-kit/pro': resolve(__dirname, 'packages/pro/src'),
      '@vue-assistant-kit/enterprise': resolve(__dirname, 'packages/enterprise/src'),
    },
  },
})
