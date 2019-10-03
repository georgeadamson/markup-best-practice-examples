const path = require('path');

const prettierConfig = {
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  singleQuote: true
};

module.exports = async function({ config, mode }) {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: require.resolve('@storybook/source-loader'),
    options: {
      parser: 'javascript',
      prettierConfig
    },
    enforce: 'pre'
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  });

  return config;
};
