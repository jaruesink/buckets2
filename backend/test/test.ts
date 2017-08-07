import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';

import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import TestHelper from './test_helper';

const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Bucket = require('../server/models/bucket');
const User = require('../server/models/user');

interface UserData {
  fbid: number;
  name: string;
  email: string;
}

@suite('Users') class UserTest extends TestHelper {
  @test 'can be created'(done) {

    // NO HACIENDO
    User.count().then((count) => {
      user_service.create({
        fbid: 1234567890,
        name: 'Test User',
        email: 'test@email.com'
      }, (err) => { if (err) { console.error(err); } })
      .then((new_user) => {
        User.count().then((new_count) => {
          console.log(count, new_count);
          assert(count + 1 === new_count);
          done();
        });
      });
    });
  }
}
