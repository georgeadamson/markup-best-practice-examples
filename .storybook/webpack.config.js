// https://www.npmjs.com/package/node-sass-json-importer
const jsonImporter = require('node-sass-json-importer');
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
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'sass-loader',
        // Apply the JSON importer via sass-loader's options.
        // https://github.com/webpack-contrib/sass-loader
        // Workaround: https://github.com/JeffreyWay/laravel-mix/issues/2206
        options: {
          sassOptions: {
            importer: jsonImporter()
          }
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  });

  return config;
};
