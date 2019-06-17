'use strict';

var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');
var CopyPlugin = require('copy-webpack-plugin');
var git = require('git-rev-sync');
var { GenerateSW } = require('workbox-webpack-plugin');

let index = `src/index.html`;

module.exports = {
  cache: true,
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.tsx',
      './scss/global.scss'
    ],
    vendor: [
      'react',
      'react-dom'
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname.split('/config')[0], 'dist'),
    filename: 'app.bundle.min.js',
    chunkFilename: '[id].[hash].bundle.min.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader', 'eslint-loader'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          `css-loader`,
          `sass-loader`
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.ExtendedAPIPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.bundle.css',
      allChunks: true,
    }),
    new CopyPlugin([
      {
        from: index,
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
