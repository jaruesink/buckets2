/* global before, beforeEach */

require('../server');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://username:password@ds141209.mlab.com:41209/buckets_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', (err) => {
      console.error(err);
    });
});

beforeEach((done) => {
  const { buckets, users } = mongoose.connection.collections;
  Promise.all([
    buckets.drop(),
    users.drop(),
  ]).then(() => done())
    .catch(() => done());
});
