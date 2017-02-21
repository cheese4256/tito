// vendor imports
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// shared configurations
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var settings = require('../api/production.json');

module.exports = [webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    output: {
      path: helpers.root('../dist'),
      publicPath: settings.APP_HOST + '/' + settings.APP_ROOT,
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      sourceMapFilename: '[name].map'
    },

    devServer: {
      historyApiFallback: true,
      stats: 'minimal'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(settings)
      })
    ]
  })
];
