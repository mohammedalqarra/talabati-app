module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-native/all'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },

  rules: {

  }
}
