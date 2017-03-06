// vendor imports
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// shared configurations
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API_HOST = 'http://www.liquidelvis.com';
const API_PATH = '/tito-java-api/api';
const APP_HOST = 'http://www.liquidelvis.com';
const APP_ROOT = 'tito2';

module.exports = [webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    output: {
      path: helpers.root('../dist'),
      publicPath: APP_HOST + '/' + APP_ROOT,
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
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'API_HOST': JSON.stringify(API_HOST),
          'API_PATH': JSON.stringify(API_PATH),
          'APP_ROOT': JSON.stringify(APP_ROOT)
        }
      })
    ]
  })
];
