var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'api': './src/main.ts'
  },

  externals: [
    /^(?!\.|\/).+/i,
  ],
  node: { // https://github.com/request/request/issues/1529
    net: "empty",
    tls: "empty",
    fs: "empty",
    console: "empty"
  },
  target: 'node',

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      { // https://github.com/request/request/issues/1529
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['api']
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
