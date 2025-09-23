import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/vitest.setup.ts',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/types.ts',
        'vite-env.d.ts',
        'eslint.config.js',
        'vite.config.ts',
        'vitest.config.ts'
      ],
    },
  },
});
