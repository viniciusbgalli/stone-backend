
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/infra/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text-summary',
    'lcov'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.spec.ts'
  ]
}
