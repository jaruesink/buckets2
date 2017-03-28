/* global describe, it */

const assert = require('assert');
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const fetch = require('node-fetch');

const app = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const bucket_service = app.service('api/bucket');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('../../server/models/bucket');
const Bucket = mongoose.model('Bucket');

describe('Bucket Services', () => {
  it('can create a bucket', (done) => {
    Bucket.count().then((count) => {
      bucket_service.create({
        name: 'Test Bucket',
        type: 'budget',
        budget: 500
      }, (err) => { if (err) { console.error(err); } })
      .then((new_bucket) => {
        Bucket.count().then((new_count) => {
          assert(count + 1 === new_count);
          done();
        });
      });
    });
  });

  it('can edit a bucket', (done) => {
    const bucket = new Bucket({
      name: 'Test Bucket',
      type: 'budget',
      budget: 500
    });
    bucket.save().then(() => {
      bucket_service.update(bucket._id, {
        budget: bucket.budget + 10
      }, (err) => { if (err) { console.error(err); } })
      .then((edited_bucket) => {
        Bucket.findOne({ _id: bucket._id })
          .then((found_bucket) => {
            assert(found_bucket.budget === bucket.budget + 10);
            done();
          });
      });
    });
  });

  it('can delete a bucket', (done) => {
    const bucket = new Bucket({
      name: 'Test Bucket',
      type: 'budget',
      budget: 500
    });
    bucket.save().then(() => {
      bucket_service.remove(bucket._id,
        (err) => { if (err) { console.error(err); } })
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