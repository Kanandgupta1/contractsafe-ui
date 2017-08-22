import webpack from 'webpack';
import path from 'path';
import config from './webpack.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import conf from './gulp/conf';

// A SourceMap is emitted with original source, production supported, slow build speed.
config.devtool = 'source-map';

config.output = {
  filename: '[name].bundle.js',
  chunkFilename: '[id].chunk.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: ''
};

config.plugins = config.plugins.concat([

  // Only emit files when there are no errors.
  // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  new webpack.NoEmitOnErrorsPlugin(),

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: false,
    mangle: {
      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      // Also do not mangle custom validators to map them to their key
      except: ['$super', '$', 'exports', 'require', 'angular', 'invoke','validateEmail', 'validatePhone']
    }
  }),

  // Copy assets from the public folder
  // Reference: https://github.com/kevlened/copy-webpack-plugin
  // TODO: Optimize assets
  new CopyWebpackPlugin([{
    from: path.join(__dirname, 'node_modules', 'webcamjs/webcam.swf'),
    to: './webcam.swf'
  },{
    from: path.join(__dirname, 'src', 'i18n'),
    to: './i18n'
  }])
]);

module.exports = config;
