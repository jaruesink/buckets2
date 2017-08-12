import { createConnection } from 'net';
const logger = require('tracer').colorConsole();

import * as config from 'config';
import * as m from 'mongoose';
(<any>m).Promise = global.Promise;

import * as path from 'path';

import * as feathers from 'feathers';
import * as rest from 'feathers-rest';
import * as errorHandler from 'feathers-errors/handler';
import * as bodyParser from 'body-parser';

import realtime_routes from './routes/realtime';
import api_routes from './routes/api';

// Initiate our app
const app = feathers();

// Realtime Routes
app.use('/realtime', realtime_routes);

// Enable REST services
app.configure(rest());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(feathers.static(path.join(__dirname, 'dist')));

// REST API Routes
app.use('/api', api_routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express.
const port = config.get('buckets.server.port');

// Set up error handling
app.use(<any>errorHandler());

// Catch all unhandled promise rejections
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Promise Rejection: ${reason}, `, p);
});

class Server {
  app = app;
  private _server;
  connect(url, options) {
    logger.info(`connecting to mongodb at url ${url}`);
    return m.connect(url, options);
  }
  close() {
    if (this._server) {
      logger.info('port closed: ', port);
      this._server.close();
    }
  }
  createConnection(url, options) {
    return m.createConnection(url, options);
  }
  run() {
    logger.info('express listening on port: ', port);
    this._server = app.listen(port);
  }
}

export default new Server();