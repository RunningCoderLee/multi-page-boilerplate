'use strict';

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const paths = require('../paths');
const config = require('config');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base')();

module.exports = function (env) {
  return webpackMerge(baseConfig, {

    // Choose a style of source mapping to enhance the debugging process.
    // see the other values in https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  minimize: true
                }
              },

              {
                loader: 'resolve-url-loader'
              },

              {
                loader: 'postcss-loader'
              },

              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                }
              }
            ]
          })
        },
      ]
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),
      new ExtractTextPlugin({
        filename:  (getPath) => {
          // for more information plz visit https://github.com/webpack-contrib/extract-text-webpack-plugin
          return getPath('stylesheets/[name].min.css');
        },
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new CaseSensitivePathsPlugin(),
    ]
  });
};
