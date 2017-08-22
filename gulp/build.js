import gulp from 'gulp';
import gutil from 'gulp-util';
import replace from 'gulp-replace-path';
import webpack from 'webpack';
import colorsSupported from 'supports-color';
import conf from './conf';
import { argv } from 'yargs';

// use webpack.config.js to build modules
gulp.task('build', ['clean', 'env', 'styles'], (cb) => {
  const config = require('../webpack.dist.config');

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('build:paths', () => {
  gulp.src([])
});
