const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const cssWithModules = [path.resolve('./src/components')];
const cssRules = (() => {
  let baseCssRule = {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader'
      }
    ]
  };
  let cssLoaderOptionWithModule = {
    sourceMap: true,
    module: true
  };
  let useWithModule = baseCssRule.use.map(item => {
    if (item.loader == 'css-loader') {
      return {
        loader: 'css-loader',
        options: cssLoaderOptionWithModule
      };
    }
    return item;
  });
  return [
    Object.assign({}, baseCssRule, {
      include: cssWithModules,
      use: useWithModule
    }),
    Object.assign({}, baseCssRule, {
      exclude: cssWithModules
    })
  ];
})();

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      ...cssRules
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
