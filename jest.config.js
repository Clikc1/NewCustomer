module.exports = {
  testMatch: ['**/cypress/e2e/integration/**/*.cy.js'],
  preset: 'ts-jest/presets/default',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  reporters: ['default', 'jest-junit'],
  testResultsProcessor: 'jest-junit',
};
