/**
 *  You can add a proxy to your backend by uncommenting the line bellow.
 *  You just have to configure a context which will we redirected and the target url.
 *  Example: $http.get('/users') requests will be automatically proxified.
 *
 *  For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
 */

import proxyMiddleware from 'http-proxy-middleware';
import _ from 'lodash';

module.exports = function middleware(context) {
  const port = process.env.api_port;
  const host = process.env.api_host;
  const proxy = {
    secure: false,
    changeOrigin: true,
    port,
    host,
    logLevel: 'debug'
  };

  proxy.target = [host, port].join(':');

  return {[context]: proxy};
};
