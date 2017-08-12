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

// connect to the mongodb database
const options = config.get('buckets.db.options');
const bucketsDbUrl = config.get('buckets.db.url');

logger.info(`connecting to mongodb at url ${bucketsDbUrl}`);

export const connection = m.createConnection(bucketsDbUrl);

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
// app.set('port', port);
logger.info('express listening on port: ', port);

// Listen on provided port, on all network interfaces.
app.listen(port);

// Set up error handling
app.use(<any>errorHandler());

// Catch all unhandled promise rejections
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Promise Rejection: ${reason}, `, p);
});

export default app;