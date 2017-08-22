import _ from 'lodash';
import webpack from 'webpack';
import path from 'path';
import config from './webpack.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { argv } from 'yargs';
import conf from './gulp/conf';

// A SourceMap is emitted with original source, production supported, slow build speed.
config.devtool = 'sourcemap';

config.output = {
  filename: 'index.js'
};

config.plugins = config.plugins.concat([

  // Only emit files when there are no errors.
  // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  new webpack.NoEmitOnErrorsPlugin(),

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    mangle: {
      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular', 'invoke']
    }
  }),

  // Copy source files
  // Reference: https://github.com/kevlened/copy-webpack-plugin
  // TODO: Optimize assets
  new CopyWebpackPlugin([{
    from: src,
    to: path.join(config.output.path, 'src')
  }])
]);

module.exports = config;
