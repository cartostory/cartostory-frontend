module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    //'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest'
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(vue-spinner|deepdash-es|lodash-es)/)'],

  preset: '@vue/cli-plugin-unit-jest',
}
