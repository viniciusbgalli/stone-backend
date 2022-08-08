module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/infra/**/*.ts',
    '!<rootDir>/src/**/*protocols.ts',
    '!<rootDir>/src/**/*error.ts',
    '!<rootDir>/src/**/*helper.ts',
    '!<rootDir>/src/**/protocols/**/*.ts',
    '!<rootDir>/src/@types/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text-summary',
    'lcov'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node'
}
