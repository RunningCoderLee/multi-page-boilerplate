'use strict';

const paths = require('../paths');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
  return {

    entry: paths.appClientEntries,

    output: {
      path          : paths.appClientBuild,
      filename      : 'javascripts/[name].min.js',
      chunkFilename : 'javascripts/[id].chunk.js?[chunkhash]',
      publicPath    : '/static/build/',
    },

    module: {

      rules: [
        {
          enforce : "pre",
          test    : /\.js$/,
          exclude : /node_modules/,
          include: [
            paths.appClientSrcScripts,
          ],
          use: [{
            loader  : "eslint-loader",
            options: {
              failOnError: true,
              outputReport: true,
              // quiet: true,
              // emitError: true,
              cache: true
            }
          }]
        },

        {
          test   : /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: paths.appClientSrcScripts,
          use: [{
            loader : 'babel-loader',
            options: {
              presets: [
                'env',
                'stage-0',
              ],
              babelrc: false
            }
          }]
        },

        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: "url-loader",
            options: {
              limit: 10000,
            }
          }]
        },

        {
          test: /\.(woff|ttf|eot|svg)(\?[\s\S]+)?$/,
          use: 'file-loader'
        },

        {
          test: /\.css$/,
          use : ['style-loader', 'css-loader']
        },

        {
          test: /font-awesome\.config\.js/,
          use: [
            { loader: 'style-loader' },
            { loader: 'font-awesome-loader' },
          ],
        },

        {
          test   : /\.(jpe?g|png|gif)$/,
          use    : [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name : 'media/[name].[hash:8].[ext]'
            }
          }]
        },
      ]
    },

    resolve: {
      extensions: [".js", ".json", ".jsx", ".css", ".scss"],

      alias: {
        jQuery: "jquery/src/jquery"
      }
    },

    plugins: [

      new CommonsChunkPlugin({
        name     : 'vendor',
        minChunks: 2,
      }),

      new ProvidePlugin({
        $              : 'jquery',
        jQuery         : 'jquery',
        'window.jQuery': 'jquery',
        'window.$'     : 'jquery',
      }),
      new CaseSensitivePathsPlugin(),
    ],

    stats: {
      assets         : true, // Add asset Information
      // assetsSort     : 'field', // Sort assets by a field
      cached         : true, // Add information about cached (not built) modules
      cachedAssets   : true, // Show cached assets (setting this to `false` only shows emitted files)
      children       : true, // Add children information
      chunks         : true, // Add chunk information (setting this to `false` allows for a less verbose output)
      chunkModules   : true, // Add built modules information to chunk information
      chunkOrigins   : true, // Add the origins of chunks and chunk merging info
      // chunksSort     : 'field', // Sort the chunks by a field
      // context        : '../src/', // Context directory for request shortening
      colors         : true, // `webpack --colors` equivalent
      depth          : false, // Display the distance from the entry point for each module
      entrypoints    : true, // Display the entry points with the corresponding bundles
      errors         : true, // Add errors
      errorDetails   : true, // Add details to errors (like resolving log)
      exclude        : [], // Exclude modules which match one of the given strings or regular expressions
      hash           : true, // Add the hash of the compilation
      maxModules     : 15, // Set the maximum number of modules to be shown
      modules        : true, // Add built modules information
      // modulesSort    : 'field', // Sort the modules by a field
      performance    : true, // Show performance hint when file size exceeds `performance.maxAssetSize`
      providedExports: false, // Show the exports of the modules
      publicPath     : true, // Add public path information
      reasons        : true, // Add information about the reasons why modules are included
      source         : true, // Add the source code of modules
      timings        : true, // Add timing information
      usedExports    : false, // Show which exports of a module are used
      version        : true, // Add webpack version information
      warnings       : true, // Add warnings
      // Filter warnings to be shown (since webpack 2.4.0),
      // can be a String, Regexp, a function getting the warning and returning a boolean
      // or an Array of a combination of the above. First match wins.
      // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
    }
  };
};
