const feathers = require('feathers');
const rest = require('feathers-rest');
const errorHandler = require('feathers-errors/handler');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const logger = require('./server/logger');
// const http = require('http');
// const service = require('feathers-mongoose');
mongoose.Promise = global.Promise;

// Initiate our app
const app = feathers();

module.exports = app;

// connect to the mongodb database
const options = config.get('buckets.db.options');
const bucketsDbUrl = config.get('buckets.db.url');
logger.info(`connecting to mongodb at url ${bucketsDbUrl}`);
mongoose.connect(
  bucketsDbUrl,
  options
);

// Get our realtime routes
const realtime_routes = require('./server/routes/realtime');

app.use('/realtime', realtime_routes);

// Enable REST services
app.configure(rest());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Point static path to dist
app.use(feathers.static(path.join(__dirname, 'dist')));

// Get our API routes
const api_routes = require('./server/routes/api');

// Set our api routes
app.use('/api', api_routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
// app.set('port', port);
logger.info('express listening on port: ', port);

// Listen on provided port, on all network interfaces.
app.listen(port);

// Set up error handling
app.use(errorHandler());

// Catch all unhandled promise rejections
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Possibly Unhandled Rejection: ${reason}, `, p);
});
