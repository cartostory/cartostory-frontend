module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/src/**/*.spec.[jt]s?(x)',
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(deepdash-es|lodash-es)/)'],

  preset: '@vue/cli-plugin-unit-jest',
};
