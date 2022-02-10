// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  // extends: [
  //   'plugin:react/all',
  //   'plugin:@typescript-eslint/recommended',
  //   'airbnb-typescript',
  //   'airbnb-typescript-prettier',
  // ],
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-max-props-per-line': [1, { maximum: 1 }],
  },
});
