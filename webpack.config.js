import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import conf from './gulp/conf';
import { argv } from 'yargs';

const root = 'src';
const dist = 'dist';
const rootDir = path.resolve(__dirname, root);
const nodeModulesDir = path.resolve(__dirname, './node_modules');

const appDir = path.resolve(rootDir, 'app');

let modules = [appDir, nodeModulesDir, rootDir];
if (argv.device) {
  const deviceViewsDir = path.resolve(appDir, 'devices', argv.device);
  modules = [deviceViewsDir].concat(modules);
}

module.exports = {
  entry: conf.paths.entry,
  // Force linked packages to look in this node_modules dir
  resolve: { modules },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
            loader: 'babel-loader',
            options: {
              plugins: [
                'angular2-annotations',
                'transform-decorators-legacy', 
                'transform-class-properties',
                'transform-runtime'
              ],
              presets: [
                [ 'es2015', { modules: false } ] , 
                'stage-0'
              ]
            }
          },
          'angular-router-loader'
        ]
      },
      {
        test: /\.js$/,
        include: [/node_modules\/angular-i18n/],
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /(@fino\/lib)+.*.js$/,
        include: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /^.((?!tpl).)*.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [
          // Use raw loader to pass the style to angular 2 component annotations
          { loader: 'raw-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('postcss-flexbugs-fixes')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [nodeModulesDir]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // Use raw loader to pass the style to angular 2 component annotations
          { loader: 'raw-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('postcss-flexbugs-fixes')
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader?sourceMap!postcss-loader'
      // },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.png(\?embed)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
      },
      {
        test: /\.json$/, loader: 'json-loader'
      }
    ]
  },
  plugins: [
    // Provide context to Angular's use of System.import
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      rootDir
    ),

    /*new webpack.ProvidePlugin({
      Object: ['core-js/es6/object', 'default'],
      Promise: ['core-js/es6/promise', 'default']
    }),*/
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      // Instead of exclude custom chunks, we include only certain chunks
      chunks: ['vendor', 'common', 'startup'],
      template: `${root}/index.html`,
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.resource && module.resource.indexOf(rootDir) === -1;
      }
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: 3
    // }),

    new webpack.DefinePlugin({
      ENV_CONFIG: JSON.stringify({ // eslint-disable-line angular/json-functions
        build: conf.build,
        apiHost: process.env.api_host,
        apiPort: process.env.api_port,
        env: process.env.NODE_ENV,
        stages: conf.stages,
        tenants: conf.tenants
      })
    }),

    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
