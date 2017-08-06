const feathers = require('feathers');
const rest = require('feathers-rest');
const errorHandler = require('feathers-errors/handler');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const logger = require('./server/logger');
mongoose.Promise = global.Promise;
const app = feathers();
module.exports = app;
const options = config.get('buckets.db.options');
const bucketsDbUrl = config.get('buckets.db.url');
logger.info(`connecting to mongodb at url ${bucketsDbUrl}`);
mongoose.connect(bucketsDbUrl, options);
const realtime_routes = require('./server/routes/realtime');
app.use('/realtime', realtime_routes);
app.configure(rest());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(feathers.static(path.join(__dirname, 'dist')));
const api_routes = require('./server/routes/api');
app.use('/api', api_routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || '3000';
logger.info('express listening on port: ', port);
app.listen(port);
app.use(errorHandler());
process.on('unhandledRejection', (reason, p) => {
    logger.error(`Possibly Unhandled Rejection: ${reason}, `, p);
});
//# sourceMappingURL=server.js.map