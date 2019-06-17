'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var git = require('git-rev-sync');
var { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  cache: true,
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.jsx',
      './scss/global.scss'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router'
    ]
  },
  output: {
    path: path.resolve(__dirname.split('/config')[0], 'dist'),
    filename: 'app.bundle.min.js',
    chunkFilename: '[id].[hash].bundle.min.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.ExtendedAPIPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.bundle.css',
      allChunks: true,
    }),
    CopyWebpackPlugin([
      {
        from: `src/index.html`,
        to: `index.html`,
        transform: (content) => {
          return content
                  .toString()
                  .replace(/\$COMMIT/g, git.short())
                  .replace(/\n/g, ``)
                  .replace(/\s+/g, ` `)
                  .replace(/\>\s\</g, `><`);
        }
      }
    ]),
    new GenerateSW()
  ]
};
