const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const paths = require('./config/paths');
const debug = require('debug')('new-b2b:server');
const http = require('http');
const chalk = require('chalk');
const port = config.server.port;

/* Routers */
const index = require('./routes/index');
const users = require('./routes/users');
const test = require('./routes/test');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /static
//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//TODO 改成walker加载
app.use('/', index);
app.use('/users', users);
app.use('/test', test);


/**
 * Get port from config and store in Express.
 */

app.set('port', port);

const isDev = process.env.NODE_ENV !== 'production';



if (isDev) {

  startWithDevEnv(app);

} else {

  startWithProEnv(app);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function startWithDevEnv(app) {
  /** 前端webpack环境配置 */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const devConfig = require(`${paths.appConfig}/webpack/webpack.config.dev.js`)();
  const bs = require('browser-sync').create();

  // 添加HMR
  for (let i in devConfig.entry) {
    if (devConfig.entry.hasOwnProperty(i)) {
      devConfig.entry[i].unshift('webpack-hot-middleware/client?reload=true');
    }
  }

  console.dir(devConfig.entry);
  const compiler = webpack(devConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    noInfo: false,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

  app.listen(config.server.port, function () {
    bs.init({
      open  : false,
      ui    : false,
      notify: false,
      proxy : 'localhost:3300',
      files : ['./views/**'],
      port  : 8080
    });
    console.log(chalk.bold.gray.bgGreen('App (dev) is going to be running on port 8080 (by browser-sync).'));
  });
}

function startWithProEnv(app) {

  app.use('/static', express.static(path.join(__dirname, 'static')));

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);
  server.listen(port, function () {
    console.log(chalk.bold.gray.bgGreen(`App (production) is going to be running on port ${port}.`));
  });

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }



    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}
