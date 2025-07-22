export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // handles CSS imports
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // so JSX gets transformed
  },
};