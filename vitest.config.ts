import { configDefaults, defineConfig } from 'vitest/dist/config';

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*.test.ts{,x}', '**/src/**/*.spec.{j,t}s{,x}'],
    coverage: {
      // Coverage reporters
      all: true,
      exclude: [
        ...configDefaults.exclude,
        'vite*.ts',
        '*.config.{t,j,cj}s',
        '**/*.spec.ts',
        '**/*.test.ts{,x}',
        'src/**/*.d.ts',
        'src/**/__mocks__/*.ts',
        'src/main.tsx',
        '.eslintrc.cjs'
      ],
      reporter: ['text', 'html', 'lcov'],

      // Coverage thresholds
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    },
    environment: 'happy-dom',
    globals: true,
    outputFile: {
      junit: 'coverage/junit.xml',
      'vitest-sonar-reporter': 'test-report.xml'
    },
    reporters: ['default', 'junit', 'vitest-sonar-reporter']
    // setupFiles: ['whatwg-fetch', './vitest-setup.ts']
  }
});
