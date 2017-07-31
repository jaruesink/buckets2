/* global beforeEach, after */
const server = require('../server');
const logger = require('../server/logger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

beforeEach((done) => {
  logger.debug('Truncating test database');
  const { buckets, users } = mongoose.connection.collections;
  Promise.all([
    buckets.drop(),
    users.drop(),
  ]).then(() => done())
    .catch(() => done());
});

after((done) => {
  const { buckets, users } = mongoose.connection.collections;
  Promise.all([
    buckets.drop(),
    users.drop(),
  ]).then(() => done())
    .catch(() => done());
});
