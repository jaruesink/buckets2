/* global describe, it */
const assert = require('assert');
const BucketRepository = require('../../server/repositories/bucket_repository');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Bucket = mongoose.model('Bucket');
const User = mongoose.model('User');
const logger = require('../../server/logger');

const user = new User({
  fbid: 1234567890,
  name: 'Test User',
  email: 'test@email.com'
});

describe('BucketRepository', () => {
  it('can find buckets', (done) => {
    User.create(user).then((new_user) => {
      Bucket.create({
        name: 'Test Bucket',
        type: 'budget',
        amount: 500,
        ownerID: new_user._id
      }).then((created_bucket) => {
        BucketRepository.findBucketsForOwner({
          ownerID: created_bucket.ownerID,
          pageNumber: 1,
          pageSize: 10
        }).then((buckets_page) => {
          assert(buckets_page.totalRecords === 1);
          assert(buckets_page.data[0]._id.toString() === created_bucket._id.toString());
          assert(buckets_page.pageNumber === 1);
          assert(buckets_page.pageSize === 10);
          done();
        });
      });
    });
  });
});
