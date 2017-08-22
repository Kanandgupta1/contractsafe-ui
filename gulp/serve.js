import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack';
import portfinder from 'portfinder';
import WebpackDevServer from'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpackHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import ip from 'ip';
import { argv } from 'yargs';
import open from 'open';
import conf from './conf';
import parameter from './parameter';
 portfinder.basePort = conf.port;

const setEntry = (entry, ip, port) => {
  // App entry
  entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    `webpack-dev-server/client?http://${ip}:${port}`,
    'webpack/hot/dev-server'
    // application entry point
  ].concat(conf.paths.entry.app);
};

const link = (ip, port, openInBrowser = false) => {
  const stage = argv.stage || process.env.NODE_ENV || 'dev';
  const p = parameter(stage);
  const url = `http://${ip}:${port}${p}`;
  console.log('run with url:', url);
  console.log('on stage:', stage);
  if (openInBrowser) {
    open(url);
  }
}

gulp.task('run', () => {
  const internalIp = ip.address();
  const port = argv.port || conf.port;
  link(internalIp, port, true);
})

gulp.task('serve', ['env', 'styles'], () => {
  const config = require('../webpack.dev.config');

  // Find free port
  portfinder.getPort((err, port) => {
    if (err) {
      return err;
    }

    const internalIp = ip.address();

    setEntry(config.entry, internalIp, port);

    const compiler = webpack(config);

    const proxy = require('./proxy')('/api');

    // TODO Crawl ports
    new WebpackDevServer(compiler, {
      disableHostCheck: true,
      public: internalIp,
      proxy,
      stats: {
        colors: true,
        chunks: false,
        modules: false
      },
      hot: true,
      publicPath: config.output.publicPath,
      contentBase: [
        // root for translation
        path.join(process.cwd(), '/src/'),
        // font awesome module for fonts
        path.join(process.cwd(), '/node_modules/font-awesome/')
      ],
      historyApiFallback: true
    }).listen(port, '0.0.0.0', function(err) {
        console.log('listening on port:', port);
        console.log('your ip:', internalIp);

        link(internalIp, port, !!argv.run);
    });
  });
});

gulp.task('serve:mock', ['mock', 'serve']);

gulp.task('watch', ['serve']);
