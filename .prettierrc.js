module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'html' },
    },
    {
      files: '*.wxss',
      options: { parser: 'css' },
    },
    {
      files: '*.wxs',
      options: { parser: 'babel' },
    },
  ],
};
