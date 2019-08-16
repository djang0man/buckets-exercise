const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output:  {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },
  entry: `${__dirname}/src/index.js`, 
  devtool: 'cheap-eval-source-map',
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/src/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, 
              includePaths: [`${__dirname}/src/styles`],
            },
          }
        ]
      },
    ], 
  }
}

