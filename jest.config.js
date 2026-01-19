module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'bannery-module.js',
    '!node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 50,
      lines: 55,
      statements: 55
    }
  }
};
