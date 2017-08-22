/* global require,process */
'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import { argv } from 'yargs';

const ENV = {
  PRODUCTION  : 'production',
  TESTING     : 'testing',
  DEVELOPMENT : 'dev',
  LOCAL       : 'local'
};

function setEnvironment(env) {

  process.env.api_port = process.env.api_port || '';
  process.env.api_host = process.env.api_host || '';

  let tenant = '';
  let tenantSeparator = '';

  // Support custom environment by adding custom tenant name to the api host
  if (argv.tenant) {
    tenant = argv.tenant;
  }
  // Fallback to custom if tenant is not defined
  if (!tenant) {
    tenant = argv.custom || '';
  }

  switch (env) {
    case ENV.PRODUCTION: {
      process.env.NODE_ENV = ENV.PRODUCTION;
      process.env.api_port = process.env.api_port || 443;
      process.env.api_host = process.env.api_host || `https://vertragstresor.fino.digital`;
      break;
    }

    case ENV.TESTING: {
      tenantSeparator = tenant && '-';
      process.env.NODE_ENV = ENV.TESTING;
      process.env.api_port = process.env.api_port || 443;
      process.env.api_host = process.env.api_host || `https://vertragstresor-testing.fino.digital`;
      break;
    }

    case ENV.DEVELOPMENT: {
      tenantSeparator = tenant && '-';
      process.env.NODE_ENV = ENV.DEVELOPMENT;
      process.env.api_port = process.env.api_port || 443;
      process.env.api_host = process.env.api_host || `https://vertragstresor-dev.fino.digital`;
      break;
    }

    case ENV.LOCAL: {
      tenantSeparator = tenant && '.';
      process.env.NODE_ENV = ENV.DEVELOPMENT;
      process.env.api_port = process.env.api_port || 8000;
      process.env.api_host = process.env.api_host || `http://localhost`;
      break;
    }
  }

  gutil.log('Set environment to', gutil.colors.cyan(process.env.NODE_ENV));
  gutil.log('Set API PORT to', gutil.colors.cyan(process.env.api_port));
  gutil.log('Set API HOST to', gutil.colors.cyan(process.env.api_host));
}

gulp.task('env', () => {
  // Default environment is 'dev'
  let environment = ENV.DEVELOPMENT;
  if (gutil.env.production) {
    environment = ENV.PRODUCTION;
  }
  else if (gutil.env.testing) {
    environment = ENV.TESTING;
  }
  else if (gutil.env.local) {
    environment = ENV.LOCAL;
  }
  setEnvironment(environment);
});

gulp.task('env:prod', () => {
  setEnvironment(ENV.PRODUCTION);
});

gulp.task('env:testing', () => {
  setEnvironment(ENV.TESTING);
});

gulp.task('env:dev', () => {
  setEnvironment(ENV.DEVELOPMENT);
});

gulp.task('env:local', () => {
  setEnvironment(ENV.LOCAL);
});
