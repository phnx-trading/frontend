'use strict';

var webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var config = require('./base.js');
var git = require('git-rev-sync');

config.cache = false;

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    comments: false,
    sourceMap: true
  })
);

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `'production'`,
    'process.env.GIT_TAG': `'${ git.tag() }'`
  })
);

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.min.js'
  })
);

config.plugins.push(
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.bundle\.css$/,
    cssProcessorOptions: { discardComments: { removeAll: true } }
  })
);

module.exports = config;
