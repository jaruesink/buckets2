import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import { UserData, UserSchema, UserType } from '../../server/models/user';
import { BucketData, BucketSchema, BucketType } from '../../server/models/bucket';

import * as logger from '../../server/logger';

import  TestHelper from '../test_helper';

@suite('Buckets') export default class BucketTest extends TestHelper {

  testUserData: UserData = {
    fbid: 1234567890,
    name: 'Test User',
    email: 'test@email.com'
  }

  testBucketData(id): BucketData {
    return {
      name: 'Test Bucket',
      type: 'budget',
      amount: 500,
      ownerID: id
    }
  }

  BucketModel = this.connection.model<BucketType>('Bucket',BucketSchema);

  UserModel = this.connection.model<UserType>('User', UserSchema);

  bucket_service = this.app.service('api/bucket');

  createNewBucket(data): BucketType {
    return new this.BucketModel(data);
  }

  createNewUser(data): UserType {
    return new this.UserModel(data);
  }

  @test async 'can be created'() {
    const new_user = this.createNewUser(this.testUserData);
    const new_bucket = this.createNewBucket(this.testBucketData(new_user._id));

    // to be continued....
  }

}


// /* global describe, it */

// const assert = require('assert');
// const feathers = require('feathers/client');
// const rest = require('feathers-rest/client');
// const fetch = require('node-fetch');
// const logger = require('../../server/logger');

// const app = feathers().configure(rest('http://localhost:3000').fetch(fetch));
// const bucket_service = app.service('api/bucket');

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// require('../../server/models/bucket');
// require('../../server/models/user');
// const Bucket = mongoose.model('Bucket');
// const User = mongoose.model('User');

// const user = new User({
//   fbid: 1234567890,
//   name: 'Test User',
//   email: 'test@email.com'
// });

// describe('Bucket Services', () => {
//   it('can create a bucket', (done) => {
//     user.save().then((saved_user) => {
//       Bucket.count().then((count) => {
//         const bucket_to_create = {
//           name: 'Test Bucket',
//           type: 'budget',
//           amount: 500,
//           ownerID: saved_user._id
//         };
//         bucket_service.create(bucket_to_create, (err) => { if (err) { logger.error(err); } })
//         .then((created_bucket) => {
//           Bucket.count().then((new_count) => {
//             assert(count + 1 === new_count);
//             done();
//           });
//         });
//       });
//     });
//   });

//   it('can edit a bucket', (done) => {
//     user.save().then((saved_user) => {
//       const bucket = new Bucket({
//         name: 'Test Bucket',
//         type: 'budget',
//         amount: 500,
//         ownerID: saved_user._id
//       });
//       bucket.save().then(() => {
//         bucket_service.update(bucket._id, {
//           amount: bucket.amount + 10
//         }, (err) => { if (err) { logger.error(err); } })
//         .then((edited_bucket) => {
//           Bucket.findOne({ _id: bucket._id })
//             .then((found_bucket) => {
//               assert(found_bucket.amount === bucket.amount + 10);
//               done();
//             });
//         });
//       });
//     });
//   });

//   it('can delete a bucket', (done) => {
//     user.save().then((saved_user) => {
//       const bucket = new Bucket({
//         name: 'Test Bucket',
//         type: 'budget',
//         amount: 500,
//         ownerID: saved_user._id
//       });
//       bucket.save().then(() => {
//         bucket_service.remove(bucket._id,
//           (err) => { if (err) { logger.error(err); } })
//           .then((removed_bucket) => {
//             Bucket.findOne({ _id: bucket._id })
//             .then((find_result) => {
//               assert(find_result === null);
//               done();
//             });
//           });
//       });
//     });
//   });
// });
