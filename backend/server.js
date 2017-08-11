"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('tracer').colorConsole();
const config = require("config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const path = require("path");
const feathers = require("feathers");
const rest = require("feathers-rest");
const errorHandler = require("feathers-errors/handler");
const bodyParser = require("body-parser");
const app = feathers();
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
const port = config.get('buckets.server.port');
logger.info('express listening on port: ', port);
app.listen(port);
app.use(errorHandler());
process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Promise Rejection: ${reason}, `, p);
});
exports.default = app;
//# sourceMappingURL=server.js.map