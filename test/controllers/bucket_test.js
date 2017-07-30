/* global describe, it */

const assert = require('assert');
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const fetch = require('node-fetch');
const logger = require('../../server/logger');

const app = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const bucket_service = app.service('api/bucket');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('../../server/models/bucket');
require('../../server/models/user');
const Bucket = mongoose.model('Bucket');
const User = mongoose.model('User');

describe('Bucket Services', () => {
  it.only('can create a bucket', (done) => {
    const user = new User({
      fbid: 1234567890,
      name: 'Test User',
      email: 'test@email.com'
    });

    user.save().then((saved_user) => {
      Bucket.count().then((count) => {
        const bucket_to_create = {
          name: 'Test Bucket',
          type: 'budget',
          amount: 500,
          ownerID: saved_user._id
        };
        logger.info(`creating bucket ${JSON.stringify(bucket_to_create)}`);
        bucket_service.create(bucket_to_create, (err) => { if (err) { logger.error(err); } })
        .then((created_bucket) => {
          Bucket.count().then((new_count) => {
            assert(count + 1 === new_count);
            done();
          });
        });
      });
    });
  });

  it('can edit a bucket', (done) => {
    const bucket = new Bucket({
      name: 'Test Bucket',
      type: 'budget',
      amount: 500
    });
    bucket.save().then(() => {
      bucket_service.update(bucket._id, {
        amount: bucket.amount + 10
      }, (err) => { if (err) { logger.error(err); } })
      .then((edited_bucket) => {
        Bucket.findOne({ _id: bucket._id })
          .then((found_bucket) => {
            assert(found_bucket.amount === bucket.amount + 10);
            done();
          });
      });
    });
  });

  it('can delete a bucket', (done) => {
    const bucket = new Bucket({
      name: 'Test Bucket',
      type: 'budget',
      amount: 500
    });
    bucket.save().then(() => {
      bucket_service.remove(bucket._id,
        (err) => { if (err) { logger.error(err); } })
        .then((removed_bucket) => {
          Bucket.findOne({ _id: bucket._id })
          .then((find_result) => {
            assert(find_result === null);
            done();
          });
        });
    });
  });
});
