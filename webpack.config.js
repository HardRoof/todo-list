const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: '[name][ext]',
    clean: true,
  },
  devtool: 'inline-source-map',

  //loaders
  module: {
    rules: [
      {test: /\.css$/i, use: ['style-loader', 'css-loader']},
      {test: /\.(svg|ico|jpg|jpeg|png|gif|webp)$/i, type:'asset/resource'},
      {test: /\.(woff|woff2|eot|ttf|otf)$/i, type:'asset/resource'},
      // {test: /\.(mov|mp4)$/, use: [{ loader: 'file-loader', options: {name: '[name].[ext]'}}]},
    ],
  },

  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/temp.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/images', to: 'images/' }
      ]
    }),
  ],
}