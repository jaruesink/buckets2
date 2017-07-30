const feathers = require('feathers');
const rest = require('feathers-rest');
const errorHandler = require('feathers-errors/handler');
const realtime_routes = require('./server/routes/realtime');
const api_routes = require('./server/routes/api');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const logger = require('./server/logger');
// const http = require('http');
// const service = require('feathers-mongoose');
mongoose.Promise = global.Promise;

// connect to the mongodb database
const options = config.get('buckets.db.options');
const bucketsDbUrl = config.get('buckets.db.url');
logger.info(`connecting to mongodb at url ${bucketsDbUrl}`);
mongoose.connect(
  bucketsDbUrl,
  options
);

const port = process.env.PORT || '3000';
logger.info(`listening on port ${port}`);
const app = feathers();
app.configure(rest());
app.use('/realtime', realtime_routes);
app.use('/api', api_routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(feathers.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(port);
app.use(errorHandler());

// Catch all unhandled promise rejections
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Possibly Unhandled Rejection: ${reason}, `, p);
});

module.exports = app;
