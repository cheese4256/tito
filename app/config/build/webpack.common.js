// vendor imports
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      { 
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'file?name=public/videos/[name].[ext]'
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract(['css'])
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(['css','sass'])
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
