const prettierConfig = {
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  singleQuote: true
};

module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: require.resolve('@storybook/source-loader'),
    options: {
      parser: 'javascript',
      prettierConfig
    },
    enforce: 'pre'
  });

  return config;
};
