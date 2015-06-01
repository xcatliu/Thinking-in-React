var webpack = require('webpack');
var log = require('npmlog');
var ecstatic = require('ecstatic');
var http = require('http');
var webpackConfig = require('../webpack.config');

var compiler = webpack(webpackConfig);

compiler.run(function(err, stats) {
  if (err) return handleError(err);
  log.info('Bundled.');
  startServer();
});

compiler.watch({
  aggregateTimeout: 300
}, function(err, stats) {
  if (err) return handleError(err);
  log.info('Bundled.');
})

function startServer() {
  http.createServer(
    ecstatic({ root: webpackConfig.output.path })
  ).listen(8000);
  log.info('Server listening on http://localhost:8000');
}

function handleError(err) {
  log.error(err.message);
  log.error(err.stack);
}
