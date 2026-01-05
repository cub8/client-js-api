import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    maxWorkers: 1,
    environment: 'node',
    setupFiles: ['test/helpers/setup.ts'],
    restoreMocks: true,
    clearMocks: true
  },
})
