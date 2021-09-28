module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: ['prettier', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'testing-library', 'jest', 'cypress'],
  rules: {
    'no-confusing-arrow': [
      'off',
      {
        allowParens: true,
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': [
      1,
      {
        html: 'enforce',
        custom: 'enforce',
      },
    ],
  },
};
