/* global describe, it */

const assert = require('assert');
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const fetch = require('node-fetch');

const app = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('../../server/models/user');
const User = mongoose.model('User');
const Bucket = mongoose.model('Bucket');

describe('User Services', () => {
  it('can create a user', (done) => {
    User.count().then((count) => {
      user_service.create({
        fbid: 1234567890,
        name: 'Test User',
        email: 'test@email.com'
      }, (err) => { if (err) { console.error(err); } })
      .then((new_user) => {
        User.count().then((new_count) => {
          assert(count + 1 === new_count);
          done();
        });
      });
    });
  });

  it('can edit a user', (done) => {
    const user = new User({
      fbid: 1234567890,
      name: 'Test User',
      email: 'test@email.com'
    });

    user.save().then(() => {
      user_service.update(user._id, {
        name: 'Joe Tester'
      }, (err) => { if (err) { console.error(err); } })
      .then((edited_user) => {
        User.findOne({ _id: user._id })
          .then((found_user) => {
            assert(found_user.name === 'Joe Tester');
            done();
          });
      });
    });
  });

  it('can delete a user', (done) => {
    const user = new User({
      fbid: 1234567890,
      name: 'Test User',
      email: 'test@email.com'
    });

    user.save().then(() => {
      user_service.remove(user._id, err => console.error(err))
        .then((removed_user) => {
          User.findOne({ _id: user._id })
            .then((found_user) => {
              assert(found_user === null);
              done();
            });
        });
    });
  });

  // TODO: This is clearly not how you push to arrays of items...
  // it('can have a bucket', (done) => {
  //   const user = new User({
  //     fbid: 1234567890,
  //     name: 'Test User',
  //     email: 'test@email.com'
  //   });

  //   const bucket = new Bucket({
  //     name: 'Test Bucket',
  //     type: 'budget',
  //     amount: 500
  //   });

  //   user.save().then(() => {
  //     bucket.users.push(user);
  //     user.buckets.push(bucket);
  //     Promise.all([bucket.save(), user.save()])
  //       .then(() => {
  //         User.findOne(user._id)
  //           .populate('buckets')
  //           .then((found_user) => {
  //             assert(user._id.toString() === found_user.buckets[0].users[0].toString());
  //             done();
  //           });
  //       });
  //   });
  // });
});
