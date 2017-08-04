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
const Bucket = mongoose.model('Bucket');
const User = mongoose.model('User');

describe('Users', () => {
  it('can be created', (done) => {
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

  it('can be edited', (done) => {
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

  it('can be deleted', (done) => {
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

  it('can retrieve buckets for an ownerID', (done) => {
    const user = new User({
      fbid: 1234567890,
      name: 'Test User',
      email: 'test@email.com'
    });

    const bucket = new Bucket({
      name: 'Test Bucket',
      type: 'budget',
      amount: 500,
      ownerID: user._id
    });

    user.save().then((saved_user) => {
      bucket.save().then((saved_bucket) => {
        Bucket.find({ ownerID: saved_user._id }).then((returned_buckets) => {
          assert(saved_bucket._id.toString() === returned_buckets[0]._id.toString());
          done();
        });
      });
    });
  });
});
