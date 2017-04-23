'use strict';

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const paths = require('../paths');
const config = require('config');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const baseConfig = require('./webpack.config.base')();


module.exports = function (env) {
  return webpackMerge(baseConfig, {

    // Choose a style of source mapping to enhance the debugging process.
    // see another values in https://webpack.js.org/configuration/devtool/
    devtool: 'cheap-eval-source-map',

    module: {
      rules: [
        {
          test: /\.scss$/,
          use : [
            {
              loader: "style-loader" // creates style nodes from JS strings
            },

            {
              loader : "css-loader", // translates CSS into CommonJS
            },

            {
              loader: 'resolve-url-loader', // resolves relative paths in url() statements based on the original source file
            },

            {
              loader: "postcss-loader" // creates style nodes from JS strings
            },

            {
              loader : "sass-loader",  // compiles Sass to CSS,
            }
          ]
        },
      ]
    },

    plugins: [

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
  });
};

