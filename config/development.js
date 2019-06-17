'use strict';

var webpack = require('webpack');
var config = require('./base.js');
var git = require('git-rev-sync');
var path = require(`path`);

config.mode = `development`;

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000
};

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        configFile: './.eslintrc',
        fix: true
      }
    }
  })
);

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `'development'`,
    'process.env.GIT_TAG': `'development'`
  })
);

module.exports = config;
