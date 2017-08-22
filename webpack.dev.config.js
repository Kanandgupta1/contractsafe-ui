import webpack from 'webpack';
import path from 'path';
import config from './webpack.config';

// Each module is executed with eval and //@ sourceURL. Fast build speed, not production supported.
config.devtool = 'eval';

// Enable watch mode to enable caching
// config.watch = true;

config.output = {
  filename: '[name].bundle.js',
  chunkFilename: '[name].chunk.js',
  path: path.resolve(__dirname, 'src'),
  publicPath: '/'
};

config.plugins = config.plugins.concat([
  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
