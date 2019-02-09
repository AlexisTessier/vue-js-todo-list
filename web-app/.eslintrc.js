module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  plugins: [
    'prettier', 'jest'
  ],
  // add your custom rules here
  rules: {
    "no-console": 0
  }
}
